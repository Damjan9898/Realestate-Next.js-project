"use client"
import { FaHeart } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Cookie from 'js-cookie';
import Link from 'next/link';

interface PostProps {
    id:string,
    title: string,
    price:number,
    image:string,
    surface:number,
    location:string,
    isadmin?:boolean
    redirect:string
}


const OnePost: React.FC<PostProps> = ({
    title,
    price,
    image,
    surface,
    location,
    id,
    isadmin,
    redirect
}) => {


  //Skracujem title prilikom prikaza post-a
    let substring = (title: string):string =>{
        if(title.length > 50){
            return title.substring(0, 47) + "..."
        }else{
            return title
        }
        
    }

    const [isLiked, setLiked] = useState(false);

    const currentUserId = Cookie.get('currentUserId');

    const handleLike = async (event: React.SyntheticEvent) => {
        event.stopPropagation();
        setLiked(!isLiked); 
      
        //U zavsisnosti od kliktanja like/dislike pozivam 2 razlicita API-a
        const url = isLiked 
          ? `/api/favouritepost?postId=${id}&currentUser=${currentUserId}`
          : '/api/favouritepost';
      
        const method = isLiked ? 'DELETE' : 'POST';
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: isLiked ? undefined : JSON.stringify({ postId: id, currentUser: currentUserId }),
        });
      
        if (!res.ok) {
          setLiked(isLiked); 
        } else {
          toast.success(isLiked ? 'You unliked this post!' : 'You liked this post!');
        }
      };


      //Dohvatam sve omiljene postove i zatim se prikazuje u postovima koji su svi lajkovani
      const fetchUserFavorites = async () => {
        const res = await fetch(`/api/userfavourites?userId=${currentUserId}`); 
        if (res.ok) {
          const user = await res.json();
          return user.favoriteIds;
        }
        return [];
      };


      
    useEffect(() => {
        const checkIfLiked = async () => {
      const favoriteIds = await fetchUserFavorites();
      setLiked(favoriteIds.includes(id));
    };
  
    checkIfLiked();
  }, []);

    return(
        <div className="shadow-md rounded-md bg-white w-full h-[310px] relative min-w-[200px]">
            <>
            {currentUserId && !isadmin && (
            <div className=' rounded-full bg-white h-[20px] w-[20px] flex items-center justify-center absolute top-2 right-2'>
            <button onClick={handleLike}>
                <FaHeart 
                    className={isLiked ? "fill-red-400 cursor-pointer" : "fill-gray-400 cursor-pointer"} 
                    size={12}
                />
            </button>
            </div>
            )}
            </>
            <Link href={redirect} key={id}>
            <div className="w-full rounded-md overflow-hidden h-[150px]">
                <img src={image} alt={title} className="object-cover h-full w-full"/>
            </div>
              <p className='p-2 h-[60px]'>{substring(title)}</p>
              <p className='py-2 px-1 flex items-center'><CiLocationOn/> {location}</p>
              
              <div className='p-2 '>
                <hr className='w-full h-[1px] bg-gray'/>
              </div>

              <div className='flex justify-between items-center'>
                    <p className='p-2 font-semibold text-red-700'>{price} &euro;</p>
                    <div className='bg-gray-200 mr-2 rounded-2xl'>
                        <p className='text-xs py-1 px-2'>
                            {surface} m&sup2;
                        </p>
                    </div>
                    
              </div>
              </Link>
        </div>
    )
    
}


export default OnePost;
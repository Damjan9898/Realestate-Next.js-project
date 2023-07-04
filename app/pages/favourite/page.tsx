"use client"

import React, { useEffect, useState } from 'react';
import { User } from "@prisma/client"
import OnePost from '@/app/components/posts/OnePost';
import Footer from '@/app/components/footer/Footer';


interface Posts {
    key:string,
    id:string,
    userId:string
    title: string,
    price:number,
    image:string,
    surface:number,
    location:string,
    imageUrls:string[]
}

interface MyFavouriteBodyProps {
    currentUser?: User | null
}



const MyFavouritePostsBody: React.FC<MyFavouriteBodyProps> = ({
    currentUser
})=>{
    //User id
    const userId = currentUser?.id;


    const [allposts, setallPosts] = useState<Posts[]>([]);
        
    useEffect(() => {
        fetch('/api/getallposts')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data: Posts[]) => {
            setallPosts(data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);

      
      const currentUserFavorites = currentUser && currentUser.favoriteIds 
  ? allposts.filter(post => currentUser.favoriteIds.includes(post.id)) 
  : [];

  console.log('currentUser.favoriteIds:', currentUser?.favoriteIds);
console.log('allposts:', allposts);
      

      return (
        <div>
          <div className="py-[150px] xl:w-[1000px] m-auto w-[90%]">

              <h1 className="text-3xl font-bold text-red-700">
                My Favourite Posts
              </h1>
              <div className="pt-[50px] w-full lg:min-w-[600px] min-h-[700px] grid lg:grid-cols-3 md:grid-cols-2  gap-5 px-2">

                {allposts?.length !==0 ? (
                <>
                  {currentUser && currentUser.favoriteIds && allposts.filter(post => currentUser.favoriteIds.includes(post.id)).map((post) => (
                    <OnePost 
                    isadmin
                    redirect={`http://localhost:3000/post/${post.id}`} 
                    id={post.key} 
                    title={post.title} 
                    price={post.price} 
                    image={post.imageUrls[0]} 
                    surface={post.surface} 
                    location={post.location}
                  />
                ))}
                </>
                ) : (
                  <div className='w-full flex lg:min-w-[700px] justify-center py-[100px]'>
                      <img className="w-[80px] h-[80px]" src="/img/loading.gif" alt="loading" />
                    </div>
                )}      




              </div>
          </div>
          <Footer/>  
        </div>       
      )
}

export default MyFavouritePostsBody

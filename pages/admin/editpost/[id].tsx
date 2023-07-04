
import Footer from "@/app/components/footer/Footer";
import AdminNavbar from "@/app/components/navbar/AdminNavbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import Head from 'next/head'

const EditPostPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<{ id:string, surface: number, floor: number, maxfloor: number, terrace: number, title: string, description:string, price: number, location:string, lat: number, lng: number, posttype:string, heating:boolean,cableTv:boolean, internet:boolean,garage:boolean, parking:boolean, registered:boolean ,contact:boolean , elevator:boolean, phone:boolean, imageUrls:string[], userId:string, status:string  } | null>(null);
  const postId = router.query.id;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getonepost?id=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Failed to fetch post data", error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

//Brisanje posta
  const refusePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      const response = await fetch(`/api/deletepost?id=${postId}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/pages/admin');
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  }

  //Menjanje statusa post-a na APPROVE
  const approvePost = async () => {
    try {
      const response = await fetch(`/api/updatepoststatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId, status: 'APPROVED' }),
      });

      if (response.ok) {
        const data = await response.json();
        setPost(data);
        router.push('/pages/admin');
      } else {
        console.error("Failed to approve the post");
      }
    } catch (error) {
      console.error("Failed to approve the post", error);
    }
  }




  return (
    <div className="w-full min-h-[800px]">

      <Head>
        <title>Dambel Estates | Edit Post</title>
        <meta name="description" content="Dambel Estates Edit Post" />
      </Head>
      
      <AdminNavbar/>
      <div className="pt-[120px] lg:w-[800px] m-auto w-[90%]">
        {post ? (
          <div>
            <h1 className="text-[40px] text-red-700 font-semibold mb-[20px]">Post Details: </h1>

        <p className="text-lg pb-4"><span className="font-bold">Post ID:</span> {post.id}</p>
        <p className="text-lg pb-4"><span className="font-bold">User ID:</span> {post.userId}</p>
        <p className="text-lg pb-4"><span className="font-bold">Title:</span> {post.title}</p>
        <p className="text-lg pb-4"><span className="font-bold">Description:</span> {post.description}</p>
        <p className="text-lg pb-4"><span className="font-bold">Square footage:</span> {post.surface} m<sup>2</sup></p>
        <p className="text-lg pb-4"><span className="font-bold">Floor:</span> {post.floor}</p>
        <p className="text-lg pb-4"><span className="font-bold">Max Floor:</span> {post.maxfloor}</p>
        <p className="text-lg pb-4"><span className="font-bold">Terrace:</span> {post.terrace}</p>
        <p className="text-lg pb-4"><span className="font-bold">Price:</span> {post.price}</p>
        <p className="text-lg pb-4"><span className="font-bold">Location:</span> {post.location}</p>
        <p className="text-lg pb-4"><span className="font-bold">Latitude:</span> {post.lat}</p>
        <p className="text-lg pb-4"><span className="font-bold">Longitude:</span> {post.lng}</p>
        <p className="text-lg pb-4"><span className="font-bold">Post Type:</span> {post.posttype}</p>
        <p className="text-lg pb-4"><span className="font-bold">Heating:</span> {post.heating ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Cable TV:</span> {post.cableTv ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Internet:</span> {post.internet ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Garage:</span> {post.garage ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Parking:</span> {post.parking ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Registered:</span> {post.registered ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Contact:</span> {post.contact ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Elevator:</span> {post.elevator ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-4"><span className="font-bold">Phone:</span> {post.phone ? 'Yes' : 'No'}</p>
        <p className="text-lg pb-2"><span className="font-bold">Images:</span></p>


        <div className="w-full grid md:grid-cols-3 gap-4 grid-cols-2">

            <>
          {post.imageUrls?.map((imageUrl:any) => (
            <div className="h-[150px]">
                <img src={imageUrl} className="w-full border border-1 border-gray-400 rounded-md object-cover h-full"/>
            </div>
            
          ))}
          </>

        </div>



          </div>
        ) : (
          <p>Loading post...</p>
        )}

        <div className="flex justify-between my-[100px]">
        <button className="py-2 px-4 bg-red-700 text-white font-semibold rounded-md text-lg" onClick={refusePost}>Delete</button>

          {post?.status !== 'APPROVED' && (
            <button className="py-2 px-4 bg-green-700 text-white font-semibold rounded-md text-lg" onClick={approvePost}>Approve</button>
          )} 
        </div>
        
      </div>



      <Footer/>
    </div>
  );
};

export default EditPostPage;
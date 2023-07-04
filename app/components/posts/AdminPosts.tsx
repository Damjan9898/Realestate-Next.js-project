"use client"

import React, { useEffect, useState } from 'react';
import OnePost from '@/app/components/posts/OnePost';


interface Posts {
    key:string,
    userId:string
    title: string,
    price:number,
    image:string,
    surface:number,
    location:string,
    imageUrls:string[],
    status:string,
    id:string
}

interface AdminPostsBodyProps {
    status:string,
    label:string

}

const AdminPostsBody: React.FC<AdminPostsBodyProps>= ({
    status,
    label
})=>{

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

      

      return (

            <div className="pt-[150px] w-[100%] m-auto flex items-start flex-col justify-between">
            <>
                <h1 className={`text-3xl font-bold ${status === 'ON_HOLD' ? 'text-orange-500' : 'text-green-700'}`}>
                    {label}
                </h1>
            </>
            <div className="pt-[50px] lg:w-[100%] grid lg:grid-cols-3 md:grid-cols-2  gap-5 px-2">


            {/* Prikazujem postove u zavisnosti od statusa "ON HOLD" ILI APPROVED */}
            {allposts.filter(post => post.status == status).length !== 0 ? (
              <>
                {allposts.filter(post => post.status == status).map((post) => (

                  <OnePost redirect={`http://localhost:3000/admin/editpost/${post.id}`} isadmin id={post.key} title={post.title} price={post.price} image={post.imageUrls[0]} surface={post.surface} location={post.location}/>
                ))}

              </>
            ) : (
              <div>{status === 'ON_HOLD' ? "There are no more posts that have status: On hold" : "Loading Approved posts..."}</div>
            ) }
            </div>
        </div> 

        
        
      )
}

export default AdminPostsBody
"use client"

import { useEffect, useState } from 'react'
import PostsContext from '../../context/PostsContext';
import React, { useContext } from 'react';
import OnePost from './OnePost';


interface Post {
  id: string;
  title: string;
  price: number;
  imageUrls: string[];
  surface: number;
  location: string;
  status: string;
}


const Posts = ()=>{


    
    const [posts, setPosts] = useState<any>(null)


    // Osluskujem menjanje filteredPosts preko context-a
    const context = useContext(PostsContext);
    if (!context) {
        // Ako je context null
        return null;
    }
    const { filteredPosts } = context;

    useEffect(() => {
      async function fetchData() {
        const res = await fetch('/api/filterposts')
        const data = await res.json()
  
        if(res.status === 200){
          setPosts(data)
        }else{
          console.error("Error:", data.message)
        }
      }
  
      fetchData()
    }, [])

    if(filteredPosts !== null){
        return (
      
          <div className='lg:w-[1500px] md:w-[400px] lg:min-w-[700px] h-full overflow-y-scroll'>
              <div className="w-full lg:min-w-[700px] h-fit grid lg:grid-cols-3 md:grid-cols-2 gap-5 px-2 pb-[100px]">
              {filteredPosts?.length !==0 ? (
                  <>
                   {filteredPosts.filter((post: Post) => post.status === "APPROVED").map((post: Post) => (

                      <OnePost redirect={`http://localhost:3000/post/${post.id}`} id={post.id} key={post.id} title={post.title} price={post.price} image={post.imageUrls[0]} surface={post.surface} location={post.location}/>
                      
                    ))}
                  </>
                ) : (
                  <p className='text-lg pt-8 text-center'>There's no data with that filter...</p>
                )}
            </div>
          </div>
      )
    }
  //Prikaz loading gif-a dok se ne prikazu
    if (!posts) {
      return <div className='w-full lg:min-w-[700px] flex justify-center py-[100px]'>
      <img className="w-[80px] h-[80px]" src="/img/loading.gif" alt="loading" />
    </div>
    }
      
        return (
          <div className='lg:w-[1500px] lg:min-w-[600px] h-full overflow-y-scroll lg:px-auto md:w-full px-[20px] w-full'>
              <div className="w-full lg:min-w-[600px] h-fit grid lg:grid-cols-3 md:grid-cols-2 gap-5 px-2 pb-[100px]">
                {posts ? (
                    <>
                      {posts.filter((post: Post) => post.status === "APPROVED").map((post: Post) => (

                        <OnePost redirect={`http://localhost:3000/post/${post.id}`} id={post.id} key={post.id} title={post.title} price={post.price} image={post.imageUrls[0]} surface={post.surface} location={post.location}/>

                      ))}
                    </>
                  ) : (
                    <div className='w-full flex lg:min-w-[700px] justify-center py-[100px]'>
                     <img className="w-[80px] h-[80px]" src="/img/loading.gif" alt="loading" />
                    </div>
                  )}
              </div>
          </div>
          
      
        )
    
}


export default Posts;
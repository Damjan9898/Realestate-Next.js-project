"use client"

import PostsContext from './context/PostsContext';


import LocationsMap from "./components/map/LocationsMap";
import Posts from "./components/posts/Posts";
import { useState } from 'react';
import { Post } from "@prisma/client"
import Filter from './components/filter/Filter';
import Footer from './components/footer/Footer';


export default function Home() {

  // Kreiran je kontekst kojim se salju podaci iz Filtera ka Postovima. FIlter setuje parametre koje zatim Posts osluskuje i vrsi adekvatan API poziv ka postovima
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);

  return (
    <PostsContext.Provider value={{ filteredPosts, setFilteredPosts }}>
      <div className="w-full h-full pt-[80px] relative">
          <div className="w-full bg-white">
            <Filter/>
          </div>
          <div className="w-full h-full flex justify-between lg:flex-row flex-col">
              <Posts/>
            <div className="w-[80%] h-full grow flex-col lg:flex hidden">
                <LocationsMap/>
            </div>
          </div>
          <Footer/>
      </div>
     
    </PostsContext.Provider>
    
  );
}
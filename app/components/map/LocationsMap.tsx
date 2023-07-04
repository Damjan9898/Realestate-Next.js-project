'use client'

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import PostsContext from '../../context/PostsContext';
import React, { useContext, useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci'
import Link from 'next/link';
import { Post } from '@prisma/client';


// Definisem tip podatka koji prikazujem u mapi
type oneLoc = {
  id: String
  name: String,
  location: { lat: number, lng: number },
  imageUrl: String,
  link: String,
  price:number
  posttype:string,
  locationPart:string
}

export default function LocationsMap() {


  // Kreiram niz lokacija tipa oneLoc
  const [locations, setLocations] = useState<oneLoc[]>([]);

  // Svi postovi koje imam i osluskujem preko konteksta ( podaci se menjaju nakon ubacivanja podataka u filter )
  const [posts, setPosts] = useState<any>(null)

  const context = useContext(PostsContext);
  if (!context) {
    return null;
  }
  const { filteredPosts } = context;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/filterposts')
      const data = await res.json()

      if(res.status === 200){
        setPosts(data);
      }else{
        console.error("Error:", data.message)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let newLocations: oneLoc[] = [];

    if (posts?.length !== 0 && posts !== null) {
    //Inicijalno uzimam podatke od svih postova
    posts.filter((post: Post) => post.status === "APPROVED").map((post: Post) =>{
      newLocations.push({
        id: post.id,
        name: post.title,
        location: { lat: Number(post.lat), lng: Number(post.lng) },
        imageUrl: post.imageUrls[0],
        link: `http://localhost:3000/post/${post.id}`,
        price: post.price,
        posttype:post.posttype,
        locationPart:post.location
      })
    })

  }

    //Ako iskoristim filter uzimam podatke samo od filtriranih postova
    if (filteredPosts?.length !== 0 && filteredPosts !== null) {

      newLocations = [];

      filteredPosts.filter((post: Post) => post.status === "APPROVED").map((post: Post) => {
        newLocations.push({
          id: post.id,
          name: post.title,
          location: { lat: Number(post.lat), lng: Number(post.lng) },
          imageUrl: post.imageUrls[0],
          link: `http://localhost:3000/post/${post.id}`,
          price: post.price,
          posttype:post.posttype,
          locationPart:post.location
        })
      })
    }

    setLocations(newLocations);
  }, [posts, filteredPosts]);
  //CUSTOM DEO KODA KRAJ



  const [selected, setSelected] = useState<any | null>(null);

  const key = process.env.NEXT_PUBLIC_GOOGLEMAPSKEY as string;
  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: 44.8125, lng: 20.4612 }}
        zoom={10}
      >
        {locations.map(item => (
          <Marker
            key={Number(item.id)}
            position={item.location}
            onClick={() => {
              setSelected(item);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.location.lat, lng: selected.location.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="w-[300px]">
              <h2 className="font-semibold pb-2 text-red-700 text-[20px]">{selected.name}</h2>
              <div className='h-[150px] rounded-md overflow-hidden'>
                <img src={selected.imageUrl} alt={selected.name} className="object-cover h-full w-full"/>
              </div>
              
              <p className='text-black font-semibold text-[17px] py-3'>{selected.price}.00 &euro;</p>

              <div className='flex justify-between text-[16px] items-center'>
              
                <p className='flex justify-start items-center'><CiLocationOn className='mr-[5px]'/>{selected.locationPart}</p>

                <p className='text-orange-500 font-semibold'>{selected.posttype}</p>
              </div>

              <br/>
              <Link href={selected.link} key={selected.id} className='mt-3'>
                  <div className='bg-gray-200 w-fit py-2 px-3 rounded-md font-semibold hover:bg-gray-300 transition'>
                  Show more
                  </div>
              </Link>
                
              
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
}

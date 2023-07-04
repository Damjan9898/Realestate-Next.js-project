import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Link from 'next/link';
import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';

// Definisem tip podatka
type OneLocationProps = {
  id: String,
  name: String,
  lat: number,
  lng: number,
  imageUrl: String,

  price:number,
  posttype:string,
  locationPart:string
}



export default function OneLocationMap({ id, name, lat, lng, imageUrl, price, posttype, locationPart  }: OneLocationProps) {
    console.log(lat, lng, name, imageUrl, price, posttype, locationPart);
  const location = {
    id,
    name,
    location: { lat: Number(lat), lng: Number(lng) },
    imageUrl,
    price,
    posttype,
    locationPart
  };

  const [selected, setSelected] = useState<any | null>(null);

  const key = process.env.NEXT_PUBLIC_GOOGLEMAPSKEY as string;

  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: Number(lat), lng: Number(lng) }}
        zoom={10}
      >
        <Marker
          key={Number(id)}
          position={location.location}
          onClick={() => {
            setSelected(location);
          }}
        />

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

              
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
}
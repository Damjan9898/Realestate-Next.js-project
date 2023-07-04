'use client'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type PickLocationProps = {
  clickedLatLng: { lat: number; lng: number } | null;
  setClickedLatLng: (value: { lat: number; lng: number } | null) => void;
  setLat: (value: string) => void;  
  setLng: (value: string) => void;  // Add this line
};

export default function PickLocation({ clickedLatLng, setClickedLatLng, setLat, setLng }: PickLocationProps) {

  const key = process.env.NEXT_PUBLIC_GOOGLEMAPSKEY as string;

  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 44.8125, lng: 20.4612 }}
        zoom={10}
        onClick={(event) => {
            const lat = event.latLng?.lat();
            const lng = event.latLng?.lng();
          
            //Biram lat i lng
            if (lat !== undefined && lng !== undefined) {
              setClickedLatLng({ lat, lng });
              setLat(lat.toString());
              setLng(lng.toString());
            }
        }}
      >
        {clickedLatLng && (
          <div>
            <p className="text-green-500 my-3 font-semibold">You clicked at latitude {clickedLatLng.lat} and longitude {clickedLatLng.lng}!</p>
            <Marker position={clickedLatLng} />
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
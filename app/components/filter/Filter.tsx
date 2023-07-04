'use client'

import { useState } from "react";
import PostsContext from '../../context/PostsContext';
import React, { useContext } from 'react';
import { BiEuro } from 'react-icons/bi'
import Select from "../inputs/Select";
import FilterInput from "../inputs/FilterInput";



const Filter = () =>{

    const [min_price, setMinPrice] = useState("");
    const [max_price, setMaxPrice] = useState("");
    const [min_surface, setMinSurface] = useState("");
    const [max_surface, setMaxSurface] = useState("");
    const [location, setLocation] = useState("");
    const [posttype, setType] = useState("");

    //Kad promenim filter preko context-a saljem te podatke ka fajlu gde se nalazi filteredPosts
    const context = useContext(PostsContext);
    if (!context) {
        return null;
    }
    const { setFilteredPosts } = context;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/filterposts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ min_price: Number(min_price), max_price: Number(max_price), min_surface: Number(min_surface), max_surface: Number(max_surface), location, posttype })
        });

        const data = await res.json();

        setFilteredPosts(data)
        
    };

    let resetFilter = () =>{
        setFilteredPosts(null)
        setMinPrice("");
        setMaxPrice("");
        setMinSurface("");
        setMaxSurface("");
        setLocation("");
        setType("");
    }

    const locations = [
      "Novi Beograd",
      "Palilula",
      "Rakovica",
      "Čukarica",
      "Savski venac",
      "Voždovac",
      "Vračar",
      "Zemun",
      "Zvezdara",
      "Barajevo",
      "Grocka",
      "Lazarevac",
      "Mladenovac",
      "Obrenovac",
      "Sopot",
      "Surčin"
    ];

    const postTypes = [
      "Rent",
      "Sale"
    ];


    return (
        <div className="w-full py-6 shadow-md">
          <div className="max-w-[930px] lg:w-full m-auto w-fit">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between lg:flex-row flex-col lg:mt-auto">
              
              <FilterInput type="number" label="Price" value_min={min_price} value_max={max_price} onChange_min={e => setMinPrice(e.target.value)} onChange_max={e => setMaxPrice(e.target.value)} placeholder_min="Min." placeholder_max="Max." icon={BiEuro} />
              
    
              <FilterInput type="number" label="Square footage" value_min={min_surface} value_max={max_surface} onChange_min={e => setMinSurface(e.target.value)} onChange_max={e => setMaxSurface(e.target.value)} placeholder_min="Min." placeholder_max="Max." textIcon />
    

            </div>
            <div className="flex justify-between lg:flex-row flex-col lg:mt-auto">

              <div className="flex flex-col md:flex-row">
                  <Select label="Location" options={locations} onChange_location={e => setLocation(e.target.value)} location_select/>

                  <Select label="Sale/Rent" options={postTypes} onChange_location={e => setType(e.target.value)} type_select/>
              </div>

            
              <div className="flex items-end lg:mt-auto mt-5 flex-col md:flex-row">
                <button className="bg-gray-300 w-[217px]  h-[35px] rounded-md mr-3 hover:bg-gray-400 transition mb-5 md:mb-auto" type="submit" onClick={resetFilter}>Reset</button>
                <button className="bg-red-700 w-[217px] h-[35px]  rounded-md text-white hover:bg-red-800 transition mr-3 md:mr-auto" type="submit">Submit</button>
                
              </div>
              
            </div>
              
            </form>
          </div>
        </div>
    )
}

export default Filter
"use client"

import PickLocation from "@/app/components/PickLocation";
import FormDrop from "@/app/components/inputs/FormDrop";
import FormInput from "@/app/components/inputs/FormInput";
import FormRadio from "@/app/components/inputs/FormRadio";
import FormTextArea from "@/app/components/inputs/FormTextArea";
import { useState } from "react";
import { BiEuro } from 'react-icons/bi'
import { HiOutlinePhotograph } from 'react-icons/hi'
import {  User } from "@prisma/client"
import { toast } from 'react-hot-toast'
import { MdClose } from 'react-icons/md'
import Footer from "@/app/components/footer/Footer";


interface NewPostBodyProps {
    currentUser?: User | null
}


const NewPostBody: React.FC<NewPostBodyProps> = ({
    currentUser
})=>{


        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [price, setPrice] = useState("");
        const [location, setLocation] = useState("");
        //Vrednosti za biranje lokacije
        const [clickedLatLng, setClickedLatLng] = useState<{ lat: number, lng: number } | null>(null);
        //Vrednosti izabrane lokacije koji idu ka bazi
        const [lat, setLat] = useState("");
        const [lng, setLng] = useState("");
        const [posttype, setPosttype] = useState("");
        const [surface, setSurface] = useState("");
        const [floor, setFloor] = useState("");
        const [maxfloor, setMaxFloor] = useState("");
        const [terrace, setTerrace] = useState("");
        const [heating, setHeating] = useState("");
        const [elevator, setElevator] = useState("");
        const [cableTv, setCableTv] = useState("");
        const [internet, setInternet] = useState("");
        const [phone, setPhone] = useState("");
        const [garage, setGarage] = useState("");
        const [parking, setParking] = useState("");
        const [registered, setRegistered] = useState("");
        const [contact, setContact] = useState("");
        //Slanje niza slika
        const [filebase64Array,setFileBase64Array] = useState<string[]>([])

        //User id

         const userId = currentUser?.id;

        

    //Kad ubacum podatke u formu preko context-a saljem te podatke ka fajlu gde se nalazi newPost

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        fetch('/api/newpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  surface: Number(surface), floor: Number(floor), maxfloor: Number(maxfloor), terrace: Number(terrace), title, description, price: Number(price), location, lat: Number(lat), lng: Number(lng), posttype, heating,cableTv, internet,garage, parking, registered ,contact , elevator, phone, filebase64Array, userId })
        })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            //Preko toast-a prikazujem datu error poruku iz newpost API-a
            toast.error(data.message);
          } else {
            toast.success('Post created successfully!');
            setTimeout(
                window.location.href = '/', 1000
            )
          }
        })
        .catch((error) => {
          // Ako je u pitanju neki drugi error
          toast.error('An unexpected error occurred.');
        });
      };


    function convertFile(files: FileList | null) {
        if (files) {
          const fileRef = files[0];
          const fileType: string = fileRef.type || "";
          console.log("This file upload is of type:", fileType);
          const reader = new FileReader();
          reader.onload = (ev: ProgressEvent<FileReader>) => {
            if (ev.target && ev.target.result) {
              const result = ev.target.result as string;
              const base64 = btoa(result);
              setFileBase64Array((prevArray) => [...prevArray, `data:${fileType};base64,${base64}`]);
            }
          };
          reader.readAsBinaryString(fileRef);
        }


        console.log(filebase64Array)
      }

    const locations = [
        "Pick a location",
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
        "Pick a post type",
        "Rent",
        "Sale"
      ];

      const heatingTypes = [
        "Pick a heating type",
        "Gas",
        "Electric"
      ];

      
  

      return (
        <div>
            <div className="pt-[120px] m-auto md:w-[500px] w-[90%]">
            <h1 className="text-3xl font-bold text-red-700">
                Add New Post
            </h1>
            <p className="mt-3 mb-6">
                Please fill in all the required fileds to add a new post
            </p>
            <p className="mt-3 mb-6">
                After you have successfully submitted the form, you'll need to wait up to 24 hours for your post to be accepted. You can find all of your accepted posts on <a className="text-red-700 font-semibold hover:underline" href="/pages/myposts">my posts</a> page.
            </p>

            <form onSubmit={handleSubmit} className="pb-[100px]">
                <div className="flex justify-between mb-7 ">
                    <FormInput  required_input label="Title" type="text" value={title} onChange_handler={e => setTitle(e.target.value)} input_size/>

                    
                </div>

                <div className="flex justify-between mb-7">
                        <FormTextArea required_input label="Description" value={description} onChange_handler={e => setDescription(e.target.value)}  input_size/>
                </div>

                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="md:mr-[40px] mr-0">
                        <FormInput required_input label="Price" type="number" value={price} onChange_handler={e => setPrice(e.target.value)} icon={BiEuro}/>
                    </div>
                        <FormDrop required_input label="Location" options={locations} onChange_handler={e => setLocation(e.target.value)}/>
                </div>

                <div className=" mb-7">
                    <label className="text-sm font-semibold">
                           Map the address <span className="text-red-700">*</span>
                    </label>
                    <div className="rounded-md overflow-hidden">
                        <PickLocation clickedLatLng={clickedLatLng} setClickedLatLng={setClickedLatLng} setLat={setLat} setLng={setLng}/>
                    </div>
                    {clickedLatLng && (

                        <div>

                            <p className="text-green-500 my-3 font-semibold">The location was successfully picked!</p>
                            
                        </div>

                    )}
                </div>
                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="md:mr-[40px] mr-0">
                        <FormDrop required_input label="Sale/Rent" options={postTypes} onChange_handler={e => setPosttype(e.target.value)}/>
                    </div>
                        <FormInput required_input label="Square footage" type="number" value={surface} onChange_handler={e => setSurface(e.target.value)} surfaceicon/>
                </div>

                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="md:mr-[40px] mr-0">
                        <FormInput label="Floor" type="number" value={floor} onChange_handler={e => setFloor(e.target.value)} />
                    </div>
                        <FormInput label="Max Floor" type="number" value={maxfloor} onChange_handler={e => setMaxFloor(e.target.value)} />
                </div>

                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="md:mr-[40px] mr-0">
                        <FormInput required_input label="Terrace" type="number" value={terrace} onChange_handler={e => setTerrace(e.target.value)}/>
                    </div>
                        <FormDrop required_input label="Heating" options={heatingTypes} onChange_handler={e => setHeating(e.target.value)}/>
                </div>

                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="md:mr-[40px] mr-0">
                        <FormRadio name={"elevator"} required_input label="Elevator" type="radio"  onChange_handler={e => setElevator(e.target.value)} />
                    </div>
                        <FormRadio name={"cable"} required_input label="Cable TV" type="radio"  onChange_handler={e => setCableTv(e.target.value)} />
                </div>


                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="md:mr-[40px] mr-0">
                        <FormRadio name={"internet"} required_input label="Internet" type="radio"  onChange_handler={e => setInternet(e.target.value)} />
                    </div>
                        <FormRadio name={"phone"} required_input label="Phone" type="radio"  onChange_handler={e => setPhone(e.target.value)} />
                </div>

                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="md:mr-[40px] mr-0">
                        <FormRadio name={"garage"} required_input label="Garage" type="radio"  onChange_handler={e => setGarage(e.target.value)} />
                    </div>
                        <FormRadio name={"parking"} required_input label="Parking" type="radio"  onChange_handler={e => setParking(e.target.value)} />
                </div>

                <div className="flex justify-between mb-7 flex-col md:flex-row">
                    <div className="mr-[40px]">
                        <FormRadio name={"registered"} required_input label="Registered" type="radio"  onChange_handler={e => setRegistered(e.target.value)} />
                    </div>
                    <FormInput required_input label="Contact" type="text" value={contact} onChange_handler={e => setContact(e.target.value)} />
                </div>

                <div className="mb-7">
                    <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-gray-900 font-semibold">
                        Cover photo (Min. 1 image, Max. 3 images)
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                        <HiOutlinePhotograph className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                            <label htmlFor="file-upload"
                            className="relative text-center cursor-pointer rounded-md bg-white font-semibold"
                            >
                            <span className="text-orange-500 text-center ">Upload a file</span>
                            <input id="file-upload"accept="image/*" multiple name="file-upload" type="file" className="sr-only"
                                onChange={(e)=> convertFile(e.target.files)}
                            />
                            </label>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-3 mt-8 gap-4">
                        
                    {filebase64Array.map((filebase64, index) => (
                        <div className="max-w-[95%] relative">
                            <img key={index} src={filebase64} className="w-full border border-1 border-gray-400 rounded-md"/>
                            <div className="absolute h-[20px] w-[20px] bg-red-500 top-1 right-1 flex items-center justify-center rounded-[50px]">
                            <button onClick={() => {
                                const newFilebase64Array = filebase64Array.filter((_, idx) => idx !== index);
                                setFileBase64Array(newFilebase64Array);
                            }}><MdClose color="white"/></button>
                            </div>
                        </div>
                        ))}
                    </div>
                    

                    
                </div>


                    <button type="submit" className="w-full h-10 bg-red-700 text-white rounded-md hover:bg-red-500 transition"> Submit</button>
                

            </form>
            
        </div>
        <Footer/>
        </div>
        

      )
}

export default NewPostBody

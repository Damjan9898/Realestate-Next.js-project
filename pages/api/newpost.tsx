import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import prisma from "@/app/libs/prismadb"
import { PostType, HeatingType, Status } from '@prisma/client';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST'){

    //Dohvatanje podataka
    const {title, description, price, location, lat, lng, posttype, surface, floor, maxfloor, terrace, heating, elevator, cableTv , internet, phone, garage, parking, registered, contact , filebase64Array, userId } = req.body;

    //Default status kad god user uploaduje novi post:
    const status : Status = "ON_HOLD"

    //Niz Img putanja koji ce ici u bazu
    let imageUrls : string[] = [];

    const floorValue = floor ? Number(floor) : undefined;

    const maxFloorValue = maxfloor ? Number(maxfloor) : undefined;

    //Provera da li je korisnik uneo sva obavezna polja sa izbacivanjem date poruke
    if(!location || location == "Pick a location"){
      return res.status(400).json({ status: 'error', message: 'Please pick a location in dropdown' });
    }else if(!lat || !lng){
      return res.status(400).json({ status: 'error', message: 'Please pick a location on the map' });
    }else if(!posttype || posttype == "Pick a post type"){
      return res.status(400).json({ status: 'error', message: 'Please pick Sale/Rent' });
    }else if(!heating || heating == "Pick a heating type"){
      return res.status(400).json({ status: 'error', message: 'Please pick Heating type' });
    }else if((floorValue && !maxFloorValue) || (!floorValue && maxFloorValue)){
      return res.status(400).json({ status: 'error', message: 'If you live in a building please pick both floor and max floor value' });
    }else if(floor && maxfloor){
      if(Number(floor) > Number(maxfloor))
      return res.status(400).json({ status: 'error', message: 'Floor value can not be bigger than max floor value' });
    }else if(!elevator){
      return res.status(400).json({ status: 'error', message: 'Please check an elevator field' });
    }else if(!cableTv){
      return res.status(400).json({ status: 'error', message: 'Please check the cable TV field' });
    }else if(!internet){
      return res.status(400).json({ status: 'error', message: 'Please check the internet field' });
    }else if(!phone){
      return res.status(400).json({ status: 'error', message: 'Please check the phone field' });
    }else if(!garage){
      return res.status(400).json({ status: 'error', message: 'Please check the garage field' });
    }else if(!parking){
      return res.status(400).json({ status: 'error', message: 'Please check the parking field' });
    }else if(!registered){
      return res.status(400).json({ status: 'error', message: 'Please check the registered field' });
    }


    //Konvertovanje vrednosti
    let enumPostType:string = "";
    switch (posttype){
      case "Rent":
        enumPostType = "RENT"
        break;
      case "Sale":
        enumPostType = "SALE"
    }

    //Konvertovanje vrednosti
    let enumHeating:string = "";
    switch (heating){
      case "Gas":
        enumHeating = "GAS"
        break;
      case "Electric":
        enumHeating = "ELECTRIC"
    }


    const isElevator = elevator === 'Yes';
    const isCableTv = cableTv === 'Yes';
    const isInternet = internet === 'Yes';
    const isPhone = phone === 'Yes';
    const isGarage = garage === 'Yes';
    const isParking = parking === 'Yes';
    const isRegistered = registered === 'Yes';
    



    
  // Postavljanje slika u img/post_images

  //Provera da li je slika dobrog formata
  if (!filebase64Array || !Array.isArray(filebase64Array)) {

    return res.status(400).json({ status: 'error', message: 'Images not in a right format' });
  // Provera da li je korisnik izabrao sliku
  }else if(filebase64Array.length == 0){
    return res.status(400).json({ status: 'error', message: 'You need to pick at least 1 image' });
  }
  // Provera da li je korisnik uneo preko 3 slike
  else if(filebase64Array.length > 3){
    return res.status(400).json({ status: 'error', message: 'You can upload a maximum number of 3 images' });
  }
  try {
    filebase64Array.forEach((filebase64) => {
      // Extract MIME type from base64 string
      const match = filebase64.match(/^data:(.+);base64,/);
      if (!match) {
        throw new Error('Invalid base64 format');
      }
  
      const mimeType = match[1];
      if (mimeType !== 'image/png' && mimeType !== 'image/jpg' && mimeType !== 'image/jpeg') {
        return res.status(400).json({ status: 'error', message: 'Invalid file type, only .png, .jpg, .jpeg are allowed' });
      }
  
      const base64Image = filebase64.split(';base64,').pop();
  
      if (!base64Image) {
        throw new Error('Invalid base64 image');
      }
  
      const randomNumber = crypto.randomInt(100000, 999999); // Kreiranje random broja koji koristim u nazivu nove slike
      const filename = `image${randomNumber}.png`;
  
      //dodavanje putanje slike u bazu:
      imageUrls.push(`/img/post_images/image${randomNumber}.png`)
  
      fs.writeFileSync(
        path.join(process.cwd(), 'public', 'img', 'post_images', filename),
        base64Image,
        { encoding: 'base64' }
      );
    });
  


      //Ubacivanje podataka u Bazu:
      const post = await prisma?.post.create({
        data: {
          title: title as string,
          description: description as string,
          price: price as number,
          location: location as string,
          lat: lat as number,
          lng: lng as number,
          posttype: enumPostType as PostType,
          heating: enumHeating as HeatingType,
          cableTv: isCableTv as boolean,
          internet: isInternet as boolean,
          garage: isGarage as boolean,
          parking: isParking as boolean,
          registered: isRegistered as boolean,
          contact: contact as string,
          elevator: isElevator as boolean,
          phone: isPhone as boolean,
          userId: userId as string,
          imageUrls: imageUrls as string[],
          surface: surface as number,
          floor: floorValue as number | undefined,
          maxfloor:maxFloorValue as number | undefined,
          terrace:terrace as number ,
          status: status as Status | undefined
        }
    })

  
      return res.status(200).json({ status: 'success' });
    } catch (error: any) {
        return res.status(400).json({ status: 'error', message: error.message });
    }




  }


  
}
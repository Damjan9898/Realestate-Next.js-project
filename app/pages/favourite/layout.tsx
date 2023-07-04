import getCurrentUser from "@/app/actions/getCurrentUser"
import Navbar from "@/app/components/navbar/Navbar"
import { redirect } from 'next/navigation';
import MyFavouritePostsBody from "./page";

export const metadata = {
  title: 'Dambel Estates | Favourite posts',
  description: 'Dambel Estates favourite posts',
}


export default async function FavouritePost(){

  const currentUser = await getCurrentUser()

  if(!currentUser){
    redirect('/');
  }


  return (
    <div>
        <Navbar currentUser={currentUser}/>
        <MyFavouritePostsBody currentUser={currentUser}/>
    </div>
    
  )
}






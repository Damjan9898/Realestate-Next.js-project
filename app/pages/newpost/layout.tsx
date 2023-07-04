import getCurrentUser from "@/app/actions/getCurrentUser"
import Navbar from "@/app/components/navbar/Navbar"
import NewPostBody from "./page"
import ToasterProvider from "@/app/components/providers/ToasterProvider"
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dambel Estates | New post',
  description: 'Dambel Estates add new post',
}


export default async function NewPost(){

  const currentUser = await getCurrentUser()

  if(!currentUser){
    redirect('/');
  }


  return (
    <div>
        <ToasterProvider />
        <Navbar currentUser={currentUser}/>
        <NewPostBody currentUser={currentUser}/>
    </div>
    
  )
}






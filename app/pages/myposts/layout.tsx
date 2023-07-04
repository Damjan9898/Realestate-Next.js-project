import getCurrentUser from "@/app/actions/getCurrentUser"
import Navbar from "@/app/components/navbar/Navbar"
import MyPostsBody from "./page"
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dambel Estates | My posts',
  description: 'Dambel Estates my posts',
}


export default async function MyPost(){

  const currentUser = await getCurrentUser()

  if(!currentUser){
    redirect('/');
  }


  return (
    <div>
        <Navbar currentUser={currentUser}/>
        <MyPostsBody currentUser={currentUser}/>
    </div>
    
  )
}






'use client'

import Logo from "./Logo"
import { signOut } from "next-auth/react"
import Cookie from 'js-cookie';


const AdminNavbar= ()=>{

    return (
        <div className="w-full bg-rose-700 h-[80px] px-5 fixed flex items-center z-40">
            <div className="max-w-screen-2xl w-full mx-auto flex flex-row justify-between items-center">
                <Logo adminlink/>
                <div className="w-fit flex justify-between items-center">
                    <p className=" text-white font-semibold mr-3 text-lg">Admin</p>
                    <button className="bg-white py-1 px-4 text-red-700 font-semibold rounded-md hover:bg-gray-200 transition " onClick={() => {
                                    signOut() 
                                    Cookie.remove('currentUserId');
                                }}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
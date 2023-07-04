'use client'

import Logo from "./Logo"


import {  User } from "@prisma/client"
import UserMenu from "./UserMenu"

interface NavbarProps {
    currentUser?: User | null
}

const Navbar: React.FC<NavbarProps>= ({
    currentUser
})=>{

    return (
        <div className="w-full bg-rose-700 h-[80px] px-5 fixed flex items-center z-40">
            <div className="max-w-screen-2xl w-full mx-auto flex flex-row justify-between items-center">
                <Logo/>
                <div className="w-fit flex justify-between items-center">
                    <UserMenu currentUser={currentUser}/>

                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
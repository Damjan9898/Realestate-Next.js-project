'use client'

import Image from "next/image";

interface LogoProps {
    adminlink?:boolean
}


const Logo: React.FC<LogoProps> = ({
    adminlink
})=>{
    return (
        <>  
            <a href={adminlink ? '/pages/admin' : '/'}>
            <Image
                className="sm:h-[35px] sm:w-[150px] h-[20px] w-[90px]"
                alt="logo"
                height="35"
                width="150"
                src="/img/logo.webp"
            />
            </a>
        </>
        
    )
}

export default Logo
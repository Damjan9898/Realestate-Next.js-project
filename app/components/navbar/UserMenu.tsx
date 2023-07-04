'use client'

import { AiOutlineBars } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useContext, useState } from 'react';
import MenuItem from './MenuItem';
import { User } from "@prisma/client"
import { signOut } from 'next-auth/react';
import useRegisterModal from '../hoooks/useRegisterModal';
import useLoginModal from '../hoooks/useLoginModal';
import Button from '../Button';
import { AiOutlinePlus } from 'react-icons/ai';
import Cookie from 'js-cookie';
import useProfileModal from '../hoooks/useProfileModal';

interface UserMenuProps {
    currentUser?: User | null
}


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const profileModal = useProfileModal()
    const [isOpen, setIsOpen] = useState(false)


    const redirect = () => {
        if (!currentUser) {
            loginModal.onOpen();
        } else {
          window.location.href = '/pages/newpost';
        }
    };

    //Kreiranje kolacica kako bih mogao da koristim id na drugom mestu gde je potrebno
    if(currentUser && currentUser.id){
        Cookie.set('currentUserId', currentUser.id);
    }
    


    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-4">
                <div className="max-w-6xl">
                    <Button label="Add New Post" important={true} onClick={redirect} icon={AiOutlinePlus}/>
                </div>
                <div
                    onClick={toggleOpen}
                    className="h-9 px-3 border-[1px] rounded-md border-neutral-200 flex flex-row items-center gap-2 cursor-pointer hover:shadow-md transition bg-white w-fit"
                >
                    <AiOutlineBars size={20}/>
                    <div>
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className=" absolute rounded-md shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-15 text-sm"
                >
                    <div className=" flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                            <MenuItem
                                onClick={()=>{
                                    profileModal.onOpen();
                                    toggleOpen()
                                }}
                                label="Profile"
                            />
                            <MenuItem
                                onClick={() => { window.location.href = '/pages/myposts'; }}
                                label="My posts" 
                            />
                            <MenuItem
                                onClick={() => { window.location.href = '/pages/favourite'; }}
                                label="Favourite posts" 
                            />
                            <hr />
                            <MenuItem
                                onClick={() => {
                                    signOut() 
                                    Cookie.remove('currentUserId');
                                }}
                                label="Log out" 
                            />

                        
                        </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={()=>{
                                        loginModal.onOpen();
                                        toggleOpen()
                                    }}
                                    label="Login" 
                                />
                                <MenuItem
                                    onClick={()=>{
                                        registerModal.onOpen();
                                        toggleOpen()
                                    }}
                                    label="Register" 
                                />

                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserMenu;
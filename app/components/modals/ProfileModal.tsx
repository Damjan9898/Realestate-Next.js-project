'use client'

import { useEffect, useState } from "react"
import Modal from "./Modal"
import useProfileModal from "../hoooks/useProfileModal"
import Cookies from "js-cookie"
import { BsPersonFill } from "react-icons/bs";


type User = {
    name: string;
    email: string;
  };


const ProfileModal = () => {
    const profileModal = useProfileModal()
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const currentUserId = Cookies.get('currentUserId');
            if (!currentUserId) {
              console.error("Current user ID not found");
              return;
            }
    
            const response = await fetch(`/api/currentUser?userId=${currentUserId}`);
            const data = await response.json();
            console.log("Response data:", data);  
            setCurrentUser(data.user);
          } catch (error) {
            console.error("Failed to fetch current user data", error);
          }
        };
        fetchUserData();
      }, []);


    const onSubmit = () => {

        profileModal.onClose()
    }

    const bodyContent = (
        <div className="flex flex-col gap-5">

            <div className="bg-gray-200 p-5 m-auto rounded-[100px]">
                <BsPersonFill size={40}/>
            </div>
            
            <>
            {currentUser && (
                <div>
                    <p className="text-center text-[20px] mb-2">{currentUser.name}</p>
                    <p className="text-center text-[20px] font-semibold">{currentUser.email}</p>
                </div>
            )}
        </>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={profileModal.isOpen}
            title="Profile"
            actionLabel="Close"
            onClose={profileModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default ProfileModal
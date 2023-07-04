'use client'

import { signIn } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from 'react-hot-toast'
import Button from "../Button"
import useRegisterModal from "../hoooks/useRegisterModal"
import useLoginModal from "../hoooks/useLoginModal"


const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false)

            if(callback?.ok){
                toast.success('Login successful')
                if(data.email === 'admin@admin.com') {
                    //Proveravam da li se admin loginovao
                    window.location.href = "/pages/admin";
                } else {
                    //U slucaju da nije adnim, idem na pocetnu stranu
                    window.location.href = "/";
                }
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-5">
            <Heading
                title="Welcome!"
                subtitle="Login to your account"
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-3 mt-2">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
                important={false}
            />
            <div
                className="
                text-black
                text-center
                mt-3
                "
            >
                <div className="justify-center flex flex-row items-center gap-3">
                    <div className="font-semibold">
                        Don't have an account?
                    </div>
                    <div
                        onClick={()=>{
                            loginModal.onClose(); 
                            registerModal.onOpen();
                        }}
                        className="text-blue-700 cursor-pointer hover:underline">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal
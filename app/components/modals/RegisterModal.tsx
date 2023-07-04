'use client'

import axios from "axios"
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
import { signIn } from "next-auth/react"


const RegisterModal = () => {

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
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error('Greška prilikom registracije')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-5">
            <Heading
                title="Create new account"
                subtitle="Signup if you don't already have an account"
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
                id="name"
                label="Name"
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
                onClick={() => signIn("google", { callbackUrl: "/" })}
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
                        Already have an account?
                    </div>
                    <div 
                        onClick={()=>{
                            loginModal.onOpen(); 
                            registerModal.onClose();
                        }}
                        className="text-blue-700 cursor-pointer hover:underline">
                        Login with your account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal
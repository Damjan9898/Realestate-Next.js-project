'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    id: string
    label: string
    type?: string
    disabled?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    register,
    required,
    errors
}) => {
    return(
        <div className="w-full relative">
            <input 
                id={id}
                disabled={disabled}
                { ...register(id, { required })}
                placeholder=" "
                type={type}
                className={`
                    peer
                    w-full
                    px-6
                    py-2
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-80
                    disabled:cursor-not-allowed
                    ${errors[id] ? 'border-blue-600' : 'border-neutral-400'}
                    ${errors[id] ? 'focus:border-red-600' : 'focus:border-red'}
                `}
            />
            <label
                className={`
                    absoulte
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]   
                    peer-placeholder-shown:scale-100
                    ${errors[id] ? 'tex-blue-600' : 'text-black-500'}
                `}
            >
                {label}
            </label>
        </div>
    )
}

export default Input
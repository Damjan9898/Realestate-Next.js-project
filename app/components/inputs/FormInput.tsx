'use client'

import { ChangeEventHandler } from 'react';
import { IconType } from "react-icons";
import { FieldErrors } from "react-hook-form"

interface FormInputProps {
    type:string
    value:string
    onChange_handler: ChangeEventHandler<HTMLInputElement> | undefined
    placeholder?:string
    icon?: IconType
    surfaceicon?:boolean
    label:string
    input_size?:boolean
    required_input?:boolean
}

const FormInput: React.FC<FormInputProps> = ({
    type,
    value,
    onChange_handler,
    placeholder,
    icon: Icon,
    surfaceicon,
    label,
    input_size,
    required_input
}) => {
    return(
        <div className="w-full">
                <label className="text-sm font-semibold">
                        {label}&nbsp; 
                        { required_input &&(
                            <span className="text-red-700">*</span>
                        )}
                        
                </label>
                <div className="w-full flex justify-between">
                    <div className={`relative ${input_size ? 'md:w-full' : 'md:w-[230px]'} w-full`}>
                        <input
                        type={type}
                        value={value}
                        required={required_input}
                        onChange={onChange_handler}
                        placeholder={placeholder}
                        className={` border-[2px] rounded-md py-1 pl-2 h-[32px] pr-6 focus:border-orange-500 outline-none ${input_size ? 'md:w-full' : 'md:w-[230px]'} w-full`}
                        />
                        <div className='absolute right-1 top-[7px]'>
                            {Icon && (
                                <Icon size={18} color="gray"/>
                            )}
                            {surfaceicon && (
                                <p className=" text-gray-400 text-[15px] mb-[2px] font-semibold">m<sup>2</sup></p>
                            )}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default FormInput
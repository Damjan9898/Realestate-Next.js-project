'use client'

import { ChangeEventHandler } from 'react';
import { IconType } from "react-icons";

interface FilterInputProps {
    label: string
    type:string
    value_min: string
    onChange_min: ChangeEventHandler<HTMLInputElement> | undefined
    placeholder_min:string
    value_max: string
    onChange_max: ChangeEventHandler<HTMLInputElement> | undefined
    placeholder_max:string
    icon?: IconType
    textIcon?:boolean
}

const FilterInput: React.FC<FilterInputProps> = ({
    label,
    type,
    value_min,
    onChange_min,
    placeholder_min,
    value_max,
    onChange_max,
    placeholder_max,
    icon: Icon,
    textIcon
}) => {
    return(
        <div className="flex flex-col lg:mt-auto mt-5">
            <label className="font-semibold">{label}</label>
                <div className='flex md:flex-row flex-col'>
                    <div className='relative w-fit mr-3'>
                        <input
                            type={type}
                            value={value_min}
                            onChange={onChange_min}
                            placeholder={placeholder_min}
                            className="border-[2px] rounded-md py-1 pl-2 pr-6 focus:border-orange-500 outline-none"
                        />
                        <div className='absolute right-1 top-2'>
                            {Icon && (
                                <Icon size={18} color="gray"/>
                            )}
                            {textIcon && (
                                <p className=" text-gray-400 text-[15px] mb-[2px] font-semibold">m<sup>2</sup></p>
                            )}
                        </div>
                    </div>
                    <div className='relative w-fit mt-5 md:mt-auto'>
                        <input
                            type={type}
                            value={value_max}
                            onChange={onChange_max}
                            placeholder={placeholder_max}
                            className="border-[2px] rounded-md py-1 pl-2 pr-6 focus:border-orange-500 outline-none"
                        /> 

                        <div className='absolute right-1 top-2'>
                            {Icon && (
                                <Icon size={18} color="gray"/>
                            )}
                            {textIcon && (
                                <p className=" text-gray-400 text-[15px] mb-[2px] font-semibold">m<sup>2</sup></p>
                            )}
                        </div>
                    </div>
                  
                </div>
                
        </div>
    )
}

export default FilterInput
'use client'

import { ChangeEventHandler } from 'react';

interface FormRadioProps {
    type:string
    onChange_handler: ChangeEventHandler<HTMLInputElement> | undefined
    label:string
    required_input?:boolean
    name:string
}

const FormRadio: React.FC<FormRadioProps> = ({
    type,
    onChange_handler,
    label,
    required_input,
    name

}) => {
    return(
        <div className="w-full">
                <label className="text-sm font-semibold">
                        {label}&nbsp;  
                        { required_input &&(
                            <span className="text-red-700">*</span>
                        )}
                </label>
                <div className="flex justify-start w-[230px]">
                    <div className={`relative w-fit flex justify-between items-center`}>
                        <input
                        name={name}
                        type={type}
                        value={"Yes"}
                        onChange={onChange_handler}
                        className={` border-[2px] rounded-md py-1 pl-2 h-[32px] pr-6 focus:ring-orange-600 outline-none cursor-pointer `}
                        />
                        <label htmlFor="yes_label" className='ml-2 mr-7 cursor-pointer'>Yes</label>
                    </div>
                    <div className={`relative w-fit flex justify-between items-center`}>
                        <input
                        name={name}
                        type={type}
                        value={"No"}
                        onChange={onChange_handler}
                        className={` border-[2px] rounded-md py-1 pl-2 h-[32px] pr-6 focus:ring-orange-600 outline-none cursor-pointer`}
                        />
                        <label htmlFor="no_label" className='ml-2 mr-7 cursor-pointer'>No</label>
                    </div>
                </div>
        </div>
    )
}

export default FormRadio
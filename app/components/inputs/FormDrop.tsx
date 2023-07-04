'use client'

import { ChangeEventHandler } from 'react';

interface FormDropProps {
    label: string
    options: string[]
    onChange_handler: ChangeEventHandler<HTMLSelectElement> | undefined
    location_select?:boolean
    input_size?:boolean
    required_input?:boolean
}

const FormDrop: React.FC<FormDropProps> = ({
    label,
    options,
    onChange_handler,
    location_select,
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
                    <select onChange={onChange_handler} className="block w-full rounded-md border-[2px] py-1 px-2 focus:border-orange-500 outline-none">
                        {location_select && (
                        <option value="All" >All</option>  
                        )}     
                            {options.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}

                        </select>
                    </div>
                </div>
        </div>
                    
                  

    )
}

export default FormDrop
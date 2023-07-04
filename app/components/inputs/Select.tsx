'use client'

import { ChangeEventHandler } from 'react';

interface SelectProps {
    label: string
    options: string[]
    onChange_location: ChangeEventHandler<HTMLSelectElement> | undefined
    location_select?:boolean
    type_select?:boolean
}

const Select: React.FC<SelectProps> = ({
    label,
    options,
    onChange_location,
    location_select,
    type_select
}) => {
    return(
        
        <div className="flex flex-col mt-3">
            <label className="font-semibold">{label}</label>

            <select onChange={onChange_location} className="block w-[217px] rounded-md border-[2px] py-1 px-2 mr-3">
            {location_select && (
               <option value="All" >All</option>  
            )}
            {type_select && (
               <option value="Both" selected>Both</option>  
            )}

                         
                {options.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}

            </select>
                
        </div>
    )
}

export default Select
'use client'

import { ChangeEventHandler } from 'react';

interface FormInputProps {
    value:string
    onChange_handler: ChangeEventHandler<HTMLTextAreaElement> | undefined
    label:string
    input_size?:boolean
    required_input?:boolean
}

const FormTextArea: React.FC<FormInputProps> = ({
    value,
    onChange_handler,
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
                <div className="flex justify-between">

                <textarea
                  value={value}
                  rows={3}
                  required={required_input}
                  onChange={onChange_handler}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 pl-2 pr-6 outline-none ${input_size ? 'w-full' : 'w-fit'}`}
                  defaultValue={''}
                />
                    
                </div>
        </div>
                    
    )
}

export default FormTextArea




'use client'

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
    important?:boolean

}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    important
})=>{
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                disabled:bg-stone-400
                disabled:cursor-not-allowed
                rounded-md
                text-sm
                flex
                transition
                justify-center
                w-full
                ${important ? 'bg-amber-400 hover:bg-amber-300' : 'bg-white border-gray-300 border-[1px] hover:bg-slate-100' }
                ${small ? 'py-1 px-1' : 'py-2 px-2'}    
                ${small ? 'text-sm' : 'text-md'}    
                ${small ? 'font-light' : 'font-semibold'}  
                   
            `}>
            {Icon && (
                <Icon
                    size={20}
                    className="
                        relative
                        top-0
                        right-1
                    "
                />
            )}
            {label}
        </button>
    )
}

export default Button
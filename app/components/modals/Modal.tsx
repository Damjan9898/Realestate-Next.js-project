'use client'

import { useCallback, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {

    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return
        }

        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return
        }

        onSubmit()
    }, [disabled, onSubmit])

    const handlesecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return
        }

        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null
    }

    return (
        <>
            <div
                className="
                    justify-center
                    items-center
                    flex
                    overflow-x-hidden
                    overflow-y-hidden
                    fixed
                    inset-0
                    z-50
                    h-auto
                    outline-none
                    focus:outline-none
                    bg-neutral-800/80
                "
            >
                <div
                    className="
                        relative
                        w-full
                        md:max-w-sm
                        lg:max-w-lg
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto    
                    "
                >
                    {/* Saddrzaj modala */}
                    <div
                        className={`
                            translate
                            duration-300
                            h-full
                            ${showModal ? 'translate-y-0' : 'translate-y-full'}
                            ${showModal ? 'opacity-100' : 'opacity-0'}
                        `}>
                        <div
                            className="
                                translate
                                h-full
                                lg:h-auto
                                md:h-auto
                                border-0
                                rounded-lg
                                shadow-lg
                                relative
                                flex
                                flex-col
                                w-full
                                bg-white
                                outline-none
                                focus:outline-none            
                            "
                        >
                            {/* Header modala */}
                            <div
                                className="
                                    flex
                                    items-center
                                    p-6
                                    rounded-t
                                    justify-center
                                    relative
                                    border-b-[1px]
                                "
                            >
                                
                                {/* hardkodovani tekst u novom div bloku */}
                                <div className="md:text-xl lg:text-2xl font-semibold">
                                    {title}
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="
                                        p-1
                                        border-0
                                        hover:opacity-70
                                        transition
                                        absolute
                                        right-9
                                    "
                                >
                                    <FaWindowClose size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="relative p-7 flex-auto">
                                {body}
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col gap-3 p-7">
                                <div
                                    className="
                                        flex
                                        flex-row
                                        items-center
                                        gap-5
                                        w-full
                                    "
                                >
                                    {secondaryAction && secondaryActionLabel && (<Button 
                                        outline
                                        disabled={disabled}
                                        label={secondaryActionLabel}
                                        onClick={handlesecondaryAction}
                                        important={false}
                                    />
                                    )}
                                    <Button 
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                        important={true}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
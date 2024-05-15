import React, { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import Blur from "../../Blur";


interface ModalStructureProps{
    children: ReactNode
}

interface ModalProps{
    isVisible: boolean,
    setIsVisible: (visiblity: boolean) => void,
    children: ReactNode,
    width?: string 
}

export const ModalHeader: React.FC<ModalStructureProps> = ({
    children
}) => {
    return <>
        <div
            className="border-b p-4"
        >
            {children}
        </div>
    </>
}

export const ModalBody: React.FC<ModalStructureProps> = ({
    children
}) => {
    return <>
        <div
            className="p-2"
        >
            {children}
        </div>
    </>
}

export const ModalFooter: React.FC<ModalStructureProps> = ({
    children
}) => {
    return <>
        <div
            className="border-t p-3 bottom-0 absolute w-full
            flex justify-end"
        >
            {children}
        </div>
    </>
}



const Modal: React.FC<ModalProps> = ({
    isVisible,
    setIsVisible,
    children,
    width
}) => {
    return <>
        <Blur
            classList={!isVisible ? 'hidden' : null}
        />
        <div
            className=""
        >
            <div
                className={`
                    bg-white rounded-md shadow-sm
                    fixed ${width} h-max duration-[.1s]
                    ease-linear  ${isVisible ? 'scale-1' : 'scale-0 pointer-events-none'}
                    z-40 translate-x-[-50%] left-[50%] top-[50%] translate-y-[-50%]
                `}
            >   
                <FaTimes 
                    className="bg-white shadow-md
                    p-1 text-[24px] rounded-md absolute right-[-10px]
                    top-[-10px]"
                    cursor={"pointer"}
                    onClick={() => setIsVisible(false)}
                />
                {children}
            </div>
        </div>
    </>
}

export default Modal
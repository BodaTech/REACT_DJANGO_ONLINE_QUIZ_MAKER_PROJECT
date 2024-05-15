import React from "react";
import { FaTimes } from "react-icons/fa";

interface AlertProps{
    priority: string,
    content: any,
    setIsVisible: (val: any) => void
}

const Alert: React.FC<AlertProps> = ({
    priority,
    content,
    setIsVisible
}) => {

    const priorities: Record<string, string> = {
        primary: 'bg-blue-300 border-blue-500 text-blue-600',
        secondary: 'bg-gray-300 border-gray-500 text-gray-600',
        danger: 'bg-red-500 border-red-500 text-gray-100',
        warning: 'bg-yellow-300 border-yellow-500 text-yellow-600',
        success: 'bg-green-300 border-green-500 text-green-600'
    }

    return <>
        <div
            className={`${priorities[priority]} p-2
            bottom-0 inset-x-0 w-100 bg-opacity-90 fixed z-30
            shadow-md text-center duration-75 ease-linear from-down-to-top
            h-20 grid place-items-center`}
        >
            {content}
            <FaTimes 
                className="absolute top-3 right-3
                cursor-pointer"
                onClick={() => setIsVisible(null)}
            />
        </div>
    </>
}

export default Alert
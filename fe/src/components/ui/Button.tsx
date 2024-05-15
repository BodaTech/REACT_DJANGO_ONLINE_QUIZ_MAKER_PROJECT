import React from "react"


interface ButtonProps{
    text: any,
    priority: string,
    outline?: boolean,
    action?: () => void,
    type: "submit" | "button" | "reset",
    classList?: string
}

const Button: React.FC<ButtonProps> = (
    {
        text,
        priority,
        outline = false,
        action,
        type,
        classList
    }
) => {
    
    const priorities: Record<string, string> = {
        primary: 'bg-blue-400 text-gray-50',
        secondary: 'bg-gray-400 text-gray-50',
        dark: 'bg-gray-600 text-gray-50',
        light: 'bg-gray-200 text-gray-500',
        danger: 'bg-red-400 text-gray-50',
        warning: 'bg-yellow-400 text-gray-50',
        success: 'bg-green-400 text-gray-50'
    }

    const outlines: Record<string, string> = {
        primary: 'text-blue-400 border-blue-400',
        secondary: 'text-gray-400 border-gray-400',
        dark: 'text-gray-600 border-gray-400',
        light: 'text-gray-200 border-gray-400',
        danger: 'text-red-400 border-red-400',
        warning: 'text-yellow-400 border-yellow-400',
        success: 'text-green-400 border-green-400'
    }

    return <>
        <button
            className={`px-3 py-1 shadow-sm rounded-md border 
            ${priorities[priority]} ${outline ? outlines[priority] + ' bg-transparent': ''}
            ${classList}`}
            onClick={() => action ? action(): {}}
            type={type}
        >
            {text}
        </button>
    </>
}

export default Button
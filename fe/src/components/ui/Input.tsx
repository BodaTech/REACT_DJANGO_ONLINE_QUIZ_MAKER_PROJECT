import React from "react";

interface InputProps{
    placeholder: string,
    value: any,
    setValue: (val: any) => void,
    type: "text" | "password" | "date" | "datetime"| "number" | "checkbox" | "radio",
    classList?: string,
    min?: number,
    max?: number,
    read_only?: boolean
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    setValue,
    type,
    classList,
    min,
    max,
    read_only=false
}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return <>
        <input 
            className={`border py-2 px-4 rounded-md text-gray-500
            outline-blue-200 w-full ${classList}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e)}
            type={type}
            minLength={min}
            maxLength={max}
            readOnly={read_only}
        />
    </>
}

export default Input

import React, { useState, useEffect, useRef } from "react";


interface TextAreaProps{
    placeholder: string,
    value: any,
    setValue: (val: any) => void,
    hasCustomSetter?: boolean,
    cols?: number,
    rows?: number,
    classList?: string,
    read_only?: boolean,
    onClick?: () => void
}

const TextArea: React.FC<TextAreaProps> = ({
    placeholder,
    value,
    setValue,
    cols = 10,
    rows = 4,
    classList,
    hasCustomSetter = false,
    read_only=false,
    onClick = () => {},
}) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        hasCustomSetter ? setValue(event) : setValue(event.target.value)
    }

    useEffect(() => {
        if(textAreaRef.current){
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
        }
    },[value])

    return <>
        <textarea 
            className={`py-2 px-4 rounded-md
            outline-blue-200 w-full border ${classList}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e)}
            cols={cols}
            spellCheck={false}
            ref={textAreaRef}
            readOnly={read_only}
            onClick={onClick}
        ></textarea>
    </>
}

export default TextArea

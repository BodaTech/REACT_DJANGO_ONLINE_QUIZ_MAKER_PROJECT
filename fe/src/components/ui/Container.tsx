import React, { ReactNode } from "react";

interface ContainerProps{
    size: "sm" | "md" | "lg",
    children: ReactNode,
    classList?: string
}

const Container: React.FC<ContainerProps> = ({
    size,
    children,
    classList
}) => {

    const sizes: Record<string, string> = {
        sm: 'px-4 py-2',
        md: 'px-6 py-3',
        lg: 'px-10 py-5',
    }

    return <>
        <div
            className={`${sizes[size]} ${classList}`}
        >
            {children}
        </div>
    </>
}

export default Container

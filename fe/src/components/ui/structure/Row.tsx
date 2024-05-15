import React, {ReactNode} from "react";

interface RowProps{
    children: ReactNode,
    cols?: string,
    gap?: string
}

const Row: React.FC<RowProps> = ({children, cols, gap}) => {
    return <>
        <div
            className={`grid grid-cols-${cols ? cols : '1'} gap-${gap ? gap : '1'} w-full`}
        >
            {children}
        </div>
    </>
}

export default Row

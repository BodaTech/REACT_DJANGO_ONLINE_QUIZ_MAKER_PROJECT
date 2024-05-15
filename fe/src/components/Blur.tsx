import React from "react";

const Blur: React.FC<any> = ({classList}) => {
    return <>
        <div
            className={`fixed inset-0 backdrop-blur-[3px]
            flex items-center justify-center bg-gray-400
            bg-opacity-50 z-20 ${classList}`}
        ></div>
    </>
}

export default Blur
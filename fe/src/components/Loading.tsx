import React from "react";

interface LoadingProps{
    isLoading: boolean,
    message: string
}

const Loading: React.FC<LoadingProps> = ({
    isLoading,
    message
}) => {
    return <>
        {isLoading ? (
            <div
                className={`fixed inset-0 backdrop-blur-[3px]
                flex flex-col gap-3 items-center justify-center bg-gray-400
                bg-opacity-50 z-40`}
            >
                <div
                    className="animate-spin"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="32" height="32" 
                        id="loading"
                        className="scale-125"
                    >
                        <path d="M27.02 22.82a.182.182 1080 1 0 .364 0 .182.182 1080 1 0-.364 0zm-4.018 4.146a.362.362 1080 1 0 .724 0 .362.362 1080 1 0-.724 0zM17.586 29.1a.544.544 1080 1 0 1.088 0 .544.544 1080 1 0-1.088 0zm-5.83-.286a.724.724 1080 1 0 1.448 0 .724.724 1080 1 0-1.448 0zM6.584 26.16a.906.906 1080 1 0 1.812 0 .906.906 1080 1 0-1.812 0zm-3.582-4.512a1.088 1.088 1080 1 0 2.176 0 1.088 1.088 1080 1 0-2.176 0zm-1.344-5.54a1.268 1.268 1080 1 0 2.536 0 1.268 1.268 1080 1 0-2.536 0zm1.106-5.504a1.45 1.45 1080 1 0 2.9 0 1.45 1.45 1080 1 0-2.9 0zm3.318-4.438a1.632 1.632 1080 1 0 3.264 0 1.632 1.632 1080 1 0-3.264 0zm4.872-2.542a1.812 1.812 1080 1 0 3.624 0 1.812 1.812 1080 1 0-3.624 0zm5.472-.158a1.994 1.994 1080 1 0 3.988 0 1.994 1.994 1080 1 0-3.988 0zm5.01 2.254a2.174 2.174 1080 1 0 4.348 0 2.174 2.174 1080 1 0-4.348 0zm3.56 4.234a2.356 2.356 1080 1 0 4.712 0 2.356 2.356 1080 1 0-4.712 0zm1.416 5.484a2.538 2.538 1080 1 0 5.076 0 2.538 2.538 1080 1 0-5.076 0z"></path>
                    </svg>
                </div>
                <p
                    className="font-bold"
                >{message}</p>
            </div>
        ) : null}
    </>
}

export default Loading
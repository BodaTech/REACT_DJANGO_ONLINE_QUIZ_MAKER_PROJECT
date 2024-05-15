import React from "react";
import { useContext } from "react";
import QuizContext from "../../../context/QuizContext";

interface QuestionWidgetProps{
    index: number,
    isActive: boolean,
}

const QuestionWidget: React.FC<QuestionWidgetProps> = ({
    index,
    isActive,
}) => {

    const {removeQuestion, setActiveQuestion: setIsActive} = useContext(QuizContext)

    return <>
        <div
            className="relative"
        >
            <div
                className={`w-10 h-10 border
                grid place-items-center rounded-md
                duration-75 ease-linear
                ${isActive ? 
                'border-gray-400 bg-gray-300 text-gray-900'
                : 'bg-gray-200 cursor-pointer'}`}
                onClick={() => setIsActive(index)}
            >
                {index + 1}
            </div>
            {index >= 1 ? (
                <div
                    className="absolute w-4 h-4
                    bg-red-500 text-gray-50 grid
                    place-content-center rounded-md
                    -top-1 -right-1 cursor-pointer"
                    onClick={() => removeQuestion(index)}
                >
                    -
                </div>
            ): null}
        </div>
    </>
}

export default QuestionWidget
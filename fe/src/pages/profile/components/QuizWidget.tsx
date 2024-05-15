import React from "react"
import Quiz from "../../../models/Quiz"
import { FaMinus } from "react-icons/fa"

const QuizWidget: React.FC<{
    quiz: Quiz, 
    handleDelete?: (id: number) => void,
    expand?: () => void,
    action?: (quizId: number) => void
}> = ({
    quiz, 
    handleDelete = () => {},
    action = () => {},
}) => {

    const deleteQuiz = () => {
        if(quiz.id){
            confirm("Delete Confirmation !") ? handleDelete(quiz.id) : null
        }
    }

    return <>
        <div
            className="bg-gray-200 text-center p-2 rounded-md
            min-w-60 cursor-pointer hover:shadow-sm
            duration-200 relative group"
            onClick={() => {action(quiz.id ? quiz.id : 0)}}
        >
            Quiz Code: <span
                className="font-bold"
            >{quiz.code}</span> <br />
            Title: <span
                className="font-bold"
            >{quiz.title}</span>
            <div
                className="text-sm"
            >
                <p>
                    Questions: <span
                        className="font-bold"
                    >{quiz.questions.length}</span>
                </p> 
            </div>
            <div
                className="absolute bg-red-400 p-1
                rounded-full -top-2 -right-2 hidden group-hover:block" 
                onClick={deleteQuiz}
            >
                <FaMinus 
                    className="text-white text-xs"
                /> 
            </div>
        </div>
    </>
}

export default QuizWidget


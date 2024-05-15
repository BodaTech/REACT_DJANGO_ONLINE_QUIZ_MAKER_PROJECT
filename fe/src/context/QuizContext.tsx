import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Question from "../models/Question";


const QuizContext = createContext<any>(null)

export const QuizProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    
    const [questions, setQuestions] = useState<Question[]>([Question.initialise()])
    const [activeQuestion, setActiveQuestion] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const updateQuestions = (index: number, updatedQuestion: Question) => {
        const updatedQuestions: Question[] = [...questions]
        updatedQuestions[index] = updatedQuestion
        setQuestions(updatedQuestions)
    }

    const addQuestion = () => {
        const newQuestions = [...questions, Question.initialise()]
        setQuestions(newQuestions)
    }

    const removeQuestion = (index: number) => {
        const newQuestions = questions.filter((_question, lIndex) => {
            return lIndex != index
        })
        if (activeQuestion == index){
            setActiveQuestion(index - 1);
        }else if(activeQuestion > index){
            setActiveQuestion(activeQuestion - 1)
        }
        setQuestions(newQuestions)
    }

    useEffect(() => {
        if (questions.length == 1){
            setActiveQuestion(0)
        }
    }, [])
    
    return <QuizContext.Provider
        value={{
            title,
            setTitle,
            questions,
            activeQuestion,
            error,
            setActiveQuestion,
            setQuestions,
            setError,
            updateQuestions,
            removeQuestion,
            addQuestion,
        }}
    >
        
        {children}
    </QuizContext.Provider>
}

export default QuizContext


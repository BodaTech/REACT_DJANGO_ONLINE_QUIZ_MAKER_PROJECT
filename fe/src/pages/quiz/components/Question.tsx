import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import TextArea from "../../../components/ui/TextArea"
import Question from "../../../models/Question"
import Response from "./Response"
import { FaPlus, FaClock } from "react-icons/fa"
import QuestionResponse from "../../../models/QuestionResponse"
import { useContext } from "react"
import QuizContext from "../../../context/QuizContext"
import UserResponse from "../../../models/UserResponse"
import Button from "../../../components/ui/Button"
import QuizService from "../../../services/QuizService"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

interface QuestionProps{
    index: number,
    question: Question,
    isActive: boolean,
    read_only?: boolean,
    timeOut?: () => void,
    participation?: number,
    setScore?: (score: number) => void,
    setUserResponseIDs?: (id: number[]) => void,
    userResponseIDs?: number[]
}


const QuestionComp: React.FC<QuestionProps> = ({
    index, question, isActive, read_only=false,
    timeOut = () => {}, participation, setScore = () => {},
    setUserResponseIDs = () => {}, userResponseIDs = []
}) => {

    const {updateQuestions} = useContext(QuizContext)

    const durationRef = useRef<HTMLInputElement>(null)
    const [currentTimeLeft, setCurrentTimeLeft] = useState<number>(
        question.duration
    )
    const [userResponse, setUserResponse] = useState<UserResponse>(UserResponse.initialise())

    const privateInstance = useAxiosPrivate()

    useEffect(() => {
        if(read_only){
            setUserResponse({
                ...userResponse, 
                question: question.id ? question.id : 0,
                participation: participation ? participation: 0,
            })
        }
    }, [])

    useEffect(() => {
        if(read_only){
            if(currentTimeLeft > 0){
                setTimeout(() => {
                    setCurrentTimeLeft((prev) => prev - 1)
                }, 1000)
            }
            if(currentTimeLeft == 0){
                submit()
            }
        }
    }, [currentTimeLeft])

    const addResponse = () => {
        const emptyResponse: QuestionResponse = QuestionResponse.initialise()
        updateQuestions(index, {...question, responses: [...question.responses, emptyResponse]})
    }

    const updateResponses = (index: number, questionIndex: number,updatedResponse: QuestionResponse) => {
        const updatedResponses: QuestionResponse[] = [...question.responses]
        updatedResponses[index] = updatedResponse
        updateQuestions(questionIndex, {...question, responses: updatedResponses})
    }

    const removeResponse = (index: number, questionIndex: number) => {
        const newResponses: QuestionResponse[] = [...question.responses].filter(
            (_question, lIndex) => {
                return lIndex !== index
            }
        )
        updateQuestions(questionIndex, {...question, responses: newResponses})
    }

    const addChoice = (id: number) => {
        if(userResponse.choices.find((choice) => choice.response == id) == undefined){
            const newChoices = [...userResponse.choices, {response: id}]
            setUserResponse({...userResponse, choices: newChoices})
        }else{
            removeChoice(id)
        }
    }

    const removeChoice = (id: number) =>{
        const newChoices = userResponse.choices.filter((choice) => choice.response != id)
        setUserResponse({...userResponse, choices: newChoices})
    }

    const handleScore = async (userResponseId: number) => {
        const userResponseChoices = question.responses.filter((response) => {
            return userResponse.choices.some(element => element.response == response.id )
        });

        const allResponseChoices = question.responses
                        
        let newScore = 0;

        allResponseChoices.map((response) => {
            if (userResponseChoices.includes(response) && response.is_correct == true){
                newScore = 1;
            }else if(response.is_correct == true && !(userResponseChoices.includes(response))){
                newScore -= 0.25;
            }else if (userResponseChoices.includes(response) && response.is_correct == false){
                newScore -= 0.5;
            }
        })
        
        if (newScore <= 0) {
            newScore = 0;
        } else {
            setScore(newScore);
            try {
                console.log(userResponseIDs);
                await QuizService.updateScore({ score: newScore }, userResponseId, privateInstance);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const submit = async () => {
        try{
            if(question.id != null){
                const response = await QuizService.answer(userResponse, question.id, privateInstance)
                setUserResponseIDs([...userResponseIDs, response.data.user_response_id])
                handleScore(response.data.user_response_id)
                timeOut()
            }
        }catch(error){
            throw error
        }
    }
    
    return <>
       {isActive ? (
        <>
            <div
                className="w-full realtive grid gap-5"
            >
                <div>
                    <div
                        className="bg-gray-200 py-1 w-20 text-center mx-auto rounded-md
                        text-sm flex justify-center"
                        onClick={() => durationRef.current?.focus()}
                    >
                        <input
                            value={
                                read_only ? currentTimeLeft :
                                (question.duration == 0 ? '': question.duration)
                            }
                            placeholder="--"
                            type="number"
                            className="bg-transparent focus:outline-none w-[20px]
                            no-spinners"
                            ref={durationRef}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                                updateQuestions(index, {...question, duration: event.target.value})}
                            min="1"
                            max="99"
                            readOnly={read_only}
                        /> s
                        <FaClock 
                            className="absolute text-[30px] bg-gray-200 -top-3
                            shadow-sm p-1 left-[50%] -translate-x-[50%] rounded-md"
                            cursor={'pointer'}
                        />
                    </div>
                </div>
                <TextArea
                    placeholder="Question Text..."
                    cols={3}
                    rows={2}
                    value={question.question_text}
                    setValue={(event: React.ChangeEvent<HTMLTextAreaElement>) => 
                        updateQuestions(index, {...question, question_text: event.target.value})}
                    hasCustomSetter={true}
                    read_only={read_only}
                ></TextArea>
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                >
                    {question.responses.map((response, Rindex) => (
                        <Response
                            key={Rindex}
                            index={Rindex}
                            questionIndex={index}
                            response={response}
                            updateResponses={updateResponses}
                            isRemovable={Rindex >= 2 ? true: false}
                            removeResponse={removeResponse}
                            read_only={read_only}
                            addChoice={addChoice}
                        />
                    ))}
                </div>
            </div>
            {!read_only ? (
                <FaPlus
                    className="absolute bottom-[-5px] right-[-5px]
                    bg-green-400 text-gray-50 text-[28px] p-[5px]
                    rounded-full"
                    cursor={'pointer'}
                    onClick={addResponse}
                />
            ): null}
            {
                read_only ? (
                    <div
                        className="absolute p-2 bg-gray-50 rounded-md shadow-sm -bottom-16
                        left-[50%] translate-x-[-50%]"
                    >
                        <Button 
                            text={"next"}
                            priority="dark"
                            type="button"
                            action={submit}
                        />
                    </div>
                ): null
            }
        </>
       ): null} 
    </>
}

export default QuestionComp
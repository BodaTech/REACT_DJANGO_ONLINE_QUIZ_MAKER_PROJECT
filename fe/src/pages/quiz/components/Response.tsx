import React, { useEffect, useState } from "react"
import TextArea from "../../../components/ui/TextArea"
import QuestionResponse from "../../../models/QuestionResponse"
import { FaMinus } from "react-icons/fa"

interface ResponseProps{
    index: number,
    questionIndex: number,
    response: QuestionResponse,
    updateResponses: (index: number, questionIndex: number,Response: QuestionResponse) => void,
    removeResponse: (index: number, questionIndex: number) => void,
    isRemovable?: boolean,
    read_only?: boolean,
    addChoice?: (id: number) => void
}

const Response: React.FC<ResponseProps> = ({
    index,
    response,
    updateResponses,
    questionIndex,
    isRemovable = false,
    removeResponse,
    read_only=false,
    addChoice = () => {}
}) => {

    const [selected, setSelected] = useState<boolean>(false)

    return <>
        <div
            className={`flex p-4  rounded-md
            ${(selected && read_only) ? 'bg-green-200': 'bg-gray-200'}
            ${read_only ? 'cursor-pointer': ''}`}
            onClick={() => {
                setSelected(!selected)
                addChoice(response.id ? response.id : 0)
            }}
        >
            <div
                className="w-full relative flex"
            >
                <TextArea
                    classList={`bg-transparent outline-transparent
                    focus:outline-none border-none relative
                    ${read_only ? 'cursor-pointer': ''}`
                    }
                    placeholder={`Response ${index + 1}`}
                    rows={1}
                    value={response.response_text}
                    hasCustomSetter={true}
                    setValue={(event: React.ChangeEvent<HTMLTextAreaElement>) => updateResponses(index, questionIndex,{...response, response_text: event.target.value})}
                    read_only={read_only}
                >
                </TextArea>
                {
                    !read_only ? (
                        <div
                            className={`w-7 h-7 rounded-full border-2 border-gray-500
                            absolute -top-7 -left-7 cursor-pointer ${response.is_correct ? 'bg-green-300': 'bg-gray-100'}`} 
                            onClick={() => updateResponses(index, questionIndex, {...response, is_correct: !response.is_correct})}
                        ></div>
                    ): null
                }
                {
                    !read_only ? (
                        isRemovable ? (
                            <div
                                className={` bg-red-500 p-1 rounded-md text-gray-50
                                absolute -bottom-6 -right-6 cursor-pointer`} 
                                onClick={() => removeResponse(index, questionIndex)}
                            >
                                <FaMinus />
                            </div>
                        ) : null
                    ): null
                }
            </div>
        </div>
    </>
}

export default Response
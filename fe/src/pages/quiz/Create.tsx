import Container from "../../components/ui/Container"
import QuestionComp from "./components/Question"
import QuestionWidget from "./components/QuestionWidget"
import Button from "../../components/ui/Button"
import QuizService from "../../services/QuizService"
import Quiz from "../../models/Quiz"
import Alert from "../../components/Alert"
import { useContext, useState } from "react"
import QuizContext from "../../context/QuizContext"
import Question from "../../models/Question"
import Loading from "../../components/Loading"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { FaCopy, FaCheckDouble } from "react-icons/fa"
import Input from "../../components/ui/Input"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../routes/routes"

const Create = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [code, setCode] = useState<string>()
    const [isCopied, setIsCopied] = useState(false)
    const privateInstance = useAxiosPrivate()
    const navigate = useNavigate()

    const{ 
        title,
        setTitle,
        questions,
        error,
        setError,
        addQuestion,
        activeQuestion,
        setQuestions
    } = useContext(QuizContext)

    const generateQuiz = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault()
        
        setTimeout(async () => {
            try{
                const response = await QuizService.generateQuiz({
                    title: title,
                    questions: questions
                } as Quiz, privateInstance)
                setCode(response.data.code)
            }catch(error){
                setError('Failed To Generate The Quiz, Pls Try Again !')
            }finally{
                setIsLoading(false)
            }
        }, 1000)
    }

    const copy = () => {
        navigator.clipboard.writeText(code? code : '')
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return <>
        <Loading 
            isLoading={isLoading}
            message="generating your quiz"
        />
        {error ? (
            <Alert 
                content={error}
                priority="danger"
                setIsVisible={setError}
            />
        ): null}
        {code ? 
            <div
                className="fixed flex justify-center items-center
                inset-0 bg-transparent container-img"
            >
                <Container
                    classList="rounded-md w-[350px] sm:w-[400px] flex flex-col
                    items-center justify-center gap-3 h-max py-4
                    shadow-sm bg-gray-50"
                    size="md"
                >
                    <h1
                        className="text-[20px] font-bold"
                    >Quiz Code</h1>
                    <div
                        className="bg-gray-200 p-2 text-center rounded-md w-full
                        text-lg relative"
                        style={{
                            letterSpacing: "1.2px"
                        }}
                    >
                        {code}
                        <div
                            className="absolute right-2 top-3 p-1
                            bg-gray-300 rounded-md cursor-pointer"
                            onClick={copy}
                        >
                            {!isCopied ? 
                                <FaCopy 
                                    className="text-gray-400 text-sm"
                                /> : 
                                <FaCheckDouble 
                                    className="text-gray-400 text-sm"
                                />
                            }
                        </div>
                    </div>
                    <div
                        className="w-full flex gap-1"
                    >
                        <Button 
                            priority="primary"
                            text={"Dashboard"}
                            action={() => {navigate(ROUTES.DASHBOARD)}}
                            classList="w-full"
                            type="button"
                        />
                        <Button 
                            priority="success"
                            text={"Create New Quiz"}
                            action={() => {
                                setQuestions([Question.initialise()])
                                setCode("")
                            }}
                            classList="w-full"
                            type="button"
                        />
                    </div>
                </Container>
            </div>
        : <form
                className="flex flex-col py-10 items-center justify-center
                container-img gap-5
                min-h-[100vh] pt-20"
                onSubmit={generateQuiz}
            >
                <div>
                    <Input 
                        placeholder="Quiz Title"
                        value={title}
                        setValue={setTitle}
                        type="text"
                    />
                </div>
                <Container
                    classList="rounded-md h-max relative
                    h-[170px] py-6 w-[94%] md:w-[70%] mx-4
                    shadow-sm bg-gray-50 flex gap-2 flex-wrap"
                    size="md"
                >
                    {questions.map((_question: Question, index: number) => (
                        <QuestionWidget 
                            key={index}
                            index={index}
                            isActive={activeQuestion == index}
                        />
                    ))}
                    <div
                        className={`w-10 h-10
                        grid place-items-center rounded-md
                        duration-75 ease-linear
                        bg-gray-800 text-gray-50 cursor-pointer`}
                        onClick={() => addQuestion()}
                    >
                        +
                    </div>
                </Container>
                <Container
                    classList="rounded-md h-max relative
                    min-h-[170px] py-8 w-[94%] md:w-[70%] mx-4
                    shadow-sm bg-gray-50 min-h-max scroll"
                    size="md"
                >
                    {questions.map((question: Question, index: number) => (
                        <QuestionComp 
                            key={index}
                            index={index}
                            question={question}
                            isActive={index == activeQuestion}
                        />
                    ))}
                </Container>
                <div
                    className="p-2 bg-gray-50 rounded-md shadow-sm"
                >
                    <Button 
                        text={"generate"}
                        priority="dark"
                        type="submit"
                    />
                </div>
            </form> 
    }
    </>
}

export default Create
import { ReactNode, useEffect, useState } from "react"
import Button from "../../components/ui/Button"
import Container from "../../components/ui/Container"
import QuestionComp from "./components/Question"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import QuizService from "../../services/QuizService"
import QuizModel, {} from "../../models/Quiz"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import Loading from "../../components/Loading"
import { ROUTES } from "../../routes/routes"

const QuizInfo: React.FC<{children: ReactNode, size: "sm" | "lg"}> = ({children, size}) => {
    return <>
        <div
            className={`py-2 px-5 bg-gray-200 rounded-md
            text-${size}`}
        >
            {children}
        </div>
    </>
}



const Quiz = () => {


    const [quiz, setQuiz] = useState<QuizModel|null>()
    const [isInProgress, setIsInProgress] = useState<boolean>(false)
    const {quizCode} = useParams();
    const [nextQuestion, setNextQuestion] = useState<number>(1)
    const [timeToStart, setTimeToStart] = useState<number>(0)
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loadingMsg, setLoadingMsg] = useState<string>('')
    const navigator = useNavigate()
    const privateInstance = useAxiosPrivate()

    const location = useLocation()

    const [participation, setParticipation] = useState<number>(location?.state ? location.state : 0)

    const moveToNext = () => {
        if(nextQuestion < (quiz?.questions.length ? quiz?.questions.length: 0)){
            setNextQuestion(nextQuestion + 1)
        } else{
            setIsFinished(true)
            setNextQuestion(1)
            // updating participation score
        }
    }

    const startQuiz = () => {
        setScore(0)
        setIsInProgress(true)
    }

    const join = (quizId: number) => {
        setIsLoading(true)
        setLoadingMsg("Joining Quiz...")
        setTimeout(async () => {
            try{
                if(quiz?.code){
                    const newParticipation = await QuizService.participate(quizId, quiz?.code, privateInstance)
                    setParticipation(newParticipation)
                    setIsFinished(false)
                    setIsInProgress(false)
                }
                
            }catch(error){
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }, 1000)
    }

    useEffect(() => {
        if(participation == 0){
            navigator(ROUTES.JOIN_QUIZ)
        }
    }, [participation])

    useEffect(() => {
        const finalScore = ((score * 100) / (quiz?.questions.length ? quiz?.questions.length : 0)).toFixed(2);
        (async () => {
            await QuizService.updateGlobalScore({score: parseFloat(finalScore)}, participation, privateInstance)
        })()
    }, [score])

    useEffect(() => {
        (async () => {
            const response = await QuizService.findQuiz(quizCode? quizCode : '', privateInstance)
            setQuiz(response.data)
        })()
    }, [])

    useEffect(() => {
        if(timeToStart > 0){
            setTimeout(() => {
                setTimeToStart((prev) => prev - 1)
            }, 1000)
        }
    }, [timeToStart])

    return <>

        <Loading 
            isLoading={isLoading}
            message={loadingMsg}
        />

        <form
            className="flex flex-col py-10 items-center justify-center
            container-img gap-5
            min-h-[100vh] pt-20"
            onSubmit={() =>{}} 
        >
            {isInProgress && !isFinished ? (
                <>
                    <Container
                        classList="rounded-md h-max relative
                        min-h-[170px] py-8 w-[94%] md:w-[70%] mx-4
                        shadow-sm bg-gray-50 min-h-[50vh] scroll"
                        size="md"
                    >
                        {quiz?.questions.map((question, index) => (
                            <>
                                {index + 1 == nextQuestion ? (
                                    <QuestionComp 
                                        key={question.id}
                                        index={question.id ? question.id : 1}
                                        question={question}
                                        isActive={(index + 1) == nextQuestion}
                                        read_only
                                        timeOut={moveToNext}
                                        participation={participation}
                                        setScore={(score) => setScore(prev => prev + score)}
                                    />
                                ): null}
                            </>
                        ))}
                    </Container>
                    
                </>
            ): <>
                <div
                    className="bg-gray-100 px-3 py-4 w-96
                    rounded-md flex flex-col justify-center
                    text-center gap-2"
                >

                    {!isFinished ? (
                        <>
                            <h2>
                            {timeToStart == 0 ? 'Quiz Informations' : 'Quiz starts in'}</h2>
                    
                            {timeToStart == 0 ? (
                                <>
                                    <QuizInfo
                                        size="sm"
                                    >
                                        <p
                                            className="font-bold"
                                        >{quiz?.code}</p>
                                    </QuizInfo>

                                    <QuizInfo
                                        size="sm"
                                    >
                                        {quiz?.questions.length} questions
                                    </QuizInfo>

                                    <QuizInfo
                                        size="sm"
                                    >
                                        <label>
                                            Created By 
                                        </label> {quiz?.user.username}
                                    </QuizInfo>

                                    <Button 
                                        priority="dark"
                                        text={"Start"}
                                        type="button"
                                        action={() => {
                                            setTimeToStart(5)
                                            setTimeout(() => {
                                                startQuiz()
                                            }, 5000)
                                        }}
                                    />
                                </>
                            ): 
                            <div
                                className="p-2 rounded-full bg-gray-300
                                text-lg w-20 h-20 mx-auto grid place-items-center"
                            >
                                {timeToStart}
                            </div>}
                        </>
                    ): <div
                        className="grid gap-2"
                    >
                            <h2>Quiz Result</h2>
                            <div
                                className="p-2 rounded-full bg-gray-300
                                text-[15px] min-w-20 h-20 mx-auto grid place-items-center
                                font-bold"
                                style={{
                                    wordSpacing: '-6px'
                                }}
                            >
                                {((score * 100) / (quiz?.questions.length ? quiz?.questions.length : 0)).toFixed(2)} / 100
                            </div>
                            <Button 
                                priority="dark"
                                text={"Try Again ?"}
                                action={() => join(quiz?.id ? quiz.id : 0)}
                                type="button"
                            />
                        </div>}
                </div>
            </>}
        </form>
    </>
}

export default Quiz
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import QuizService from "../../services/QuizService"
import Alert from "../../components/Alert"
import Loading from "../../components/Loading"
import Container from "../../components/ui/Container"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { ROUTES } from "../../routes/routes"


const Participate = () => {

    const [code, setCode] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loadingMsg, setLoadingMsg] = useState<string>('')
    const privateInstance = useAxiosPrivate()
    const [err, setErr] = useState<string | null>(null)
    const navigator = useNavigate()

    const join = (quizId: number) => {
        setIsLoading(true)
        setLoadingMsg("Joining")
        setTimeout(async () => {
            try{
                const participation = await QuizService.participate(quizId, code, privateInstance)
                navigator(`/quiz/${code}`, {state: participation})
            }catch(error){
                setErr("Something went wrong, thanks for trying again")
            }finally{
                setIsLoading(false)
            }
        }, 1000)
    }

    const find = () => {
        setIsLoading(true)
        setLoadingMsg("Finding The Quiz")
        setTimeout(async () => {
            try{
                const quiz = await QuizService.findQuiz(code, privateInstance)
                join(quiz.data.id)
            }catch(error){
                setErr('Quiz Not Found')
                setIsLoading(false)
            }
        }, 1000)
    }

    return <>
        {err? (
            <Alert
                content={err}
                priority="danger"
                setIsVisible={setErr}
            />
        ): null}
        <Loading 
            isLoading={isLoading}
            message={loadingMsg}
        />
        <div
            className="fixed flex justify-center items-center
            inset-0 container-img"
        >
            <Container
                classList="rounded-md w-[350px] sm:w-[400px] flex flex-col
                items-center justify-center gap-3 h-[170px] py-4
                shadow-sm bg-gray-50"
                size="md"
            >
                <Input 
                    placeholder="Quiz Code"
                    setValue={setCode}
                    value={code}
                    type="text"
                    classList={`py-[11px] text-center ${err ? 'animate-linear_bounce border-red-400': ''}`}
                    min={0}
                    max={12}
                />
                <div className="grid grid-cols-2 gap-1 w-full">
                    <Button 
                        text={'Create'}
                        priority="success"
                        type="button"
                        action={() => {navigator(ROUTES.CREATE_QUIZ), {replace: true}}}
                        classList="py-2 font-bold"
                    />
                    <Button 
                        text={'Join'}
                        priority="primary"
                        type="button"
                        action={() => find()}
                        classList="py-2 font-bold"
                    />
                </div>
            </Container>
        </div>
    </>
}

export default Participate
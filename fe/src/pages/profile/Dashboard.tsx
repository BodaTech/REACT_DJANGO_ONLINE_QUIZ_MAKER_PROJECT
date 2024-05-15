import { useEffect, useState } from "react"
import QuizWidget from "./components/QuizWidget"
import Quiz from "../../models/Quiz"
import QuizService from "../../services/QuizService"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import Modal, { ModalBody } from "../../components/ui/modal/Modal"
import Loading from "../../components/Loading"
import ParticipationsDetails from "./components/ParticipationsDetails"



const Dashboard = () => {

    const [quizzes, setQuizzes] = useState<Quiz[]>()
    const [isLoaing, setIsLoading] = useState<boolean>(false)
    const [toggleModal, setToggleModal] = useState<boolean>(false)
    const [detail, setDetail] = useState<any>([])
    const privateInstance = useAxiosPrivate()

    const handleDelete = async (id: number) => {
        setIsLoading(true)
        try{
            await QuizService.delete(privateInstance, id)
            const newQuizzes = quizzes?.filter(quiz => quiz.id != id)
            setQuizzes(newQuizzes)
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    const show = (quizId: number) => {
        const data = quizzes?.find((quiz) => quiz.id == quizId)
        setDetail(data)
        setToggleModal(true)
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try{
                const response = await QuizService.getUserQuizzes(privateInstance)
                setQuizzes(response.data)
            }catch(error){
                throw error
            }finally{
                setIsLoading(false)
            }
        })()
    }, [])

    return <>
        <Loading 
            isLoading={isLoaing}
            message="wait a moment..."
        />
        <Modal
            isVisible={toggleModal}
            setIsVisible={setToggleModal}
            width="w-[30rem]"
        >
            <ModalBody>
                <ParticipationsDetails 
                    data={detail ? detail : []}
                />
            </ModalBody>
        </Modal>
        <div
            className="fixed flex flex-col
            inset-0 pt-20 p-8 gap-2 container-img"
        >
            <div
                className="bg-gray-100 p-4 rounded-md grid gap-2"
            >
                My Quizzes
                <div
                    className="flex flex-wrap gap-3
                    justify-center max-h-[98%] py-2
                    overflow-auto"
                >
                    {
                        quizzes?.length != 0 ? <>
                            {quizzes?.map((quiz, index) => (
                                <QuizWidget 
                                    key={index}
                                    quiz={quiz}
                                    action={show}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </>: <h2 className="text-center">You haven't created any quizzes yet.</h2>
                    }
                </div>
            </div>
        </div>
    </>
}

export default Dashboard
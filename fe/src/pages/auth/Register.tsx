import { useState } from "react"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import AuthService from "../../services/AuthService"
import Alert from "../../components/Alert"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/Loading"
import { ROUTES } from "../../routes/routes"

const Register = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [created, setCreated] = useState<string>('')
    const navigate = useNavigate()
    
    const validateForm = () => {
        if (username.length < 4){
            setError('Username should have at least 4 caracters')
            return false
        }
        else if (password.length < 8){
            setError('Password should have at least 8 caracters')
            return false
        }
        else if(password != passwordConfirm){
            setError('Passwords do not match.')
            return false
        }
        return true
    }

    const register = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(validateForm()){
            setIsLoading(true)
            const data = {
                username: username,
                password: password
            }
            try{
                const response = await AuthService.register(data)
                if (response == 201){
                    setCreated('Account created scuccess fully, you will be redirected in 5s')
                    setTimeout(() => {
                        navigate(ROUTES.JOIN_QUIZ)
                    }, 5000)
                }
            }catch(error: any){
                if(!error.response){
                    setError("Server is down now, try again later")
                }else if(error.response.status == 401){
                    setError("Authentication failed")
                }
            }finally{
                setIsLoading(false)
            }
        }
    }

    return <>
        {
            error ? (
                <Alert 
                    setIsVisible={setError}
                    priority="danger"
                    content={error}
                />
            ): null
        }
        {
            created ? (
                <Alert 
                    setIsVisible={setCreated}
                    priority="success"
                    content={created}
                />
            ): null
        }
        <Loading 
            isLoading={isLoading}
            message="Creating your account..."
        />
        <form
            className="fixed flex justify-center items-center
            inset-0 container-img"
            onSubmit={register}
        >
            <div className="bg-gray-200 rounded-md p-6
            flex flex-col gap-3 items-center justify-center
            min-w-96 min-h-56">
                <h5>Create an account</h5>
                <Input 
                    placeholder="Username"
                    setValue={setUsername}
                    value={username}
                    type="text"
                />
                <Input 
                    placeholder="Password"
                    setValue={setPassword}
                    value={password}
                    type="password"
                />
                <Input 
                    placeholder="Confirm password"
                    setValue={setPasswordConfirm}
                    value={passwordConfirm}
                    type="password"
                />
                <Button
                    text={"Register"}
                    priority="dark"
                    action={() => {}}
                    type="submit"
                />
            </div>
        </form>
    </>
}

export default Register
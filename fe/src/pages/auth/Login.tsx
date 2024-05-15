import { useState } from "react"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import AuthService from "../../services/AuthService"
import Alert from "../../components/Alert"
import useAuth from "../../hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"
import Loading from "../../components/Loading"

const Login = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const { setAuth } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"
    

    const authenticate = async (event: React.ChangeEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault()
        const data = {
            username: username,
            password: password
        }
        try{
            const response = await AuthService.login(data)
            setAuth({token: response.data.access_token})
            navigate(from, {replace: true})
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
        <Loading 
            isLoading={isLoading}
            message="verifying credentials"
        />
        <form
            className="fixed flex justify-center items-center
            inset-0 container-img"
            onSubmit={authenticate}
        >
            <div className="bg-gray-200 rounded-md p-6
            flex flex-col gap-3 items-center justify-center
            min-w-96 min-h-56">
                <h5>Login to your account</h5>
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
                <Button
                    text={"Login"}
                    priority="dark"
                    action={() => {}}
                    type="submit"
                />
            </div>
        </form>
    </>
}

export default Login
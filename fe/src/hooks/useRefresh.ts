import { useContext } from "react"
import AuthService from "../services/AuthService"
import AuthContext from "../context/AuthContext"

const useRefreshToken = () => {
    const {setAuth} = useContext(AuthContext)
    const refresh = async () => {
        try{
            const token = await AuthService.refresh()
            setAuth({token: token})
            return token
        }catch(error){
            throw error
        }
    }
    return refresh
}

export default useRefreshToken
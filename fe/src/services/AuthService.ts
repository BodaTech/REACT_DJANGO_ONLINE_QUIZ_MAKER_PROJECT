import { AxiosInstance, AxiosResponse } from "axios";
import instance from "../api/axios";
import { privateInstance } from "../api/axios";


class AuthService{
    static async login(data: {username: string, password: string}): Promise<AxiosResponse<any>>{
        try{
            const response = await instance.post("auth/authenticate", data, {
                withCredentials: true
            })
            return response
        }catch(error){
            throw error
        }
    }

    static async register(data: {username: string, password: string}): Promise<any>{
        try{
            const response = await instance.post("auth/register", data)
            return response.status
        }catch(error){
            throw error
        }
    }

    static async logout(privateInstance: AxiosInstance): Promise<any>{
        try{
            await privateInstance.post("auth/logout", {}, {
                withCredentials: true
            })
            return
        }catch(error){
            throw error
        }
    }

    static async refresh(): Promise<AxiosResponse<string>>{
        try{
            const response = await instance.post('auth/token/refresh', {}, {
                withCredentials: true
            })
            return response.data.access_token
        }catch(error){
            throw error
        }
    }
}

export default AuthService
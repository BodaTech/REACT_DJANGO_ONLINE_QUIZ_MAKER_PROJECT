import useAuth from "./useAuth";
import { privateInstance } from "../api/axios";
import useRefreshToken from "./useRefresh";
import { useEffect } from "react";


// defining request and response interceptors

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        // request interceptors
        const requestIntercept = privateInstance.interceptors.request.use(
            // setting the request header
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.token}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        // response interceptors
        const responseIntercept = privateInstance.interceptors.response.use(
            // if response is good ? we return the response
            response => response,
            // else we handle the error (refresh token in our case)
            async (error) => {
                // getting the previous request
                const prevRequest = error?.config;
                
                if(error.response.status == 403 && !prevRequest.sent){ // !prevRequest.sent to sent it just once
                    prevRequest.sent = true;
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    // making the request again
                    return privateInstance(prevRequest)
                }
                
                Promise.reject(error)
            }
        )

        // cleanup function to remove the interceptors
        return () => {
            privateInstance.interceptors.request.eject(requestIntercept)
            privateInstance.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])


    return privateInstance
}

export default useAxiosPrivate
import axios ,{AxiosInstance} from "axios";

const BASE_URL = "http://localhost:8000/api/v1/"

const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
})

export const privateInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})

export default instance
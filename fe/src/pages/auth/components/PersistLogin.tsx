import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRefreshToken from "../../../hooks/useRefresh";
import { useContext, useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { ROUTES } from "../../../routes/routes";
import AuthContext from "../../../context/AuthContext";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { setAuth } = useContext(AuthContext)
    const refersh = useRefreshToken()
    const { auth } = useAuth()
    const location = useLocation()

    useEffect(() => {
        setTimeout(() => {
            const verifyRefreshToken = async () => {
                try {
                    await refersh();
                } catch (error) {
                    setAuth({token: null})
                    throw error;
                } finally {
                    setIsLoading(false);
                }
            };
            if (!auth?.token) {
                verifyRefreshToken();
            } else {
                setIsLoading(false);
            }
        }, 1500)
    
    }, [auth]);
    

    return <>
        {
            isLoading ? 
            <Loading 
                isLoading={isLoading}
                message="wait a moment..."
            /> : (auth?.token && (location.pathname.includes(ROUTES.LOGIN) 
                    || location.pathname.includes(ROUTES.REGISTER))) ? 
                <Navigate to={ROUTES.JOIN_QUIZ} replace /> 
                    :   <Outlet />
        }
    </>
}

export default PersistLogin
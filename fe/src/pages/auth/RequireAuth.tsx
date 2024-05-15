import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";


const RequireAuth = () => {

    const {auth} = useAuth()
    const location = useLocation()

    return (
        auth?.token
            ? <Outlet />
            : <Navigate to={ROUTES.LOGIN} state={{from: location}} replace />
    )
}

export default RequireAuth
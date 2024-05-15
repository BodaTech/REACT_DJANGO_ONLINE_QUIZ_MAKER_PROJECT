import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "../routes/routes";
import Loading from "../components/Loading";
import { useContext, useState } from "react";
import AuthService from "../services/AuthService";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentLocation = useLocation();
  const privateInstance = useAxiosPrivate();

  const logout = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await AuthService.logout(privateInstance);
        setAuth({ token: null });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <>
      <Loading isLoading={isLoading} message="Logout..." />
      <div
        className="fixed z-10 bg-white w-[98%] py-3 px-6 shadow-md
            flex justify-between items-center rounded-lg top-2 left-[50%] 
            translate-x-[-50%]"
      >
        <label className="font-bold text-lg text-gray-900">QuizEra</label>
        <div className="flex gap-4 place-items-center">
          {auth.token ? (
            <>
              <Link to={ROUTES.JOIN_QUIZ}>Join</Link>
              <Link to={ROUTES.CREATE_QUIZ}>Create</Link>
              <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
              <a onClick={logout} className="cursor-pointer">
                Logout
              </a>
            </>
          ) : (
            <>
              {currentLocation.pathname == ROUTES.LOGIN ? 
                <Link to={ROUTES.REGISTER}>Register</Link> : 
                <Link to={ROUTES.LOGIN}>Login</Link>} 
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

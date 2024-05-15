import Quiz from "./pages/quiz/Quiz";
import Create from "./pages/quiz/Create";
import { ROUTES } from "./routes/routes";
import { Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Navbar from "./layout/Navbar";
import Participate from "./pages/quiz/Participate";
import Login from "./pages/auth/Login";
import RequireAuth from "./pages/auth/RequireAuth";
import PersistLogin from "./pages/auth/components/PersistLogin";
import Dashboard from "./pages/profile/Dashboard";
import Register from "./pages/auth/Register";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <div className="font-mono">
        <Navbar />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path={ ROUTES.DASHBOARD } element={<Dashboard />} />
              <Route path={ROUTES.JOIN_QUIZ} Component={Participate} />
              <Route path={ROUTES.QUIZ} Component={Quiz} />
              <Route
                path={ROUTES.CREATE_QUIZ}
                element={
                  <QuizProvider>
                    <Create />
                  </QuizProvider>
                }
              />
              <Route
                path={ROUTES.QUIZ_PROGRESS}
                element={
                  <QuizProvider>
                    <Quiz />
                  </QuizProvider>
                }
              />
            </Route>
            <Route path={ROUTES.LOGIN} Component={Login} />
            <Route path={ROUTES.REGISTER} Component={Register} />
            <Route path={'/*'} element={<Navigate 
              to={ROUTES.JOIN_QUIZ}
            />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

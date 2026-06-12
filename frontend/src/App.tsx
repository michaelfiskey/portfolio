import NotificationToast from "./components/notification/NotificationToast"
import Navbar from "./components/Navbar"
import { NotificationProvider } from "./context/NotificationContext"
import { AuthProvider } from "./context/AuthContext"
import Home from "./pages/Home"
import SoftwareEngineering from "./pages/SoftwareEngineering"
import { Route, Routes} from "react-router"
import AIML from "./pages/AIML"
import useScrollToSection from './hooks/useScrollToSection'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DigitClassifier from "./pages/project-pages/DigitClassifier"
import { ROUTES } from "./constants/routes";
import LocalLift from "./pages/project-pages/LocalLift"
import Portfolio from "./pages/project-pages/Portfolio"

function App() {

    useScrollToSection()

    return (
            <NotificationProvider>
                <AuthProvider>
                <div className="bg-warm-975">
                    <NotificationToast/>
                    <Navbar/>
                    <Routes>
                        {/* NAVBAR ROUTES*/}
                        <Route path={ROUTES.HOME} element={<Home/>}/>
                        
                        <Route path={ROUTES.AUTH.ROOT}>
                            <Route path={ROUTES.AUTH.LOGIN} element={<Login/>}/>
                            <Route path={ROUTES.AUTH.SIGNUP} element={<Signup/>}/>
                        </Route>

                        {/* PROJECT CATEGORY ROUTES */}
                        <Route path={ROUTES.PROJECTS.CATEGORIES.ROOT}>
                            <Route path={ROUTES.PROJECTS.CATEGORIES.SWE} element={<SoftwareEngineering/>}/>
                            <Route path={ROUTES.PROJECTS.CATEGORIES.AI_ML} element={<AIML/>}/>
                        </Route>
                        
                        {/* PROJECT ROUTES */}
                        <Route path={ROUTES.PROJECTS.ROOT}>
                            <Route path={ROUTES.PROJECTS.DIGIT_CLASSIFIER} element={<DigitClassifier/>}/>
                            <Route path={ROUTES.PROJECTS.LOCAL_LIFT} element={<LocalLift/>}/>
                            <Route path={ROUTES.PROJECTS.PORTFOLIO} element={<Portfolio/>}/>
                        </Route>
                    </Routes>
                </div>
                </AuthProvider>
            </NotificationProvider>
    )
}

export default App

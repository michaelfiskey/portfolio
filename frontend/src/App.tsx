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

function App() {

    useScrollToSection()

    return (
        <AuthProvider>
            <NotificationProvider>
                <div className="bg-warm-975">
                    <NotificationToast/>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/swe" element={<SoftwareEngineering/>}/>
                        <Route path="/ai-ml" element={<AIML/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                    </Routes>
                </div>
            </NotificationProvider>
        </AuthProvider>
    )
}

export default App

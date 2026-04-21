import NotificationToast from "./components/notification/NotificationToast"
import Navbar from "./components/Navbar"
import { NotificationProvider } from "./context/NotificationContext"
import Home from "./pages/Home"
import SoftwareEngineering from "./pages/SoftwareEngineering"
import { Route, Routes} from "react-router"
import AIML from "./pages/AIML"
import useScrollToHash from './hooks/useScrollToHash'

function App() {
    
    useScrollToHash()

    return (
        <NotificationProvider>
            <div className="bg-warm-975">
                <NotificationToast/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/swe" element={<SoftwareEngineering/>}/>
                    <Route path="/ai-ml" element={<AIML/>}/>
                </Routes>
            </div>
        </NotificationProvider>
    )
}

export default App

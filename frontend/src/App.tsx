import NotificationToast from "./components/notification/NotificationToast"
import Navbar from "./components/Navbar"
import { NotificationProvider } from "./context/NotificationContext"
import Home from "./pages/Home"
import SoftwareEngineering from "./pages/SoftwareEngineering"
import { Route, Routes } from "react-router"

function App() {
    return (
        <NotificationProvider>
            <div className="bg-warm-975">
                <NotificationToast/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/swe" element={<SoftwareEngineering/>}/>
                </Routes>
            </div>
        </NotificationProvider>
    )
}

export default App

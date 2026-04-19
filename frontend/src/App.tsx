import NotificationToast from "./components/notification/NotificationToast"
import Navbar from "./components/Navbar"
import { NotificationProvider } from "./context/NotificationContext"
import Home from "./pages/Home"
function App() {
    return (
        <NotificationProvider>
            <div className="bg-warm-975">
                <NotificationToast/>
                <Navbar/>
                <Home/>
            </div>
        </NotificationProvider>
    )
}

export default App

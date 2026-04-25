import { Navigate } from "react-router"
import { useAuthContext } from "../../context/AuthContext"

const RequireAdmin = ({ children } : {children : React.ReactNode}) => {
    const { isAdmin } = useAuthContext();
    return isAdmin? <> { children } </> : <Navigate to="/" replace></Navigate>;
}
export default RequireAdmin;
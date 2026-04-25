import { useAuthContext } from "../../context/AuthContext";

const AdminOnly = ({ children }: { children: React.ReactNode}) => {
    const { isAdmin } = useAuthContext()
    return isAdmin ? <> { children } </> : null;
}
export default AdminOnly;
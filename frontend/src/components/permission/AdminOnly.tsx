import { useAuthContext } from "../../hooks/useAuthContext";

const AdminOnly = ({ children }: { children: React.ReactNode}) => {
    const { isAdmin } = useAuthContext()
    return isAdmin ? <> { children } </> : null;
}
export default AdminOnly;
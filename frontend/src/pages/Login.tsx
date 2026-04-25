import { useEffect } from "react";
import PageContainer from "../components/container/PageContainer";
import LoginForm from "../components/form/variants/LoginForm";
import PageSection from "../components/page-section/PageSection";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { useNotificationContext } from "../context/NotificationContext";

const Login = () => {
    const { pushNotification } = useNotificationContext();
    
    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEYS.HAS_VISITED_LOGIN)) {
            pushNotification("note", "You do not need to login to view projects.")
            localStorage.setItem(STORAGE_KEYS.HAS_VISITED_LOGIN, "true")
        }
    }, [])
    
    return (
        <PageContainer>
            <PageSection id='login-form' className="flex justify-center">
                <LoginForm/>
            </PageSection>
        </PageContainer>
    )
}
export default Login;
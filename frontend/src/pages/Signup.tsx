import { useEffect } from "react";
import PageContainer from "../components/container/PageContainer";
import SignupForm from "../components/form/variants/SignupForm";
import PageSection from "../components/page-section/PageSection";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { NOTIFICATION_MESSAGES } from "../constants/notificationMessages";
import { useNotificationContext } from "../context/NotificationContext";
const Signup = () => {
    const { pushNotification } = useNotificationContext()

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEYS.HAS_VISITED_SIGNUP)) {
            pushNotification("note", NOTIFICATION_MESSAGES.VIEW_PROJECTS)
            localStorage.setItem(STORAGE_KEYS.HAS_VISITED_SIGNUP, "true")
        }
    }, [])
    
    return (
        <PageContainer>
            <PageSection id='signup-form' className="flex justify-center">
                <SignupForm/>
            </PageSection>
        </PageContainer>
    )
}
export default Signup;
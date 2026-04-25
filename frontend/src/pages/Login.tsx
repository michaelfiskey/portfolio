import PageContainer from "../components/container/PageContainer";
import LoginForm from "../components/form/variants/LoginForm";
import PageSection from "../components/page-section/PageSection";

const Login = () => {
    return (
        <PageContainer>
            <PageSection id='login-form' className="flex justify-center">
                <LoginForm/>
            </PageSection>
        </PageContainer>
    )
}
export default Login;
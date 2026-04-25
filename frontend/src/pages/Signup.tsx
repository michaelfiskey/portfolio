import PageContainer from "../components/container/PageContainer";
import SignupForm from "../components/form/variants/SignupForm";
import PageSection from "../components/page-section/PageSection";

const Signup = () => {
    return (
        <PageContainer>
            <PageSection id='signup-form' className="flex justify-center">
                <SignupForm/>
            </PageSection>
        </PageContainer>
    )
}
export default Signup;
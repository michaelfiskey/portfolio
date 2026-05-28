import PageContainer from "../../components/container/PageContainer";
import PageSection from "../../components/page-section/PageSection";

const DigitIdentifier = () => {
    return (
        <PageContainer>
            <PageSection id='digit-identifier-about'>
                <h1>Digit Identifier</h1>
                <h2>Neural Network Built From Scratch.</h2>
                <div style={{ overflowX: "auto" }}>
                    <iframe
                        src="/projects/digit-identifier/nn.html"
                        title="Digit Identifier Notebook"
                        style={{ width: "100%", minWidth: "400px", height: "60vh", border: "none" }}
                    />
                </div>
            </PageSection>
        </PageContainer>
    )
}
export default DigitIdentifier;
import LinkButton from "../components/button/variants/LinkButton";
import ButtonContainer from "../components/container/ButtonContainer";
import PageSection from "../components/page-section/PageSection";
import PageContainer from "../components/container/PageContainer";
import TagContainer from "../components/container/TagContainer";
import Tag from "../components/tag/Tag";
import GridCardContainer from "../components/container/GridCardContainer";
import SubCard from "../components/card/variants/SubCard";
const Home = () => {
    const aboutTags = ["C#", ".NET", "PostgreSQL", "AWS",
                        "TypeScript", "React", "Node.js", "HTML",
                        "TailwindCSS", "Python", "Flask", "Sklearn",
                        "Pytorch", "Scapy", "Docker"]

    return (
        <PageContainer>
            <PageSection id="about">
                <h1>Fullstack Engineer</h1>
                <h2>Building front to back <br/>solutions.</h2>
                <ButtonContainer className="mt-4">
                    <LinkButton href="/#projects" className="bg-[#7a5c3e] text-[#f5f0e8] hover:bg-[#5e4430]">View Projects</LinkButton>
                    <LinkButton href="/#contact">Get In Touch</LinkButton>
                    <LinkButton href="https://docs.google.com/document/d/1YkH3DPY-C7cLWiCbPGgnZUkPgUM4-wF6hh0B6oxeImo/edit?usp=sharing" openInNewTab={true} >Download Resume</LinkButton>
                </ButtonContainer>
                <h1>About Me</h1>
                <h2>Michael Fiskey (M.S.)</h2>
                <p>
                    I am a graduate student at the University of Wisconsin-Milwaukee, 
                    pursuing a Master's degree in Computer Science with a focus on the emerging 
                    intersections of artificial intelligence, machine learning, and cybersecurity.
                </p>
                <p>
                    Outside of academics and coding, I am a musician with a passion for singing, 
                    as well as an avid volleyball player. 
                </p>
                <GridCardContainer>
                    <SubCard title="Based In" paragraphs={["Milwaukee, WI"]}/>
                    <SubCard title="Email" paragraphs={["fiskey.michael@gmail.com"]}/>
                    <SubCard title="Phone Number" paragraphs={["(608) 577-3266"]}/>
                </GridCardContainer>
                <TagContainer className="mt-4">
                    {aboutTags.map(tag => <Tag>{ tag }</Tag>)}
                </TagContainer>
            </PageSection>
        </PageContainer>
    )
}
export default Home;
import LinkButton from "../components/button/variants/LinkButton";
import ButtonContainer from "../components/container/ButtonContainer";
import PageContainer from "../components/container/PageContainer";
import TagContainer from "../components/container/TagContainer";
import Tag from "../components/tag/Tag";
import GridCardContainer from "../components/container/GridCardContainer";
import SubCard from "../components/card/variants/SubCard";
import profilePhoto from "../assets/profile.jpeg";
import VerticalCardContainer from "../components/container/VerticalCardContainer";
import ExperienceCard from "../components/card/variants/ExperienceCard";
import GridPageSection from "../components/page-section/variants/GridPageSection";
import PageSection from "../components/page-section/PageSection";
const Home = () => {
    
    const aboutTags = ["C#", ".NET", "PostgreSQL", "AWS",
                        "TypeScript", "React", "Node.js", "HTML",
                        "TailwindCSS", "Python", "Flask", "Sklearn",
                        "Pytorch", "Scapy", "Docker"]

    return (
        <PageContainer>
            <GridPageSection id="about">
                <div>
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
                </div>
                    <div className="relative min-h-120 lg:min-h-full">
                    <div className="absolute inset-x-0 top-0 h-40 " />
                    <figure className="absolute inset-0 p-5 md:p-7 lg:p-9">
                        <div className="h-full w-full overflow-hidden rounded-[1.8rem]">
                            <img
                                src={profilePhoto}
                                alt="Portrait of Michael Fiskey"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </figure>
                </div>
            </GridPageSection>
            <PageSection id="education" backgroundColor="#f1e9dc">
                <div className="mb-10">
                    <h1>Education</h1>
                    <h2>Academic Background</h2>
                </div>
                <VerticalCardContainer>
                    <ExperienceCard title="University of Wisconsin-Milwaukee" 
                                    startDateLabel="January 2026" 
                                    endDateLabel="December 2027" 
                                    subTitles={["Master of Science (M.S.), Computer Science", <i>Artifical Intelligence & Cybersecurity Emphasis</i>]}
                                    paragraphs={["GPA: 4.0"]}
                                    tagTitle="Relevant Coursework"
                                    tags={["Operating Systems", "Machine Learning", "Network & Web Security"]}
                                    
                    />
                    <ExperienceCard title="University of Wisconsin-Madison" 
                                    startDateLabel="September 2021" 
                                    endDateLabel="May 2024" 
                                    subTitles={["Bachelor of Arts (B.A.), Computer Science",]}
                                    tagTitle="Relevant Coursework"
                                    tags={[
                                        "Programming I, II, & III",
                                        "Introduction to Algorithms",
                                        "Introduction to Artificial Intelligence",
                                        "Database Management Systems",
                                        "Machine Organization & Architecture",
                                        "Introduction to Computer Engineering",
                                        "Mobile Systems & Applications",
                                        "Human Computer Interaction",
                                        "User Interfaces",
                                        "Linear Algebra",
                                    ]}
                                    
                    />
                    <ExperienceCard title="Madison College" 
                                    startDateLabel="September 2019" 
                                    endDateLabel="May 2021" 
                                    paragraphs={["Earned 60 college credits through the STEM Academy dual-enrollment program while completing high school."]}
                                    tagTitle="Relevant Coursework"
                                    tags={["Calculus I, II, & III", "Physics"]}
                                    
                    />
                     <ExperienceCard title="Sun Prairie High School" 
                                    startDateLabel="September 2017" 
                                    endDateLabel="May 2021"        
                    />
                </VerticalCardContainer>
            </PageSection>
        </PageContainer>
    )
}
export default Home;
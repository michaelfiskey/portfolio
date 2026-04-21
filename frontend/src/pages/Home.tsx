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
import { useIsMobile } from '../hooks/useIsMobile';
import YoutubeVideoCarousel from "../components/YoutubeVideoCarousel";
import ProjectCategoryCard from "../components/card/variants/ProjectCategoryCard";
import ContactForm from "../components/form/variants/ContactForm";

const Home = () => {
    const isMobile = useIsMobile(1024)
    
    const hero = {
        title: "Fullstack Engineer",
        subtitle: <>Building front to back <br />solutions.</>,
    }

    const about = {
        sectionTitle: "About Me",
        name: "Michael Fiskey (M.S.)",
        paragraphs: [
            "I am a graduate student at the University of Wisconsin-Milwaukee, pursuing a Master's degree in Computer Science with a focus on the emerging intersection of artificial intelligence and cybersecurity.",
            "Outside of academics and coding, I am a musician with a passion for singing, as well as an avid volleyball player.",
        ],
        cards: [
            { title: "Based In", paragraphs: ["Milwaukee, WI"] },
            { title: "Email", paragraphs: ["fiskey.michael@gmail.com"] },
            { title: "Phone", paragraphs: ["6085773266"] },
        ],
        tags: [
            "C#", ".NET", "PostgreSQL", "AWS",
            "TypeScript", "React", "Node.js", "HTML",
            "TailwindCSS", "Python", "Flask", "Sklearn",
            "Pytorch", "Scapy", "Docker",
        ]
    }

    const education = {
        sectionTitle: "Education",
        sectionSubtitle: "Academic Background",
        experienceCards: [
            {
                title: "University of Wisconsin-Milwaukee" ,
                startDateLabel: "January 2026", 
                endDateLabel: "December 2027", 
                subtitles:["Master of Science (M.S.), Computer Science", 
                            <i>Artificial Intelligence & Cybersecurity Emphasis</i>],
                paragraphs:["GPA: 4.0"],
                tagTitle: "Relevant Coursework",
                tags:["Operating Systems", "Machine Learning", "Network & Web Security"]
            },
            {
                title: "University of Wisconsin-Madison",
                startDateLabel: "September 2021",
                endDateLabel: "May 2024", 
                subtitles:["Bachelor of Arts (B.A.), Computer Science",],
                tagTitle: "Relevant Coursework",
                tags: [
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
                ]
            },
            {
                title: "Madison College" ,
                startDateLabel: "September 2019" ,
                endDateLabel: "May 2021" ,
                paragraphs: ["Earned 60 college credits through the STEM Academy dual-enrollment program while completing high school."],
                tagTitle: "Relevant Coursework",
                tags: ["Calculus I, II, & III", "Physics"]
            },
            {
                title: "Sun Prairie High School",
                startDateLabel: "September 2017",
                endDateLabel: "May 2021"
            }
        ],
    }
    const extraCurriculars = {
        subtitle: "Extra Curriculars",
        experienceCards: [
            {
                title: "Fundamentally Sound A Cappella",
                startDateLabel: "September 2021",
                endDateLabel: "May 2025",
                children:
                    <>
                        <YoutubeVideoCarousel title="Featured Performances" videoUrls={["iCp4ryRWzTw", "sCU89QiFB-I", "urRxNOyNroU"]} className="rounded-2xl border border-warm-350 bg-warm-50 p-5 mb-5"/>
                            <div className="rounded-2xl border border-warm-350 bg-warm-50 p-5">
                                <h3 className="text-sm uppercase tracking-[0.2em] text-warm-700 mb-3">Leadership Highlights</h3>
                                <VerticalCardContainer>
                                    <ExperienceCard title="Social Media Manager" 
                                                    startDateLabel="September 2022" 
                                                    endDateLabel="May 2023"
                                                    paragraphs={[
                                                        <>Grew TikTok following to over <b>600,000</b>, Instagram to over <b>30,000</b>, and amassed <b>hundreds of millions of views</b> across platforms.</>,
                                                        <>Created opportunities for the group to collaborate with notable artists and brands such as <b>The Kid Laroi</b>, HoYoverse (the creators of <b>Genshin Impact</b>), Men's Wearhouse, and Amp&Go Talent & Influencer management.</>
                                                    ]}
                                                    listBool={[true, false]}
                                                    tagTitle="Skills"
                                                    tags={["Project Management", "Contract Negotiation", "Marketing", "Communication"]}
                                    >
                                        <div className="flex justify-end items-end gap-3 text-warm-450 ml-auto">
                                            <a
                                                href="https://www.instagram.com/fsacappella/"
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label="Instagram"
                                                className="hover:text-warm-600 transition-colors"
                                            >
                                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                            </a>
                                            <a
                                                href="https://www.tiktok.com/@fsacappella"
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label="TikTok"
                                                className="hover:text-warm-600 transition-colors"
                                            >
                                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                                </svg>
                                            </a>
                                        </div>
                                        
                                    </ExperienceCard>
                                    <ExperienceCard title="Vice President"
                                                    startDateLabel="September 2023"
                                                    endDateLabel="May 2024"
                                                    paragraphs={["Handled public relations tasks such as gig booking, group outreach, and event planning.",
                                                                "Partnered with leadership to shape group goals and event strategy.",
                                                                "In charge of planning 2 week winter tour."]}
                                                    listBool={[true, false]}
                                                    tagTitle="Skills"
                                                    tags={["Leadership", "Management", "Event Planning"]}
                                    />
                                </VerticalCardContainer>
                        </div>
                    </>
            },
        ]   
    }

    const professionalExperience = {
        sectionTitle: "Relevant Professional Experience",
        sectionSubtitle: "Where I've Worked",
        waveReaction: {
            title: "Wave Reaction",
            startDateLabel: "January 2026",
            endDateLabel: "Present",
            roleDetails: [
                <><i>Software Engineer Intern</i> | May 2026 - August 2026</>,
                <><i>Quality Assurance Engineer</i> | May 2026 - August 2026</>
            ],
            tagTitle: "Skills",
            tags: ["Playwright Testing", "Manual QA Testing"]
        },
        slCompanies: {
            title: "S&L Companies",
            subtitles: ["Data Analyst"],
            startDateLabel: "January 2025",
            endDateLabel: "December 2025",
            paragraphs: [
                "Created interactive dashboards with choropleth and scatter plot maps using real-time U.S. Census and Google Maps APIs data (Python, Pandas, GeoPandas, Dash).",
                "Optimized coupon delivery routes for more than 115 restaurants (Python, Pandas, GeoPandas, QGIS).",
                "Performed sales forecasting with seasonal and location-specific trends (Prophet).",
                "Built a pipeline to process over 5,000 weekly customer and employee reviews, linking insights to a 7,000-person workforce database (Python).",
                "Leveraged enterprise-level databases to build tailored reporting solutions for operational decision-making (SQL, Sigma Computing)."
            ],
            tagTitle: "Skills",
            tags: ["Python", "Excel", "Pandas", "GeoPandas", "QGIS", "SQL", "Sigma Computing", "Machine Learning", "Market Analysis"],
            listBool: [true, false] as [boolean, boolean]
        }
    }

    const projectCategories = {
        sectionTitle: "Personal Projects",
        sectionSubtitle: "Project Categories",
        cards: [
            {
                title: "Software Engineering Projects",
                paragraphs: ["Projects span full-stack development and algorithmic problem solving."],
                href: "swe",
                tags: [ "C#", ".NET", "PostgreSQL", "AWS",
                        "TypeScript", "React", "Node.js", "HTML",
                        "TailwindCSS", "Python", "Flask" ]
            },
            {
                title: "Artificial Intelligence & Machine Learning Projects",
                paragraphs: ["Neural networks, optimizers, and algorithms, built with and without high-level libraries, and applied work using industry tools."],
                href: "ai-ml",
                tags: [ "Python", "Pytorch", "Sklearn" ]
            },
            {
                title: "Cybersecurity Projects",
                paragraphs: ["Hands-on security work built around real attack and defense scenarios using Docker-based environments."],
                href: "/cs",
                tags: [ "Python", "Docker", "Scapy" ]
            }
        ]
    }

    
    const profilePhotoSection = 
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

    return (
        <PageContainer>
            <GridPageSection id="about">
                <div>
                    <h1>{hero.title}</h1>
                    <h2>{hero.subtitle}</h2>
                    <ButtonContainer className="mt-4">
                        <LinkButton href="/#projects" className="bg-warm-800 text-warm-100 hover:bg-warm-875">View Projects</LinkButton>
                        <LinkButton href="/#contact">Get In Touch</LinkButton>
                        <LinkButton href="https://docs.google.com/document/d/1YkH3DPY-C7cLWiCbPGgnZUkPgUM4-wF6hh0B6oxeImo/edit?usp=sharing" openInNewTab={true} >Download Resume</LinkButton>
                    </ButtonContainer>
                    <h1>{about.sectionTitle}</h1>
                    {isMobile && profilePhotoSection}
                    <h2>{about.name}</h2>
                    {about.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                    <GridCardContainer>
                        {about.cards.map((card) => (
                            <SubCard key={card.title} title={card.title} paragraphs={card.paragraphs} />
                        ))}
                    </GridCardContainer>
                    <TagContainer className="mt-4">
                        {about.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                    </TagContainer>
                </div>
                {!isMobile && profilePhotoSection}
            </GridPageSection>
            <PageSection id="education" className="bg-warm-150!">
                <div className="mb-10">
                    <h1>{ education.sectionTitle }</h1>
                    <h2>{ education.sectionSubtitle }</h2>
                </div>
                <VerticalCardContainer>
                    {education.experienceCards.map(card => 
                        <ExperienceCard title={card.title}
                                        subtitles={card.subtitles}
                                        startDateLabel={card.startDateLabel}
                                        endDateLabel={card.endDateLabel}
                                        paragraphs={card.paragraphs}
                                        tagTitle={card.tagTitle}
                                        tags={card.tags}
                        />) 
                    }
                </VerticalCardContainer>
                <h2 className="mt-10 mb-10!">{extraCurriculars.subtitle}</h2>
                <VerticalCardContainer>
                    {extraCurriculars.experienceCards.map(card => 
                        <ExperienceCard title={card.title}
                                        startDateLabel={card.startDateLabel}
                                        endDateLabel={card.endDateLabel}>
                                        
                                        { card.children }
                        </ExperienceCard>) 
                    }
                </VerticalCardContainer>
            </PageSection>
            <PageSection id="experience" className="bg-warm-200">
                <div className="mb-10">
                    <h1>{professionalExperience.sectionTitle}</h1>
                    <h2>{professionalExperience.sectionSubtitle}</h2>
                </div>
                <VerticalCardContainer>
                    <ExperienceCard title={professionalExperience.waveReaction.title}
                                startDateLabel={professionalExperience.waveReaction.startDateLabel}
                                endDateLabel={professionalExperience.waveReaction.endDateLabel}
                                tagTitle={professionalExperience.waveReaction.tagTitle}
                                tags={professionalExperience.waveReaction.tags}
                    >
                        {professionalExperience.waveReaction.roleDetails.map((role, index) => (
                            <p key={`wave-reaction-role-${index}`}>{role}</p>
                        ))}
                    </ExperienceCard>
                    <ExperienceCard title={professionalExperience.slCompanies.title}
                                    subtitles={professionalExperience.slCompanies.subtitles}
                                    startDateLabel={professionalExperience.slCompanies.startDateLabel}
                                    endDateLabel={professionalExperience.slCompanies.endDateLabel}
                                    paragraphs={professionalExperience.slCompanies.paragraphs}
                                    tagTitle={professionalExperience.slCompanies.tagTitle}
                                    tags={professionalExperience.slCompanies.tags}
                                    listBool={professionalExperience.slCompanies.listBool}
                    />
                </VerticalCardContainer>
            </PageSection>
            <PageSection id="projects">
                <h1>{projectCategories.sectionTitle}</h1>
                <h2 className="pb-10">{projectCategories.sectionSubtitle}</h2>
                <GridCardContainer>
                    {projectCategories.cards.map((card) => (
                        <ProjectCategoryCard key={card.title}
                                    title={card.title}
                                    paragraphs={card.paragraphs}
                                    tags={card.tags}
                                    href={card.href}
                        />
                    ))}
                </GridCardContainer>
            </PageSection>
            <PageSection id='contact' className="bg-warm-975">
                <h1 className="text-warm-500!">Get In Touch</h1>
                <h2 className="text-warm-200!">Lets build something.</h2>
                <p className="text-warm-500! mb-10!">
                    I'm open to new opportunities, collaborations, and interesting projects.<br/>
                    Feel free to reach out by filling out the form below!
                </p>
                <ContactForm/>
            </PageSection>
        </PageContainer>

    )
}
export default Home;
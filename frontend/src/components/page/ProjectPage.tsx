import PageContainer from "../container/PageContainer";
import GridCardContainer from "../container/GridCardContainer";
import axios from "axios";
import { useNotificationContext } from "../../context/NotificationContext";
import { useEffect, useState } from "react";
import ProjectCard from "../card/variants/ProjectCard";
import PageSection from "../page-section/PageSection";

interface Project {
    id: number;
    title: string;
    description: string;
    href: string;
    date: string;
    authors?: string[];
    tags?: string[];
    category: string;
}

interface ProjectPageProps {
    pageTitle: string,
    type: "swe" | "ai-ml" | "cs"
    pageSubtitle?: string,
    pageParagraphs?: string[]
    children?: React.ReactNode
}

const ProjectPage = ({ pageTitle, pageSubtitle, pageParagraphs, type, children}: ProjectPageProps) => {
    const { pushNotification } = useNotificationContext();
    const [projects, setProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        const fetchProjects = async () => {
            const response = await getProjects();

            if (response) {
                setProjects(response.data);
            }
        };

        void fetchProjects();
    }, [type]);

    const getProjects = async () => {
        try{
            const projects = await axios.get<Project[]>(import.meta.env.VITE_API_URL + "/project", {
                params: {
                    type: type
                }
            });
            
            return projects
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message ?? error.message ?? "There was an error retrieving projects."
				pushNotification("error", message)
			}
			else {
				pushNotification("error", "An unexpected error occured.")
			}
        }
    }
    return (
        <PageContainer>
            <PageSection id="projects">
                <h1>{pageTitle}</h1>
                {pageSubtitle && <h2>{pageSubtitle}</h2>}
                {pageParagraphs && pageParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
                <GridCardContainer>
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            href={project.href}
                            date={project.date}
                            authors={project.authors}
                            tags={project.tags}
                        />
                    ))}
                </GridCardContainer>
            </PageSection>

            { children }
        </PageContainer>
    )
}
export default ProjectPage;
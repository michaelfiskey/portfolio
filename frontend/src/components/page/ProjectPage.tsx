import PageContainer from "../container/PageContainer";
import GridCardContainer from "../container/GridCardContainer";
import { useNotificationContext } from "../../context/NotificationContext";
import { useEffect, useState } from "react";
import ProjectCard from "../card/variants/ProjectCard";
import PageSection from "../page-section/PageSection";
import { getProjects } from "../../services/projectservice";
import type { Project, ProjectType } from "../../types/project";

interface ProjectPageProps {
    pageTitle: string,
    type: ProjectType,
    pageSubtitle?: string,
    pageParagraphs?: string[]
    children?: React.ReactNode
}

const ProjectPage = ({ pageTitle, pageSubtitle, pageParagraphs, type, children }: ProjectPageProps) => {
    const { pushNotification } = useNotificationContext();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects({ type })
            .then(setProjects)
            .catch((error: unknown) => {
                const message = error instanceof Error ? error.message : "An unexpected error occurred.";
                pushNotification("error", message);
            });
    }, [type]);

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

            {children}
        </PageContainer>
    )
}

export default ProjectPage;

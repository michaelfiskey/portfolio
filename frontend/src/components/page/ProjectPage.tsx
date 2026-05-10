import PageContainer from "../container/PageContainer";
import GridCardContainer from "../container/GridCardContainer";
import ProjectCard from "../card/variants/ProjectCard";
import PageSection from "../page-section/PageSection";
import { getProjects } from "../../services/projectservice";
import { useFetch } from "../../hooks/useFetch";
import type { Project, ProjectType } from "../../types/project";
import CardsContentSpinner from "../spinner/CardsContentSpinner";

interface ProjectPageProps {
    pageTitle: string,
    type: ProjectType,
    pageSubtitle?: string,
    pageParagraphs?: string[]
    children?: React.ReactNode
}

const ProjectPage = ({ pageTitle, pageSubtitle, pageParagraphs, type, children }: ProjectPageProps) => {
    
    const { data: projects, isLoading, error, isEmpty} = useFetch<Project[]>(
        () => getProjects({ type })
    );

    return (
        <PageContainer>
            <PageSection id="projects">
                <h1>{pageTitle}</h1>
                {pageSubtitle && <h2>{pageSubtitle}</h2>}
                {pageParagraphs && pageParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
                {isLoading && <CardsContentSpinner/>}
                {isEmpty && (<div className="flex items-center justify-center min-h-[60vh]">
                    <p>No data to display...</p>
                </div>)}
                {error && (<div className="flex items-center justify-center min-h-[60vh]">
                    <p>{error}</p>
                </div>)}
                <GridCardContainer>
                    {projects?.map((project) => (
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

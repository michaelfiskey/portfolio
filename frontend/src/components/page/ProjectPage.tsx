import type { ComponentProps, ReactElement } from "react";
import PageContainer from "../container/PageContainer";
import ProjectCard from "../card/variants/ProjectCard";
import GridCardContainer from "../container/GridCardContainer";

interface ProjectPageProps {
    pageTitle: string,
    pageSubtitle: string,
    pageParagraphs: string[]
    projectCards: ReactElement<ComponentProps<typeof ProjectCard>, typeof ProjectCard>[]
}
const ProjectPage = ({ pageTitle, pageSubtitle, pageParagraphs, projectCards }: ProjectPageProps) => {
    return (
        <PageContainer>
            <h1>{pageTitle}</h1>
            <h2>{pageSubtitle}</h2>
            {pageParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <GridCardContainer>
                {projectCards}
            </GridCardContainer>
        </PageContainer>
    )
}
export default ProjectPage;
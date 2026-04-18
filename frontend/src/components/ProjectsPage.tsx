import GridCardContainer from "./container/GridCardContainer"
import PageContainer from "./container/PageContainer"
import PageSection from "./page-section/PageSection"

interface ProjectsPageProps {
    title: string,
    subtitle: string,
    paragraphs: React.ReactNode[]
    cards: React.ReactNode[]

}

const ProjectsPage = ({ title, subtitle, paragraphs, cards }: ProjectsPageProps) => {
    return (
        <PageContainer>
            <PageSection id="projects">
                <h1>{ title }</h1>
                <h2>{ subtitle }</h2>
                {paragraphs.map(paragraph => <p> { paragraph } </p>)}
                <GridCardContainer>
                    {cards.map(card => card)}
                </GridCardContainer>
            </PageSection>
        </PageContainer>
    )
}
export default ProjectsPage;
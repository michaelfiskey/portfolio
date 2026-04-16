import GridCardContainer from "./container/GridCardContainer"
import PageContainer from "./container/PageContainer"
import PageSection from "./page-section/PageSection"

interface ProjectsPageProps {
    title: string,
    subTitle: string,
    paragraphs: React.ReactNode[]
    cards: React.ReactNode[]

}

const ProjectsPage = ({ title, subTitle, paragraphs, cards }: ProjectsPageProps) => {
    return (
        <PageContainer>
            <PageSection id="projects">
                <h1>{ title }</h1>
                <h2>{ subTitle }</h2>
                {paragraphs.map(paragraph => <p> { paragraph } </p>)}
                <GridCardContainer>
                    {cards.map(card => card)}
                </GridCardContainer>
            </PageSection>
        </PageContainer>
    )
}
export default ProjectsPage;
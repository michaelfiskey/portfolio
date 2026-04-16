import CardBase from "../primitives/CardBase";
import CardParagraph from "../primitives/CardParagraph";
import CardTags from "../primitives/CardTags";
import CardTitle from "../primitives/CardTitle";
interface ProjectCardProps {
    title: string,
    paragraphs: React.ReactNode[]
    tags?: string[]
    href: string
}
const ProjectCard = ({ title, paragraphs, tags, href }: ProjectCardProps) => {
    return (
        <a href={href}>
            <CardBase size="medium" className="hover:shadow-md hover:cursor-pointer">
                <CardTitle title={title}/>
                {paragraphs.map((paragraph, index) => (
                    <CardParagraph key={index}>{paragraph}</CardParagraph>
                ))}
                {tags && <CardTags tags={tags}/>}
            </CardBase>
        </a>

    )
}
export default ProjectCard;
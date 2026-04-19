import CardBase from "../primitives/CardBase";
import CardParagraph from "../primitives/CardParagraph";
import CardSubtitle from "../primitives/CardSubtitle";
import CardTags from "../primitives/CardTags";
import CardTitleDateHeader from "../primitives/CardTitleDateHeader";
interface ProjectCategoryCardProps {
    title: string,
    description: string
    href: string
    date: string
    authors?: string[]
    tags?: string[]
}
const ProjectCategoryCard = ({ title, description, date, authors, tags, href }: ProjectCategoryCardProps) => {
    return (
        <a href={href}>
            <CardBase size="medium" className="hover:shadow-md hover:cursor-pointer hover:scale-103 transition-all">
                <CardTitleDateHeader title={title} startDateLabel={date}/>
                {authors && <CardSubtitle text={authors.map(author => author.trim()).join(",")}/>}
                <CardParagraph> { description } </CardParagraph>
                {tags && <CardTags tags={tags}/>}
            </CardBase>
        </a>

    )
}
export default ProjectCategoryCard;
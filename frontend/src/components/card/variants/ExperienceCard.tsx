import CardBase from "../primitives/CardBase";
import CardTitleDateHeader from "../primitives/CardTitleDateHeader";
import CardSubtitle from "../primitives/CardSubtitle";
import CardParagraph from "../primitives/CardParagraph";
import CardTags from "../primitives/CardTags";
import CardTagsHeader from "../primitives/CardTagsHeader";


interface ExperienceCardProps {
    title: string,
    startDateLabel: string
    endDateLabel?: string,
    subTitles?: React.ReactNode[],
    paragraphs?: React.ReactNode[],
    tagTitle?: string,
    tags?: string[]

}
const ExperienceCard = ({ title, startDateLabel, endDateLabel, subTitles, paragraphs, tagTitle, tags }:ExperienceCardProps) => {
    return (
        <CardBase size="medium">
            <CardTitleDateHeader title={title} startDateLabel={startDateLabel} endDateLabel={endDateLabel} />
            {subTitles && subTitles.length > 0 && subTitles.map((subTitle, index) => (
                <CardSubtitle key={`subtitle-${index}`} text={subTitle} />
            ))}
            {paragraphs && paragraphs.length > 0 && paragraphs.map((paragraph, index) => (
                <CardParagraph key={`paragraph-${index}`}>{paragraph}</CardParagraph>
            ))}
            {tagTitle && <CardTagsHeader text={tagTitle}/>}
            {tags && <CardTags tags={tags}/>}
        </CardBase>
    )
}
export default ExperienceCard;
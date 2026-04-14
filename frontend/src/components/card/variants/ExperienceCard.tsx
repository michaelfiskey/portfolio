import CardBase from "../primitives/CardBase";
import CardTitleDateHeader from "../primitives/CardTitleDateHeader";
import CardSubtitle from "../primitives/CardSubtitle";
import CardParagraph from "../primitives/CardParagraph";
import CardTags from "../primitives/CardTags";
import CardTagsHeader from "../primitives/CardTagsHeader";

type SubTitlePair = [subTitle: string, isItalitc: boolean]

interface ExperienceCardProps {
    title: string,
    startDateLabel: string
    endDateLabel?: string,
    subTitlePairs?: SubTitlePair[],
    paragraphs?: React.ReactNode[],
    tagTitle?: string,
    tags?: string[]

}
const ExperienceCard = ({ title, startDateLabel, endDateLabel, subTitlePairs, paragraphs, tagTitle, tags }:ExperienceCardProps) => {
    return (
        <CardBase>
            <CardTitleDateHeader title={title} startDateLabel={startDateLabel} endDateLabel={endDateLabel} />
            {subTitlePairs && subTitlePairs.length > 0 && subTitlePairs.map(([subTitle, isItalic]: SubTitlePair, index) => (
                <CardSubtitle key={`subtitle-${index}`} text={subTitle} isItalic={isItalic}/>
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
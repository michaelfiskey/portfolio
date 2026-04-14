import CardBase from "../primitives/CardBase";
import CardHeader from "../primitives/CardHeader";
import CardHeader2 from "../primitives/CardHeader2";
import CardParagraph from "../primitives/CardParagraph";
import CardTags from "../primitives/CardTags";
import CardTagsHeader from "../primitives/CardTagsHeader";

type SubTitlePair = [subTitle: string, isItalitc: boolean]

interface ExperienceCardProps {
    title: string,
    startDate: Date
    endDate?: Date,
    subTitlePairs?: SubTitlePair[],
    paragraphs?: React.ReactNode[],
    tagTitle?: string,
    tags?: string[]

}
const ExperienceCard = ({ title, startDate, endDate, subTitlePairs, paragraphs, tagTitle, tags }:ExperienceCardProps) => {
    return (
        <CardBase>
            {endDate ? <CardHeader title={title} startDate={startDate} endDate={endDate} /> : <CardHeader title={title} startDate={startDate}/>}
            {subTitlePairs && subTitlePairs.length > 0 && subTitlePairs.map(([subTitle, isItalic]: SubTitlePair) => <CardHeader2 text={subTitle} isItalic={isItalic}/>)}
            {paragraphs && paragraphs.length > 0 && paragraphs.map(paragraph => <CardParagraph>{paragraph}</CardParagraph>)}
            {tagTitle && <CardTagsHeader text={tagTitle}/>}
            {tags && <CardTags tags={tags}/>}
        </CardBase>
    )
}
export default ExperienceCard;
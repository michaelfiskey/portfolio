import CardBase from "../primitives/CardBase";
import CardTitleDateHeader from "../primitives/CardTitleDateHeader";
import Cardsubtitle from "../primitives/Cardsubtitle";
import CardParagraph from "../primitives/CardParagraph";
import CardTags from "../primitives/CardTags";
import CardTagsHeader from "../primitives/CardTagsHeader";

type IsList = [isList: boolean, isOrdered: boolean]

interface ExperienceCardProps {
    title: string,
    startDateLabel: string
    endDateLabel?: string,
    subtitles?: React.ReactNode[],
    paragraphs?: React.ReactNode[],
    tagTitle?: string,
    tags?: string[],
    children?: React.ReactNode
    listBool?: IsList

}
const ExperienceCard = ({ title, startDateLabel, endDateLabel, subtitles, paragraphs, tagTitle, tags, listBool, children }:ExperienceCardProps) => {
    const renderBody = () => {
        if (!paragraphs || paragraphs.length < 0) return null;
        
        if (listBool && listBool[0]) {
            if (listBool[1]) {
                return (
                    <ol> {paragraphs.map(paragraph => <li>{paragraph}</li>)} </ol>
                )
            }
            return <ul> {paragraphs.map(paragraph => <li>{paragraph}</li>)} </ul>;
        }
        return paragraphs && paragraphs.length > 0 && paragraphs.map((paragraph, index) => (
        <CardParagraph key={`paragraph-${index}`}>{paragraph}</CardParagraph>));
    };

    return (
        <CardBase size="medium">
            <CardTitleDateHeader title={title} startDateLabel={startDateLabel} endDateLabel={endDateLabel} />
            {subtitles && subtitles.length > 0 && subtitles.map((subtitle, index) => (
                <Cardsubtitle key={`subtitle-${index}`} text={subtitle} />
            ))}
            {renderBody()}
            {children}
            {tagTitle && <CardTagsHeader text={tagTitle}/>}
            {tags && <CardTags tags={tags}/>}
        </CardBase>
    )
}
export default ExperienceCard;
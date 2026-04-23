import CardBase from "../primitives/CardBase";
interface SubCardProps {
    title: string,
    paragraphs: string[]
}

const SubCard = ({ title, paragraphs }: SubCardProps) => {
    return (
        <CardBase size="small" className="border-warm-350! bg-warm-50!">
            <h4>{ title }</h4>
            {paragraphs.map(paragraph =><p> { paragraph } </p>)}
        </CardBase>
    )
}
export default SubCard;
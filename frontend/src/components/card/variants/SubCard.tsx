import CardBase from "../primitives/CardBase";
interface SubCardProps {
    title: string,
    paragraphs: string[]
}

const SubCard = ({ title, paragraphs }: SubCardProps) => {
    return (
        <CardBase size="small" className="border-[#d7c2a3]! bg-[#f6ead7]!">
            <h4>{ title }</h4>
            {paragraphs.map(paragraph =><p> { paragraph } </p>)}
        </CardBase>
    )
}
export default SubCard;
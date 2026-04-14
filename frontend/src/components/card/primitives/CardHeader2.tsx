interface CardHeader2Props {
    text: string
    isItalic?: boolean
}

function CardHeader2({ text, isItalic=false } : CardHeader2Props) {
    return <h4 className="text-[#5f4a3a]">{isItalic ? <i>{text}</i> : text}</h4>
}
export default CardHeader2;
interface CardSubtitleProps {
    text: string
    isItalic?: boolean
}

function CardSubtitle({ text, isItalic=false } : CardSubtitleProps) {
    return <h4 className="text-[#5f4a3a]">{isItalic ? <i>{text}</i> : text}</h4>
}
export default CardSubtitle;
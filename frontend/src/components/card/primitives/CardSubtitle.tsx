interface CardSubtitleProps {
    text: React.ReactNode
}

function CardSubtitle({ text } : CardSubtitleProps) {
    return <h3 className="text-[#5f4a3a]">{ text }</h3>
}
export default CardSubtitle;
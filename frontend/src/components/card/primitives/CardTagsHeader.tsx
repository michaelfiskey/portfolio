interface CardTagsHeaderProps {
    text: string
}

const CardTagsHeader = ({ text }: CardTagsHeaderProps) => {
    return <h3 className="mt-3 text-sm uppercase tracking-[0.2em] text-warm-700 mb-3">{text}</h3>
}
export default CardTagsHeader;
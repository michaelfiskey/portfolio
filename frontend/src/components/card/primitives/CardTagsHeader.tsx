interface CardTagsHeaderProps {
    text: string
}

const CardTagsHeader = ({ text }: CardTagsHeaderProps) => {
    return <h3 className="mt-3 text-sm uppercase tracking-[0.2em] text-[#8c6e4b] mb-3">{text}</h3>
}
export default CardTagsHeader;
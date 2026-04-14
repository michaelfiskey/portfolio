interface CardParagraphProps {
    children: React.ReactNode
}

const CardParagraph = ({ children }: CardParagraphProps) => {
    return <p className="mt-2 text-[#5f4a3a]">{children}</p>
}
export default CardParagraph;
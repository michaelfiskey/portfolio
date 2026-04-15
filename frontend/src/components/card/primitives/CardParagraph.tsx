interface CardParagraphProps {
    children: React.ReactNode
}

const CardParagraph = ({ children }: CardParagraphProps) => {
    return <p className="mt-2">{children}</p>
}
export default CardParagraph;
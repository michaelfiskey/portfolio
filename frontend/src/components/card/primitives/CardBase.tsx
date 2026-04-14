interface CardBaseProps {
    borderColor?: string,
    backgroundColor?: string,
    children: React.ReactNode
}

function CardBase({ backgroundColor, borderColor, children }: CardBaseProps) {
    return (
        <article 
            className="rounded-2xl p-6 md:p-7 border" 
            style={{ backgroundColor : backgroundColor ?? "#f8f3ea", borderColor: borderColor ?? "#d7c7af"}}
        >
            {children}
        </article>
    )

}
export default CardBase;
interface CardBaseProps {
    className?: string
    borderColor?: string,
    backgroundColor?: string,
    children: React.ReactNode
    size: "small" | "medium"
}

function CardBase({ backgroundColor, borderColor, size, children }: CardBaseProps) {
    var sizeString = ""
    switch (size) {
        case "small":
            sizeString = "py-2 px-3"
            break
        case "medium":
            sizeString = "p-6 md:p-7"
            break
    }
    return (
        <article 
            className={["rounded-2xl border", sizeString].join(" ")}
            style={{ backgroundColor : backgroundColor ?? "#f8f3ea", borderColor: borderColor ?? "#d7c7af"}}
        >
            {children}
        </article>
    )

}
export default CardBase;
interface CardBaseProps {
    className?: string
    children: React.ReactNode
    size: "small" | "medium"
}

function CardBase({ className, size, children }: CardBaseProps) {
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
            className={["rounded-2xl border border-warm-300 bg-warm-100 ", sizeString, className].join(" ")}>
            {children}
        </article>
    )

}
export default CardBase;
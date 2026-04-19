interface CardTitleProps {
    title: string
}

function CardTitle({ title }: CardTitleProps) {
    return <h2 className="text-2xl text-warm-925">{title}</h2>
}
export default CardTitle;
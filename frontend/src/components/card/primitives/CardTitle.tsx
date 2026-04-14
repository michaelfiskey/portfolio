interface CardTitleProps {
    title: string
}

function CardTitle({ title }: CardTitleProps) {
    return <h2 className="text-2xl text-[#4a382d]">{title}</h2>
}
export default CardTitle;
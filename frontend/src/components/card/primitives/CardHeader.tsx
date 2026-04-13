interface CardHeaderProps {
    title: string
}

function CardHeader({ title }: CardHeaderProps) {
    return <h3 className="text-2xl text-[#4a382d]">{title}</h3>
}
export default CardHeader;
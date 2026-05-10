
interface CardDateProps {
    date: string
}

const CardDate = ({ date }: CardDateProps) => {
    return <span className="text-sm text-warm-800">{ date }</span>
}
export default CardDate;
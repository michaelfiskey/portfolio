
interface CardDateRangeProps {
    startLabel: string
    endLabel?: string
}

const getDateRange = (startLabel: string, endLabel?: string) => {
    const start = startLabel
    const end = endLabel ?? "Present"
    return `${start} - ${end}`
}

const CardDateRange = ({ startLabel, endLabel }: CardDateRangeProps) => {
    return <span className="text-sm text-[#7a624e]">{getDateRange(startLabel, endLabel)}</span>
}
export default CardDateRange;
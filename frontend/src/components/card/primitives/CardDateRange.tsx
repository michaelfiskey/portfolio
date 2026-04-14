
interface CardDateRangeProps {
    startDate: Date
    endDate?: Date
}

const formatMonthYear = (date: Date) => {
    return `${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`
}

const getDateRange = (startDate: Date, endDate?: Date) => {
    const start = formatMonthYear(startDate)
    const end = endDate ? formatMonthYear(endDate) : "Present"
    return `${start} - ${end}`
}

const CardDateRange = ({ startDate, endDate }: CardDateRangeProps) => {
    return <span className="text-sm text-[#7a624e]">{getDateRange(startDate, endDate)}</span>
}
export default CardDateRange;
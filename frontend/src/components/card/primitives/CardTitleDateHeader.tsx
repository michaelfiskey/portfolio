import CardDateRange from "./CardDateRange";
import CardTitle from "./CardTitle";

interface CardTitleDateHeaderProps {
    title: string
    startDateLabel: string
    endDateLabel?: string
}
function CardTitleDateHeader({ title, startDateLabel, endDateLabel }: CardTitleDateHeaderProps) {
    return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 w-full mb-3">
        <CardTitle title={title}/>
        <CardDateRange startLabel={startDateLabel} endLabel={endDateLabel}/>
    </div>

    )
}
export default CardTitleDateHeader;
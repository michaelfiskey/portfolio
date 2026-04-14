import CardDateRange from "./CardDateRange";
import CardTitle from "./CardTitle";

interface CardHeaderProps {
    title: string
    startDate: Date
    endDate?: Date
}
function CardHeader({ title, startDate, endDate }: CardHeaderProps) {
    return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 w-full mb-3">
        <CardTitle title={title}/>
        <CardDateRange startDate={startDate} endDate={endDate}/>
    </div>

    )
}
export default CardHeader;
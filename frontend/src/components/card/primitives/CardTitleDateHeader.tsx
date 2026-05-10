import CardDate from "./CardDate";
import CardTitle from "./CardTitle";

interface CardTitleDateHeaderProps {
    title: string
    date: string
}
function CardTitleDateHeader({ title, date }: CardTitleDateHeaderProps) {
    return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 w-full mb-3">
        <CardTitle title={title}/>
        <CardDate date={ date }/>
    </div>

    )
}
export default CardTitleDateHeader;
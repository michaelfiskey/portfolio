interface CardBaseProps {
    borderColor?: string,
    backgroundColor?: string,
    children: React.ReactNode
}

function CardBase({ backgroundColor, borderColor, children }: CardBaseProps) {
    return (
        <div 
            className="rounded-2xl p-6 md:p-7" 
            style={{ backgroundColor : backgroundColor ?? "#f8f3ea", borderColor: borderColor ?? "#d7c7af"}}
        >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                {children}
            </div>
        </div>
    )

}
export default CardBase;
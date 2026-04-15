interface GridPageSectionProps {
    id: string,
    backgroundColor?: string,
    children: React.ReactNode
}

const GridPageSection = ({ id, backgroundColor, children }: GridPageSectionProps) => {
    return (
        <section id={id} className="py-24 px-10 md:px-34" style={{backgroundColor: backgroundColor ?? "#ede5d8"}}>
            <div className="grid items-stretch gap-20 lg:grid-cols-[1.30fr_1.2fr]">
                {children}
            </div>
        </section>
    )
}
export default GridPageSection;
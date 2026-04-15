interface PageSectionProps {
    id: string,
    backgroundColor?: string,
    children: React.ReactNode
}

const PageSection = ({ id, backgroundColor, children }: PageSectionProps) => {
    return (
        <section id={id} className="pt-32 pb-24 px-10 md:px-24" style={{backgroundColor: backgroundColor ?? "#ede5d8"}}>
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 md:p-10 lg:p-12">
                    {children}
                </div>
            </div>
        </section>
    )
}
export default PageSection;
interface PageSectionProps {
    id: string,
    title: string,
    subTitle: string,
    backgroundColor?: string,
    children: React.ReactNode
}

const PageSection = ({ id, title, subTitle, backgroundColor, children }: PageSectionProps) => {
    return (
        <section id={id} className="pt-32 pb-24 px-10 md:px-24" style={{backgroundColor: backgroundColor ?? "#ede5d8"}}>
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 md:p-10 lg:p-12">
                    <span className="text-sm tracking-[0.3em] uppercase text-[#8c6e4b] mb-4 block">{title}</span>
                    <h1 className="text-[2.5rem] md:text-[4.2rem] leading-[0.98] font-normal text-[#3f3025] mb-4">
                        {subTitle}
                    </h1>
                    {children}
                </div>
            </div>
        </section>
    )
}
export default PageSection;
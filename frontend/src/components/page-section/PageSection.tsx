interface PageSectionProps {
    id: string,
    backgroundColor?: string,
    children: React.ReactNode
}

const PageSection = ({ id, backgroundColor, children }: PageSectionProps) => {
    return (
        <section id={id} className="py-24 px-10 md:px-34" style={{backgroundColor: backgroundColor ?? "#fde5d8"}}>
                {children}
        </section>
    )
}
export default PageSection;
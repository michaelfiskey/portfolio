interface PageSectionProps {
    id: string,
    className?: string
    children: React.ReactNode
}

const PageSection = ({ id, className, children }: PageSectionProps) => {
    return (
        <section id={id} className={["py-10 px-5 md:px-34 bg-warm-150", className ? className : ""].join(" ")}>
                {children}
        </section>
    )
}
export default PageSection;
interface PageSectionProps {
    id: string,
    className?: string
    children: React.ReactNode
}

const PageSection = ({ id, className, children }: PageSectionProps) => {
    return (
        <section id={id} className={["py-24 px-10 md:px-34 bg-[#ede5d8]", className ? className : ""].join(" ")}>
                {children}
        </section>
    )
}
export default PageSection;
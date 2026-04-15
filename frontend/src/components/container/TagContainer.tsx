interface TagContainerProps {
    children: React.ReactNode;
    className?: string
}

const TagContainer = ({ children, className }: TagContainerProps) => {
    return (
        <div className={["flex flex-wrap gap-3 mb-8", className && className].join(" ")}>
            {children}
        </div>
    )

}
export default TagContainer;
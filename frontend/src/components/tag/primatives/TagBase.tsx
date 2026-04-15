interface TagBaseProps {
    children: React.ReactNode,
    className?: string
}
const TagBase = ({ children, className }: TagBaseProps) => {
    return (
        <span className={["px-4 py-1.5 rounded-full text-sm", className ? className : "bg-[#dfcfb6] text-[#5e4430]"].join(" ")}>
            {children}
        </span>
    )
}
export default TagBase;
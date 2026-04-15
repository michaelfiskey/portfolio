import TagBase from "./primatives/TagBase";

interface TagProps {
    children: React.ReactNode,
    className?: string
}
const Tag = ({ children, className }: TagProps) => {
    return className
        ? <TagBase className={className}>{children}</TagBase>
        : <TagBase>{children}</TagBase>
}
export default Tag;
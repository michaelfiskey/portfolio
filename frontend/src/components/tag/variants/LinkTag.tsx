import TagBase from "../primatives/TagBase";

interface LinkTagProps {
    children: React.ReactNode,
    className?: string,
    href: string
}

const LinkTag = ({ children, className, href }: LinkTagProps) => {
    return (
        <a href={href}> 
            {className ?
                <TagBase className={className}> { children } </TagBase>
                :<TagBase> { children } </TagBase> 
            }
        </a>

    )
}
export default LinkTag;
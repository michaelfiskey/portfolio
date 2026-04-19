interface CardTagsProps {
    tags: React.ReactNode[]
}

const CardTags = ({ tags }: CardTagsProps) => {
    return tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span key={tag?.toString()} className="px-3 py-1 bg-warm-250 text-warm-875 rounded-full text-xs">
                    {tag}
                </span>
            ))}
        </div>
    ) : <></>
}

export default CardTags;
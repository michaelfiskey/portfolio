interface CardTagsProps {
    tags: React.ReactNode[]
}

const CardTags = ({ tags }: CardTagsProps) => {
    return tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span key={tag?.toString()} className="px-3 py-1 bg-[#dfcfb6] text-[#5e4430] rounded-full text-xs">
                    {tag}
                </span>
            ))}
        </div>
    ) : <></>
}

export default CardTags;
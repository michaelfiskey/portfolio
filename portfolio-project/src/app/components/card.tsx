interface CardProps {
    projectTitle: string,
    projectDescription: string
}

const Card = (props: CardProps) => {
    return (
        <div className="h-[300px] max-w-[400px] border border-stone-700">
            <h2 className="h3">{props.projectTitle}</h2>
            <div className="pl-5 pr-5">
                <p>{props.projectDescription}</p>
            </div>
        </div>
    )
}
export default Card;
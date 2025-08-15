interface CardProps {
    title: string,
    description?: string,
    imageSrc?: string
}

const Card = (props: CardProps) => {
    return (
        
        <div className="flex flex-col w-[250px]">
                <img className='w-[250px] h-[250px]'src={props.imageSrc}/>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
        </div>
    )
}
export default Card;
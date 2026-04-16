interface GridCardContainerProps {
    children: React.ReactNode
}

const GridCardContainer = ({ children }: GridCardContainerProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            { children }
        </div>
    )
}
export default GridCardContainer;
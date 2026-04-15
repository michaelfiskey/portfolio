interface GridCardContainerProps {
    children: React.ReactNode
}

const GridCardContainer = ({ children }: GridCardContainerProps) => {
    return (
        <div className="grid sm:grid-cols-[0.95fr_1.45fr_0.95fr] gap-3 mb-7 max-w-4xl">
            { children }
        </div>
    )
}
export default GridCardContainer;
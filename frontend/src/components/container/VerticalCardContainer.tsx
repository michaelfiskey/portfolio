interface VerticalCardContainerProps {
    children: React.ReactNode
}
const VerticalCardContainer = ({ children }: VerticalCardContainerProps) => {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            { children }
        </div>
    )
}
export default VerticalCardContainer;
interface PageContainerProps {
    children: React.ReactNode;
}
const PageContainer = ({ children }:PageContainerProps) => {
    return (
        <div className="pt-45 sm:pt-20 bg-warm-150">{children}</div>
    )
}
export default PageContainer;
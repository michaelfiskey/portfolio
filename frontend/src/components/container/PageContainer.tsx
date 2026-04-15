interface PageContainerProps {
    children: React.ReactNode;
}
const PageContainer = ({ children }:PageContainerProps) => {
    return (
        <div>{children}</div>
    )
}
export default PageContainer;
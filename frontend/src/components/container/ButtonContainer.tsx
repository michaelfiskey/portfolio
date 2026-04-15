interface ButtonContainerProps {
    children: React.ReactNode;
    className?: string
}

const ButtonContainer = ({ children, className }: ButtonContainerProps) => {
    return (
        <div className={["flex flex-wrap gap-3 mb-8", className && className].join(" ")}>
            {children}
        </div>
    )
}
export default ButtonContainer;
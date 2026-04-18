interface FormBaseProps {
    onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
    className?: string;
    children: React.ReactNode;
}

const FormBase = ({ onSubmit, className, children }: FormBaseProps) => {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
};

export default FormBase;
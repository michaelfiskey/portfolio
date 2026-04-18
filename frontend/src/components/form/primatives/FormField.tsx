interface FormFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    className?: string;
    children: React.ReactNode;
}

const FormField = ({ label, required = false, error, className, children }: FormFieldProps) => {
    return (
        <div className={className ?? "flex flex-col gap-2"}>
            <label className="text-sm text-warm-250">
                {label}
                {required ? <span className="text-blush-400"> *</span> : ""}
            </label>
            {children}
            {error ? <p className="text-sm text-blush-200!">{error}</p> : null}
        </div>
    );
};

export default FormField;
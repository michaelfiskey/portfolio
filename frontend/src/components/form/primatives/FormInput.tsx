interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isInvalid?: boolean;
}

const FormInput = ({ isInvalid = false, className, ...props }: FormInputProps) => {
    const baseClasses = "rounded-lg border bg-warm-100 text-warm-950 px-3 py-2 outline-none focus:ring-2";
    const stateClasses = isInvalid
        ? "border-blush-400 focus:ring-blush-400"
        : "border-warm-650 focus:ring-warm-500";
    
    return <input  {...props} className={[baseClasses, stateClasses, className].filter(Boolean).join(" ")} />;
};

export default FormInput;
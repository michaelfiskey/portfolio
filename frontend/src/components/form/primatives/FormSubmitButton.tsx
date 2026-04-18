interface FormSubmitButtonProps {
    disabled: boolean;
    children: React.ReactNode;
}

const FormSubmitButton = ({ disabled, children }: FormSubmitButtonProps) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`px-8 py-3 rounded-full text-sm tracking-wide transition-colors ${
                disabled
                    ? "bg-warm-750 text-warm-300 opacity-70 cursor-not-allowed"
                    : "bg-warm-500 text-warm-975 hover:bg-warm-400 cursor-pointer"
            }`}
        >
            {children}
        </button>
    );
};

export default FormSubmitButton;
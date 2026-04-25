import FormBase from "../primatives/FormBase";
import FormField from "../primatives/FormField";
import FormInput from "../primatives/FormInput";
import FormSubmitButton from "../primatives/FormSubmitButton"
import { emailValidationError, passwordValidationError } from "../../../utilities/validate";
import { Link } from 'react-router'
import useFormState from "../hooks/useFormState";
import { sendLoginCredentials } from "../../../services/authservice";
import { useNotificationContext } from "../../../context/NotificationContext";

const LoginForm = () => {
    const { pushNotification } = useNotificationContext();
    const { fields, setFieldValue, touchField, markRequiredTouched } = useFormState({
        email:    { value: "", isTouched: false },
        password: { value: "", isTouched: false },
    });

    const emailError    = emailValidationError(fields.email.value);
    const passwordError = passwordValidationError(fields.password.value);

    const isFormValid = !emailError && !passwordError;

    const handleOnSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        markRequiredTouched();
        if (!isFormValid) return;

        sendLoginCredentials({
			email: fields.email.value,
			password: fields.password.value,
		}).then(() => {
			pushNotification("success", "You have been successfully logged in!");
		}).catch((error: unknown) => {
			const message = error instanceof Error ? error.message : "An unexpected error occurred.";
			pushNotification("error", message);
		});
    };

    return (
        <FormBase className="w-md! shadow-xl rounded-2xl border border-warm-700 bg-warm-950 p-6 md:p-12" onSubmit={handleOnSubmit}>
            <div className="text-center pb-4">
                <h1 className="text-warm-500!">Login</h1>
                <h2 className="text-warm-50!">Login to get started!</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <FormField label="Email" required={true} error={fields.email.isTouched ? emailError : ""}>
                    <FormInput
                        placeholder="johndoe@example.com"
                        value={fields.email.value}
                        onChange={(e) => setFieldValue("email", e.target.value.slice(0, 75))}
                        onBlur={() => touchField("email")}
                        isInvalid={Boolean(fields.email.isTouched && emailError)}
                    />
                </FormField>
                <FormField label="Password" required={true} error={fields.password.isTouched ? passwordError : ""}>
                    <FormInput
                        type="password"
                        placeholder="•••••••••"
                        value={fields.password.value}
                        onChange={(e) => setFieldValue("password", e.target.value.slice(0, 50))}
                        onBlur={() => touchField("password")}
                        isInvalid={Boolean(fields.password.isTouched && passwordError)}
                    />
                </FormField>
                <p className="text-warm-50! text-center p-0!">Don't have an account? <br/><Link to={{pathname: "/signup"}}><u>Sign up here!</u></Link></p>
                <FormSubmitButton disabled={!isFormValid}>Login</FormSubmitButton>
            </div>
        </FormBase>
    );
};

export default LoginForm;
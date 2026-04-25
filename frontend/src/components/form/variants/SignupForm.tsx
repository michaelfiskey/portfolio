import FormBase from "../primatives/FormBase";
import FormField from "../primatives/FormField";
import FormInput from "../primatives/FormInput";
import FormSubmitButton from "../primatives/FormSubmitButton"
import { emailValidationError, nameValidationError, passwordValidationError } from "../../../utilities/validate";
import { Link } from 'react-router'
import { sendSignupCredentials } from "../../../services/authservice";
import useFormState from "../hooks/useFormState";
import { useNotificationContext } from "../../../context/NotificationContext";

const SignupForm = () => {
    const { pushNotification } = useNotificationContext();

    const { fields, setFieldValue, touchField, markRequiredTouched } = useFormState({
		firstName: { value: "", isTouched: false },
		lastName:  { value: "", isTouched: false },
		email:     { value: "", isTouched: false },
		password:  { value: "", isTouched: false },
	});

    const firstNameError = nameValidationError(fields.firstName.value);
    const lastNameError  = nameValidationError(fields.lastName.value);
    const emailError     = emailValidationError(fields.email.value);
    const passwordError  = passwordValidationError(fields.password.value);

    const isFormValid = !firstNameError && !lastNameError && !emailError && !passwordError;

    const handleOnSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        markRequiredTouched();
        if (!isFormValid) return;

        sendSignupCredentials({
            firstName: fields.firstName.value,
            lastName:  fields.lastName.value,
            email:     fields.email.value,
            password:  fields.password.value,
		}).then(() => {
			pushNotification("success", "You have successfully signed up!.");
		}).catch((error: unknown) => {
			const message = error instanceof Error ? error.message : "An unexpected error occurred.";
			pushNotification("error", message);
		});
    };

    return (
        <FormBase className="w-md! shadow-xl rounded-2xl border border-warm-700 bg-warm-950 p-6 md:p-12" onSubmit={handleOnSubmit}>
            <div className="text-center pb-4">
                <h1 className="text-warm-500!">Signup</h1>
                <h2 className="text-warm-50!">Sign up to get started!</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <FormField label="First Name" required={true} error={fields.firstName.isTouched ? firstNameError : ""}>
                    <FormInput
                        placeholder="John"
                        value={fields.firstName.value}
                        onChange={(e) => setFieldValue("firstName", e.target.value.slice(0, 75))}
                        onBlur={() => touchField("firstName")}
                        isInvalid={Boolean(fields.firstName.isTouched && firstNameError)}
                    />
                </FormField>
                <FormField label="Last Name" required={true} error={fields.lastName.isTouched ? lastNameError : ""}>
                    <FormInput
                        placeholder="Doe"
                        value={fields.lastName.value}
                        onChange={(e) => setFieldValue("lastName", e.target.value.slice(0, 75))}
                        onBlur={() => touchField("lastName")}
                        isInvalid={Boolean(fields.lastName.isTouched && lastNameError)}
                    />
                </FormField>
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
                <p className="text-warm-50! text-center p-0!">Already have an account? <br/><Link to={{pathname: "/login"}}><u>Login here!</u></Link></p>
                <FormSubmitButton disabled={!isFormValid}>Signup</FormSubmitButton>
            </div>
        </FormBase>
    );
};

export default SignupForm;
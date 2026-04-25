import { useNotificationContext } from "../../../context/NotificationContext";
import FormBase from "../primatives/FormBase";
import FormField from "../primatives/FormField";
import FormInput from "../primatives/FormInput";
import FormSubmitButton from "../primatives/FormSubmitButton";
import FormTextArea from "../primatives/FormTextArea";
import { sendEmail } from "../../../services/emailservice";
import { emailValidationError, messageValidationError, nameValidationError } from "../../../utilities/validate";
import useFormState from "../hooks/useFormState";

const ContactForm = () => {
	const { pushNotification } = useNotificationContext();

	const { fields, setFieldValue, touchField, clearFields, markRequiredTouched } = useFormState({
		firstName:   { value: "", isTouched: false },
		lastName:    { value: "", isTouched: false },
		email:       { value: "", isTouched: false },
		phoneNumber: "",
		company:     "",
		message:     { value: "", isTouched: false },
	});

	const firstNameError = nameValidationError(fields.firstName.value);
	const lastNameError  = nameValidationError(fields.lastName.value);
	const emailError     = emailValidationError(fields.email.value);
	const messageError   = messageValidationError(fields.message.value);

	const isFormValid = !firstNameError && !lastNameError && !emailError && !messageError;

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		markRequiredTouched();

		if (!isFormValid) return;

		sendEmail({
			firstName:   fields.firstName.value,
			lastName:    fields.lastName.value,
			fromEmail:   fields.email.value,
			phoneNumber: fields.phoneNumber,
			company:     fields.company,
			message:     fields.message.value,
		}).then(() => {
			clearFields();
			pushNotification("success", "Thanks! Your message has been submitted.");
		}).catch((error: unknown) => {
			const message = error instanceof Error ? error.message : "An unexpected error occurred.";
			pushNotification("error", message);
		});
	};

	return (
		<FormBase onSubmit={handleSubmit} className="rounded-2xl border border-warm-825 bg-warm-950 p-6 md:p-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField label="First Name" required={true} error={fields.firstName.isTouched ? firstNameError : ""}>
					<FormInput
						placeholder="John"
						value={fields.firstName.value}
						onChange={(e) => setFieldValue("firstName", e.target.value.slice(0, 100))}
						onBlur={() => touchField("firstName")}
						isInvalid={Boolean(fields.firstName.isTouched && firstNameError)}
					/>
				</FormField>
				<FormField label="Last Name" required={true} error={fields.lastName.isTouched ? lastNameError : ""}>
					<FormInput
						placeholder="Doe"
						value={fields.lastName.value}
						onChange={(e) => setFieldValue("lastName", e.target.value.slice(0, 100))}
						onBlur={() => touchField("lastName")}
						isInvalid={Boolean(fields.lastName.isTouched && lastNameError)}
					/>
				</FormField>
			</div>
			<div className="mt-4 flex flex-col gap-4">
				<FormField label="Email" required={true} error={fields.email.isTouched ? emailError : ""}>
					<FormInput
						placeholder="john-doe@example.com"
						value={fields.email.value}
						onChange={(e) => setFieldValue("email", e.target.value.slice(0, 100))}
						onBlur={() => touchField("email")}
						isInvalid={Boolean(fields.email.isTouched && emailError)}
					/>
				</FormField>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField label="Phone Number">
						<FormInput
							placeholder="5551234567"
							value={fields.phoneNumber}
							onChange={(e) => setFieldValue("phoneNumber", e.target.value.replace(/\D/g, "").slice(0, 14))}
							className="flex-1"
						/>
					</FormField>
					<FormField label="Company">
						<FormInput
							placeholder="Example LLC"
							value={fields.company}
							onChange={(e) => setFieldValue("company", e.target.value.slice(0, 100))}
						/>
					</FormField>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<FormField label="Message" required error={fields.message.isTouched ? messageError : ""}>
					<FormTextArea
						placeholder="Tell me about your project..."
						value={fields.message.value}
						onChange={(e) => setFieldValue("message", e.target.value.slice(0, 500))}
						onBlur={() => touchField("message")}
						className="h-36"
						isInvalid={Boolean(fields.message.isTouched && messageError)}
					/>
				</FormField>
			</div>
			<div className="mt-6 flex flex-col items-start gap-3">
				<FormSubmitButton disabled={!isFormValid}>Send Message</FormSubmitButton>
			</div>
		</FormBase>
	);
};

export default ContactForm;

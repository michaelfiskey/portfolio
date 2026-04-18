import axios from "axios";
import { useState } from "react";
import FormBase from "../primatives/FormBase";
import FormField from "../primatives/FormField";
import FormInput from "../primatives/FormInput";
import FormSubmitButton from "../primatives/FormSubmitButton";
import FormTextArea from "../primatives/FormTextArea";

interface TextFieldState {
	value: string;
	isTouched: boolean;
}

const ContactForm = () => {
	const [firstName, setFirstName] = useState<TextFieldState>({ value: "", isTouched: false });
	const firstNameError = firstName.value.trim() ? "" : "First name is required.";

	const [lastName, setLastName] = useState<TextFieldState>({ value: "", isTouched: false });
	const lastNameError = lastName.value.trim() ? "" : "Last name is required.";

	const [email, setEmail] = useState<TextFieldState>({ value: "", isTouched: false });
	const emailError = !email.value.trim()
		? "Email is required."
		: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
			? ""
			: "Enter a valid email address.";

	const [countryCode, setCountryCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const phoneError = !countryCode && !phoneNumber
		? ""
		: !countryCode || !phoneNumber
			? "Add both country code and phone number, or leave both blank."
			: "";

	const [company, setCompany] = useState("");

	const [message, setMessage] = useState<TextFieldState>({ value: "", isTouched: false });
	const messageError = message.value.trim() ? "" : "Message is required.";

	const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
	const [submitErrorMessage, setSubmitErrorMessage] = useState("");

	const isFormValid = !firstNameError && !lastNameError && !emailError && !messageError && !phoneError;

	const markRequiredTouched = () => {
		setFirstName((prev) => ({ ...prev, isTouched: true }));
		setLastName((prev) => ({ ...prev, isTouched: true }));
		setEmail((prev) => ({ ...prev, isTouched: true }));
		setMessage((prev) => ({ ...prev, isTouched: true }));
	};

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		markRequiredTouched();

		if (!isFormValid) {
			setSubmitSuccessMessage("");
			return;
		}

		sendEmail();
	};
	const clearFields = () => {
		setFirstName({ value: "", isTouched: false });
		setLastName({ value: "", isTouched: false });
		setEmail({ value: "", isTouched: false });
		setCountryCode("");
		setPhoneNumber("");
		setCompany("");
		setMessage({ value: "", isTouched: false });
		setSubmitErrorMessage("");

	}

	const sendEmail = async () => {
		try {
			await axios.post("http://localhost:5124/api/email/send-email", {
				firstName: firstName.value,
				lastName: lastName.value,
				fromEmail: email.value,
				phoneNumber: countryCode && phoneNumber ? `${countryCode}${phoneNumber}` : "",
				company,
				message: message.value,
			});
			clearFields();
			setSubmitSuccessMessage("Thanks! Your message has been submitted.");
		} catch {
			setSubmitErrorMessage("Something went wrong. Please try again.");
		}
	};

	return (
		<FormBase onSubmit={handleSubmit} className="rounded-2xl border border-warm-825 bg-warm-950 p-6 md:p-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField label="First Name" required={true} error={firstName.isTouched ? firstNameError : ""}>
					<FormInput
						placeholder="John"
						value={firstName.value}
						onChange={(e) => setFirstName({ ...firstName, value: e.target.value.slice(0, 100) })}
						onBlur={() => setFirstName({ ...firstName, isTouched: true })}
						isInvalid={Boolean(firstName.isTouched && firstNameError)}
					/>
				</FormField>
				<FormField label="Last Name" required={true} error={lastName.isTouched ? lastNameError : ""}>
					<FormInput
						placeholder="Doe"
						value={lastName.value}
						onChange={(e) => setLastName({ ...lastName, value: e.target.value.slice(0, 100) })}
						onBlur={() => setLastName({ ...lastName, isTouched: true })}
						isInvalid={Boolean(lastName.isTouched && lastNameError)}
					/>
				</FormField>
			</div>
			<div className="mt-4 flex flex-col gap-4">
				<FormField label="Email" required={true} error={email.isTouched ? emailError : ""}>
					<FormInput
						placeholder="john-doe@example.com"
						value={email.value}
						onChange={(e) => setEmail({ ...email, value: e.target.value.slice(0, 100) })}
						onBlur={() => setEmail({ ...email, isTouched: true })}
						isInvalid={Boolean(email.isTouched && emailError)}
					/>
				</FormField>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField label="Phone Number" error={phoneError}>
						<div className="flex gap-2">
							<FormInput
								placeholder="+1"
								value={countryCode}
								onChange={(e) => {
									let val = e.target.value.replace(/(?!^\+)\D/g, "");
									if (val.startsWith("+")) {
										val = "+" + val.slice(1).replace(/\D/g, "").slice(0, 3);
									} else if (val.length > 0) {
										val = "+" + val.replace(/\D/g, "").slice(0, 3);
									}
									setCountryCode(val);
								}}
								className="w-20"
								isInvalid={Boolean(phoneError)}
							/>

							<FormInput
								placeholder="5551234567"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 14))}
								className="flex-1"
								isInvalid={Boolean(phoneError)}
							/>
						</div>
					</FormField>

					<FormField label="Company">
						<FormInput
							placeholder="Example LLC"
							value={company}
							onChange={(e) => setCompany(e.target.value.slice(0, 100))}
						/>
					</FormField>
				</div>
			</div>

			<div className="flex flex-col gap-2 mt-4">
				<FormField label="Message" required error={message.isTouched ? messageError : ""}>
					<FormTextArea
						placeholder="Tell me about your project..."
						value={message.value}
						onChange={(e) => setMessage({ ...message, value: e.target.value.slice(0, 500) })}
						onBlur={() => setMessage({ ...message, isTouched: true })}
						className="h-36"
						isInvalid={Boolean(message.isTouched && messageError)}
					/>
				</FormField>
			</div>

			<div className="mt-6 flex flex-col items-start gap-3">
				<FormSubmitButton disabled={!isFormValid}>Send Message</FormSubmitButton>
				{submitSuccessMessage ? <p className="text-mint-200! text-sm">{submitSuccessMessage}</p> : null}
			{submitErrorMessage ? <p className="text-red-400 text-sm">{submitErrorMessage}</p> : null}
			</div>
		</FormBase>
	);
};
export default ContactForm;
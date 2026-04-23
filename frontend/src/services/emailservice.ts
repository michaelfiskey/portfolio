	import axios from "axios";

	interface SendEmailParams {
		firstName: string;
		lastName: string;
		fromEmail: string;
		phoneNumber?: string;
		company?: string;
		message: string;
	}

	export async function sendEmail({
		firstName,
		lastName,
		fromEmail,
		phoneNumber = "",
		company = "",
		message,
	}: SendEmailParams): Promise<void> {
		try{
			await axios.post(import.meta.env.VITE_API_URL + "/email/send", {
			firstName,
			lastName,
			fromEmail,
			phoneNumber,
			company,
			message,
		});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message ?? error.message ?? "There was an error retrieving projects.";
				throw new Error(message);
			}
			throw new Error("An unexpected error occurred.");
    	}	

	}

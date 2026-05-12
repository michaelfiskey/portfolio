	import axios from "axios";
	import { API_ROUTES } from "../constants/routes";
	import { ERRORS } from "../constants/errors";
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
			await axios.post(import.meta.env.VITE_API_URL + API_ROUTES.EMAIL.SEND, {
			firstName,
			lastName,
			fromEmail,
			phoneNumber,
			company,
			message,
		});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message ?? error.message ?? ERRORS.EMAIL.SEND;
				throw new Error(message);
			}
			throw new Error(ERRORS.UNEXPECTED);
    	}	
	}

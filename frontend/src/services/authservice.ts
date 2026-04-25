import axios from "axios"

interface SendSignupParams {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

interface SendLoginParams {
    email: string,
    password: string
}

export async function sendSignupCredentials({
    firstName,
    lastName,
    email,
    password,
}: SendSignupParams): Promise<void> {
    try {
        await axios.post(import.meta.env.VITE_API_URL + "/signup", {
            firstName,
            lastName,
            email,
            password
        })
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
			const message = error.response?.data?.message ?? error.message ?? "There was an error signing up.";
			throw new Error(message);
		}
		throw new Error("An unexpected error occurred.");
    }
}

export async function sendLoginCredentials({ email, password } : SendLoginParams) : Promise<void> {
    try {
        await axios.post(import.meta.env.VITE_API_URL + "/login", {
            email,
            password
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message ?? "There was an error logging in.";    
            throw new Error(message);    
        }
        throw new Error("An unexpected error occured.")
    }
}
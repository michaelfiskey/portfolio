import axios from "axios";
import api from "./api";

interface SendSignupParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface SendLoginParams {
    email: string;
    password: string;
}

export async function sendSignupCredentials({
    firstName,
    lastName,
    email,
    password,
}: SendSignupParams): Promise<string> {
    try {
        const res = await api.post("/auth/signup", { firstName, lastName, email, password });
        return res.data.accessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message ?? "There was an error signing up.";
            throw new Error(message);
        }
        throw new Error("An unexpected error occurred.");
    }
}

export async function sendLoginCredentials({ email, password }: SendLoginParams): Promise<string> {
    try {
        const res = await api.post("/auth/login", { email, password });
        return res.data.accessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message ?? "There was an error logging in.";
            throw new Error(message);
        }
        throw new Error("An unexpected error occurred.");
    }
}

export async function sendRefresh(): Promise<string> {
    const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/refresh",
        {},
        { withCredentials: true }
    );
    return res.data.accessToken;
}

export async function sendLogout(): Promise<void> {
    await api.post("/auth/logout");
}

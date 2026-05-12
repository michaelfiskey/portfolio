import axios from "axios";
import api from "./api";
import { API_ROUTES } from "../constants/routes";
import { ERRORS } from "../constants/errors";

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
        const res = await api.post(API_ROUTES.AUTH.SIGNUP, { firstName, lastName, email, password });
        return res.data.accessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message ?? ERRORS.AUTH.SIGNUP;
            throw new Error(message);
        }
        throw new Error(ERRORS.UNEXPECTED);
    }
}

export async function sendLoginCredentials({ email, password }: SendLoginParams): Promise<string> {
    try {
        const res = await api.post(API_ROUTES.AUTH.LOGIN, { email, password });
        return res.data.accessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message ?? ERRORS.AUTH.LOGIN;
            throw new Error(message);
        }
        throw new Error(ERRORS.UNEXPECTED);
    }
}

export async function sendRefresh(): Promise<string> {
    const res = await axios.post(
        import.meta.env.VITE_API_URL + API_ROUTES.AUTH.REFRESH,
        {},
        { withCredentials: true }
    );
    return res.data.accessToken;
}

export async function sendLogout(): Promise<void> {
    await api.post(API_ROUTES.AUTH.LOGOUT);
}

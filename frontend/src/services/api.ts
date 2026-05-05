import axios from "axios";
import { getAccessToken, setAccessToken } from "../auth/authToken";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// On 401, attempt a silent token refresh. If multiple requests fail simultaneously,
// queue them so only one refresh call is made.
let isRefreshing = false;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            if (isRefreshing) {
                // If a refresh is already in progress, reject immediately.
                return Promise.reject(error);
            }

            isRefreshing = true;
            try {
                const res = await axios.post(
                    import.meta.env.VITE_API_URL + "/auth/refresh",
                    {},
                    { withCredentials: true }
                );
                const newToken: string = res.data.accessToken;
                setAccessToken(newToken);
                original.headers.Authorization = `Bearer ${newToken}`;
                return api(original);
            } catch {
                setAccessToken(null);
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;

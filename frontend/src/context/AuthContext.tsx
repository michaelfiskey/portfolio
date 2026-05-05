import { createContext, useContext, useState, useEffect } from "react";
import { useNotificationContext } from "./NotificationContext";
import { setAccessToken } from "../auth/authToken";
import { sendRefresh, sendLogout } from "../services/authservice";
import { useNavigate } from "react-router";
interface AuthContextValue {
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function parseJwtPayload(token: string): { role?: string } | null {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const { pushNotification } = useNotificationContext();
    const navigate = useNavigate();

    const login = (token: string) => {
        setAccessToken(token);
        setIsLoggedIn(true);
        const payload = parseJwtPayload(token);
        setIsAdmin(payload?.role === "admin");
    };

    const logout = async () => {
        try {
            await sendLogout();
        } catch { }
        setAccessToken(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
        pushNotification("success", "You have been logged out.");
    };

    // Attempt silent refresh on mount to restore session after page reload
    useEffect(() => {
        sendRefresh()
            .then(login)
            .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
}

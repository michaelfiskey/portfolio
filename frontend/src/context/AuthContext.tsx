import { useState, useEffect } from "react";
import { useNotificationContext } from "../hooks/useNotificationContext";
import { setAccessToken } from "../auth/authToken";
import { sendRefresh, sendLogout } from "../services/authservice";
import { useNavigate } from "react-router";
import { AuthContext } from "./authContextInstance";

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
        } catch (error) { console.error('Logout request failed: ', error) }
        setAccessToken(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
        pushNotification("success", "You have been logged out.");
    };

    useEffect(() => {
        sendRefresh()
            .then(login)
            .catch(() => {});
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


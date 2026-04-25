import { createContext, useContext, useState } from "react";

interface AuthContextValue {
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    isAdmin: boolean
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
}
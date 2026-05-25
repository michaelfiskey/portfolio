import { createContext } from "react";

export interface AuthContextValue {
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

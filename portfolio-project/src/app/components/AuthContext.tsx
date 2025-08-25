'use client';
import {useState, useContext, createContext, Dispatch, SetStateAction, ReactNode} from 'react';

interface AuthContextType {
    authUser: string | null;
    setAuthUser: Dispatch<SetStateAction<string | null>>;
    authRole: string | null;
    setAuthRole: Dispatch<SetStateAction<string | null>>;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState<string | null>(null);
    const [authRole, setAuthRole] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        authRole,
        setAuthRole,
        isLoggedIn,
        setIsLoggedIn
    }

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

'use client';
import {useState, useContext, createContext, Dispatch, SetStateAction, ReactNode} from 'react';

interface AuthContextType {
    authUser: any;
    setAuthUser: Dispatch<SetStateAction<any>>;
    authRole: any;
    setAuthRole: Dispatch<SetStateAction<any>>;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState(null);
    const [authRole, setAuthRole] = useState(null)
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

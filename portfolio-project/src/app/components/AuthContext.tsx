'use client';
import {useState, useEffect, useContext, createContext, Dispatch, SetStateAction, ReactNode} from 'react';

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            const verifyToken = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/validate-token`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (!response.ok) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('authUser');
                        localStorage.removeItem('authRole');
                        setIsLoggedIn(false);
                        setAuthUser(null);
                        setAuthRole(null);
                        return;
                    }

                    const data = await response.json();
                    setIsLoggedIn(true);
                    setAuthUser(data.user.username);
                    setAuthRole(data.user.role);

                } catch (error) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('authUser');
                    localStorage.removeItem('authRole');
                    setIsLoggedIn(false);
                    setAuthUser(null);
                    setAuthRole(null);
                    console.log(`ERROR: ${error}`)
                }
            };
            
            verifyToken();
        }
    }, [])

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

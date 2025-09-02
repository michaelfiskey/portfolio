'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [username, setUsername] = useState({
        value: '',
        isTouched: false,
    });
    const [password, setPassword] = useState({
        value: '',
        isTouched: false,
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [hasBackendError, setHasBackendError] = useState(false);
    const { setAuthUser, setAuthRole, setIsLoggedIn } = useAuth();

    const clearFormFields = () => {
        setUsername({ value: '', isTouched: true });
        setPassword({ value: '', isTouched: true });
    }
    const validateForm = useCallback(() => {
        const newErrors: string[] = [];
        
        if (username.isTouched && !username.value.trim()) {
            newErrors.push('Username is required');
        }
        
        if (password.isTouched && !password.value.trim()) {
            newErrors.push('Password is required');
        }
        
        setErrors(newErrors);
        return newErrors.length === 0; 
    }, [username, password])

    const isFormValid = () => {
        const hasAllFields = username.value.trim() && password.value.trim()
        return hasAllFields && errors.length === 0;
    }

    useEffect(() => {
        if (!hasBackendError) {
            validateForm();
        }
    }, [username, password, hasBackendError, validateForm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setUsername({...username, isTouched: true});
        setPassword({...password, isTouched: true});
        
        if (!validateForm()) {
            return;
        }
        
        setErrors([]);
        setHasBackendError(false);

        try {
            const response = await fetch('http://localhost:5500/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            })

            const data = await response.json()
            
            if (!response.ok) {
                console.log('Login error:', data.error);
                setHasBackendError(true);
                setErrors([data.error || 'Login failed']);
                setUsername({ value: '', isTouched: false });
                setPassword({ value: '', isTouched: false });
                return;
            }
            
            setIsLoggedIn(true);
            setAuthUser(username.value);
            setAuthRole(data.user.role);
            router.push('/');

        } catch {
            setErrors(['An internal error has occurred. Please try again.']);
            clearFormFields()
            setIsLoggedIn(false);
        }
    }

    return (
        <div>
            <div className='mt-10 flex flex-row items-center justify-center'>
                <div className="flex flex-col justify-center mt-10 max-w-[800px] min-w-[500px]">
                    {errors.length > 0 && (
                        <div className="mb-4 p-4 bg-red-100 bg-opacity-80 border border-red-400 rounded-sm">
                            <ul className="list-disc list-inside text-red-700">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form ref={formRef} onSubmit={handleSubmit} className="text-white border border-stone-700 relative overflow-hidden rounded-sm">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            src="/assets/gradient_contact.mp4"
                        />
                        <div className="bg-stone-700 w-full items-center justify-center p-1 relative z-10 bg-opacity-80">
                            <h2 className="h2 !text-white text-center">Login.</h2>
                        </div>
                        <div className="m-15 flex flex-col justify-center gap-5 relative z-10">
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full rounded-t-sm"><p className="ml-2 mt-1 ">Username<sup className="text-red-500">*</sup></p></label>
                                <input 
                                placeholder='username' 
                                name='username' 
                                value={username.value}
                                className="input mt-auto w-full rounded-b-sm"
                                onChange={(e) => {
                                    setUsername({...username, value: e.target.value.slice(0,30)});
                                    if (hasBackendError) setHasBackendError(false);
                                }}
                                onBlur={() => setUsername({...username, isTouched: true})}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full rounded-t-sm"><p className="ml-2 mt-1">Password<sup className="text-red-500">*</sup></p></label>
                                <input 
                                type='password' 
                                placeholder='password' 
                                name='password' 
                                value={password.value}
                                className="input mt-auto w-full rounded-b-sm"
                                onChange={(e) => {
                                    setPassword({...password, value: e.target.value.slice(0,100)});
                                    if (hasBackendError) setHasBackendError(false);
                                }}
                                onBlur={() => setPassword({...password, isTouched: true})}
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <button 
                                type='submit' 
                                    disabled={!isFormValid()}
                                    className={`bebas-font text-white text-2xl p-2 rounded-md transition-colors duration-200 ${
                                        isFormValid() 
                                            ? 'bg-stone-700 hover:bg-stone-600 hover:cursor-pointer' 
                                            : 'bg-stone-500 cursor-not-allowed opacity-60'
                                    }`}
                                >
                                    Login!
                                </button>
                            </div>
                            <p className='text-center text-white'>Don&apos;t have an account?<br/>
                                <Link href='/sign-up'><u>Sign up here!</u></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Page;
'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
    const router = useRouter();
    const { isLoggedIn, setIsLoggedIn, setAuthUser, setAuthRole} = useAuth();
    const formRef = useRef<HTMLFormElement>(null);
    const [username, setUsername] = useState({
        value:'',
        isTouched:false,
    });
    const [email, setEmail] = useState({
        value:'',
        isTouched:false,
    });
    const [password, setPassword] = useState({
        value:'',
        isTouched:false,
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value:'',
        isTouched:false,
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [hasBackendError, setHasBackendError] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    
    const validateForm = useCallback(() => {
        const newErrors: string[] = [];
        
        if (username.isTouched && !username.value.trim()) {
            newErrors.push('Username is required');
        }
        
        if (email.isTouched) {
            if (!email.value.trim()) {
                newErrors.push('Email is required');
            } else if (!validateEmail(email.value.trim())) {
                newErrors.push('Email is invalid');
            }
        }
        
        if (password.isTouched) {
            if (!password.value.trim()) {
                newErrors.push('Password is required');
            } else {
                if (password.value.length < 8) {
                    newErrors.push('Password must be at least 8 characters');
                }
                if (!/[A-Z]/.test(password.value)) {
                    newErrors.push('Password must contain an uppercase letter');
                }
                if (!/[0-9]/.test(password.value)) {
                    newErrors.push('Password must contain a number');
                }
            }
        }
        
        if (confirmPassword.isTouched) {
            if (!confirmPassword.value.trim()) {
                newErrors.push('Password confirmation is required');
            } else if (password.value !== confirmPassword.value) {
                newErrors.push('Passwords do not match');
            }
        }
        
        setErrors(newErrors);
        return newErrors.length === 0; 
    }, [username, password, email, confirmPassword,])

    const isFormValid = () => {
        const hasAllFields = username.value.trim() && 
                           email.value.trim() && 
                           password.value.trim() && 
                           confirmPassword.value.trim();
        return hasAllFields && errors.length === 0;
    }

    useEffect(() => {
        if (!hasBackendError) {
            validateForm();
        }
    }, [username, email, password, confirmPassword, hasBackendError, validateForm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setUsername({...username, isTouched: true});
        setEmail({...email, isTouched: true});
        setPassword({...password, isTouched: true});
        setConfirmPassword({...confirmPassword, isTouched: true});
        
        if (!validateForm()) {return;}
        
        setErrors([]);
        setHasBackendError(false);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    username: username.value,
                    password: password.value
                })
            })
            
            const data = await response.json();
            
            if (!response.ok) {
                console.log('Sign-up error:', data.error);
                setHasBackendError(true);
                setErrors([data.error || 'Registration failed']);
                setUsername({ value: '', isTouched: false });
                setEmail({ value: '', isTouched: false });
                setPassword({ value: '', isTouched: false });
                setConfirmPassword({ value: '', isTouched: false });
                return;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('authUser', username.value);
            localStorage.setItem('authRole', data.user.role);
            
            setIsLoggedIn(true);
            setAuthUser(username.value);
            setAuthRole(data.user.role);
            
            router.push('/')


        } catch {
            setErrors(['An internal error occurred. Please try again.']);
        }
    }

    return (
    <>
    
        {isLoggedIn ? <p>Already logged in!</p> : <div>
            <div className='mt-10 flex flex-row items-center justify-center'>
                <div className="flex flex-col justify-center mt-10 max-w-[800px] min-w-[500px]">
                    {errors.length > 0 && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded-sm">
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
                            <h2 className="h2 !text-white text-center">SIGN UP.</h2>
                        </div>
                        <div className="m-15 flex flex-col justify-center gap-5 relative z-10">
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full rounded-t-sm"><p className="ml-2 mt-1">Username<sup className="text-red-500">*</sup></p></label>
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
                                <label className="bg-stone-700 whitespace-nowrap w-auto rounded-t-sm"><p className="ml-2 mt-1">Email<sup className="text-red-500">*</sup></p></label>
                                <input
                                placeholder='john-doe@example.com'
                                name='email'
                                value={email.value}
                                className="input mt-auto w-full rounded-b-sm"
                                onChange={(e) => {
                                    setEmail({...email, value: e.target.value.slice(0,100)});
                                    if (hasBackendError) setHasBackendError(false);
                                }}
                                onBlur={() => setEmail({...email, isTouched: true})}
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
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full rounded-t-sm"><p className="ml-2 mt-1">Confirm Password<sup className="text-red-500">*</sup></p></label>
                                <input 
                                type='password'
                                placeholder='password' 
                                name='confirmPassword' 
                                value={confirmPassword.value}
                                className="input mt-auto w-full rounded-b-sm" 
                                onChange={(e) => {
                                    setConfirmPassword({...confirmPassword, value: e.target.value.slice(0,100)});
                                    if (hasBackendError) setHasBackendError(false);
                                }}
                                onBlur={() => setConfirmPassword({...confirmPassword, isTouched: true})}
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
                                    Sign up!
                                </button>
                            </div>
                            <p className='text-white text-center'>Already have an account? <br/>
                                <Link href='/login'><u>Login here!</u></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>}
        </>
    )

}

export default Page;
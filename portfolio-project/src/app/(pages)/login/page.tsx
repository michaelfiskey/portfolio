'use client';
import { useRef, useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import Link from 'next/link';

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                password
            })
        })
        const data = await response.json()
        setIsLoggedIn(true);
    }

    return (
    <>
        <div>
            <div className='mt-10 flex flex-row items-center justify-center'>
                <div className="flex flex-col justify-center mt-10 max-w-[800px] min-w-[500px]">
                    <form ref={formRef} onSubmit={handleSubmit} className="text-white border border-gray-700 relative overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            src="/assets/gradient_contact.mp4"
                        />
                        <div className="bg-stone-700 w-full items-center justify-center p-1 relative z-10 bg-opacity-80">
                            <h2 className="h2 text-white text-center">Login.</h2>
                        </div>
                        <div className="m-15 flex flex-col justify-center gap-5 relative z-10">
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full"><p className="ml-2 mt-1">Username<sup className="text-red-500">*</sup></p></label>
                                <input placeholder='username' name='username' className="input mt-auto w-full"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full"><p className="ml-2 mt-1">Password<sup className="text-red-500">*</sup></p></label>
                                <input placeholder='password' name='password' className="input mt-auto w-full"/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <button type='submit' className="bebas-font bg-stone-700 text-white text-2xl p-2 rounded-md hover:bg-stone-600 hover:cursor-pointer transition-colors duration-200">Login!</button>
                            </div>
                            <p className='text-center text-white'>Don't have an account?<br/>
                                <Link href='/sign-up'><u>Sign up here!</u></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )

}

export default Page;
'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const [showColon, setShowColon] = useState(true);
    const { isLoggedIn, setIsLoggedIn, setAuthUser, setAuthRole } = useAuth();


    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setShowColon((prev) => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [hours, minutes] = time.split(":");

    return (
        <div className='relative top-0 left-0 w-full z-50 pt-7 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4 sm:gap-8 px-4 sm:px-7'>
            <p className='text-stone-700 justify-self-center sm:justify-self-start font-[family-name:var(--font-bebas-neue)] text-2xl'>
                {hours}
                <span className={showColon ? "opacity-100 transition-opacity duration-200" : "opacity-0 transition-opacity duration-200"}>:</span>
                {minutes}
            </p>
            <nav className='justify-self-center sm:justify-self-end'>
                <ul className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-6 lg:gap-8 text-sm sm:text-base'>
                    <li className="justify-self-center text-stone-700 hover:text-stone-400 transition-colors">
                        <Link href="/">home.</Link>
                    </li>
                    <li className="group justify-self-center text-stone-700 hover:text-stone-400 transition-colors">
                        <Link href="/dev-and-data">
                            &lt;dev &amp; data /&gt;<span className="opacity-0 ml-1 inline-block group-hover:animate-pulse">_</span>
                        </Link>
                    </li>
                    {/*<li className="group justify-self-center hover:text-stone-400 transition-colors">
                        <Link href="/social-media">
                            social media <span className='inline-block group-hover:animate-spin'>&copy;</span>
                        </Link>
                    </li>*/}
                    <li className="group justify-self-center text-stone-700 hover:text-stone-400 transition-colors">
                        <Link href="/music">
                            music <span className="inline-block group-hover:animate-bounce">&#9835;</span>
                        </Link>
                    </li>
                    <li className="justify-self-center text-stone-700 hover:text-stone-400 transition-colors">
                        <Link href="/contact">contact.</Link>
                    </li>
                    <li className="justify-self-center text-stone-700 hover:text-stone-400 transition-colors">
                        {isLoggedIn ? (
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('isLoggedIn');
                                    localStorage.removeItem('authUser');
                                    localStorage.removeItem('authRole');;
                                    
                                    sessionStorage.clear();
                                    setIsLoggedIn(false);
                                    setAuthUser(null);
                                    setAuthRole(null);
                                    router.push('/');
                                }}
                                className="hover:cursor-pointer"
                            >
                                logout.
                            </button>
                        ) : (
                            <Link href="/login">login.</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default Navbar;
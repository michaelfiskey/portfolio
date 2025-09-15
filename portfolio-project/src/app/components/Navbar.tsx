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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className='fixed bg-stone-700 shadow-xl top-0 w-full z-50 pt-3 pb-2 px-7'>
            <div className='hidden lg:grid lg:grid-cols-3 px-15'>
                <p className='text-stone-100 justify-self-start font-[family-name:var(--font-bebas-neue)] text-2xl'>
                    {hours}
                    <span className={showColon ? "opacity-100 transition-opacity duration-200" : "opacity-0 transition-opacity duration-200"}>:</span>
                    {minutes}
                </p>
                <nav className='justify-self-end col-span-2'>
                    <ul className='lg:flex lg:flex-row lg:gap-10'>
                        <li className="group justify-self-center text-stone-100 hover:text-stone-400 transition-colors">
                            <Link href="/">home</Link>
                        </li>
                        <li className="group justify-self-center text-stone-100 hover:text-stone-400 transition-colors">
                            <Link href="/dev-and-data">
                                &lt;dev &amp; data /&gt;<span className="opacity-0 ml-1 inline-block group-hover:animate-pulse">_</span>
                            </Link>
                        </li>
                        <li className="group justify-self-center text-stone-100 hover:text-stone-400 transition-colors">
                            <Link href="/music">
                                music <span className="inline-block group-hover:animate-bounce">&#9835;</span>
                            </Link>
                        </li>
                        <li className="group text-stone-100 hover:text-stone-400 transition-colors">
                            <Link href="/social-media" onClick={() => setIsMenuOpen(false)}>
                                social media <span className="group-hover:animate-spin inline-block">&copy;</span>
                            </Link>
                         </li>
                        <li className="justify-self-center text-stone-100 hover:text-stone-400 transition-colors">
                            <Link href="/contact">contact</Link>
                        </li>
                        <li className="justify-self-center text-stone-100 hover:text-stone-400 transition-colors">
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
                                <Link href="/login">login</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='lg:hidden flex justify-between items-center'>
                <p className='text-stone-100 font-[family-name:var(--font-bebas-neue)] text-2xl'>
                    {hours}
                    <span className={showColon ? "opacity-100 transition-opacity duration-200" : "opacity-0 transition-opacity duration-200"}>:</span>
                    {minutes}
                </p>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-stone-100 hover:text-stone-400"
                >
                    <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </div>
                </button>
            </div>
            <nav className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className='pt-4 space-y-3 text-center'>
                    <li className="text-stone-100 hover:text-stone-400 transition-colors">
                        <Link href="/" onClick={() => setIsMenuOpen(false)}>home</Link>
                    </li>
                    <li className="group text-stone-100 hover:text-stone-400 transition-colors">
                        <Link href="/dev-and-data" onClick={() => setIsMenuOpen(false)}>
                            &lt;dev &amp; data /&gt;<span className="opacity-0 ml-1 inline-block group-hover:animate-pulse">_</span>
                        </Link>
                    </li>
                    <li className="group text-stone-100 hover:text-stone-400 transition-colors">
                        <Link href="/music" onClick={() => setIsMenuOpen(false)}>
                            music <span className="inline-block group-hover:animate-bounce">&#9835;</span>
                        </Link>
                    </li>
                    <li className="group text-stone-100 hover:text-stone-400 transition-colors">
                        <Link href="/social-media" onClick={() => setIsMenuOpen(false)}>
                            social media <span className="group-hover:animate-spin inline-block">&copy;</span>
                        </Link>
                    </li>
                    <li className="text-stone-100 hover:text-stone-400 transition-colors">
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)}>contact</Link>
                    </li>
                    <li className="text-stone-100 hover:text-stone-400 transition-colors">
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
                                    setIsMenuOpen(false);
                                    router.push('/');
                                }}
                                className="hover:cursor-pointer"
                            >
                                logout.
                            </button>
                        ) : (
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>login</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default Navbar;
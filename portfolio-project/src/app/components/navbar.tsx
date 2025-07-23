'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const [showColon, setShowColon] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setShowColon((prev) => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [hours, minutes] = time.split(":");

    return (
        <div className='pt-7 flex flex-row justify-between'>
            <p className='p ml-7 font-[family-name:var(--font-bebas-neue)] text-2xl'>
                {hours}
                <span className={showColon ? "opacity-100 transition-opacity duration-200" : "opacity-0 transition-opacity duration-200"}>:</span>
                {minutes}
            </p>
            <ul className='flex flex-row justify-end gap-10 mr-10'>
                <li>
                    <Link href="/">home</Link>
                </li>
                <li>
                    <Link href="/dev-and-data">&lt;dev &amp; data /&gt;</Link>
                </li>
                <li>
                    <Link href="/social-media">social media &copy;</Link>
                </li>
                <li>
                    <Link href="/music">music &#9835;</Link>
                </li>
                <li>
                    <Link href="/contact">contact</Link>
                </li>
            </ul>
        </div>
    );
};
export default Navbar;
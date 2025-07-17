import Link from 'next/link';
import * as React from 'react';

const Navbar = () => {
    return (
        <div className='mt-7'>
            <ul className='flex flex-row justify-center gap-10'>
                <li>
                    <Link href="/">home</Link>
                </li>
                <li>
                    <Link href="/dev-and-data">dev & data</Link>
                </li>
                <li>
                    <Link href="/social-media">social media</Link>
                </li>
                <li>
                    <Link href="/music">music</Link>
                </li>
                <li>
                    <Link href="/contact">contact</Link>
                </li>
            </ul>
        </div>
    )
}
export default Navbar;
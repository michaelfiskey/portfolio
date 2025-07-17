import Link from 'next/link';
import * as React from 'react';

const Navbar = () => {
    return (
        <div className='pt-7'>
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
    )
}
export default Navbar;
'use client';
import { useRef, useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthContext';

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
    }

    return (
    <div>
        {isLoggedIn ? <p>already loggedin!</p> :
            <form ref={formRef} onSubmit={handleSubmit}>
                <div>
                    <label className="mr-5">Username:</label>
                    <input 
                        className="pl-3" 
                        placeholder="username"
                        value={username}
                        onChange = {(e) => { setUsername(e.target.value)}}
                    />
                </div>
                <div>
                    <label className="mr-13">Email:</label>
                    <input 
                        className="pl-3" 
                        placeholder="email@email.com"
                        value={email}
                        onChange = {(e) => { setEmail(e.target.value)}}
                    />            
                </div>
                <div>
                    <label className="mr-5">Password:</label>
                    <input 
                        className="pl-3" 
                        placeholder="password"
                        value={password}
                        onChange = {(e) => { setPassword(e.target.value)}}
                    />              
                </div>
                <button type='submit' className="mt-2 pl-3 pr-3 pt-1 pb-1 bg-stone-700 text-white hover:bg-stone-900 hover:cursor-pointer">submit</button>
            </form>
        }
    </div>
    )
}

export default Page;
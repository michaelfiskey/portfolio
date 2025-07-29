'use client';
import React from 'react';
import { useRef, useState } from 'react'; 
const Page = () => {
    const [url, setUrl] = useState({
        value: '',
        isTouched: false,
        isValid: true,
    });

    const handleUrlValidation = (url: string) => {
        const regex = /^(https:\/\/)?(www\.)?when2meet\.com\/\?[\w-]+$/;
        return regex.test(url);
    }

    return (
        
        <div>
            <h1 className="h1">Scheduler.</h1>
            <div className="flex flex-col max-w-[400px]">
                <label>when2meet url:</label>
                <input
                    onChange={(e) => {
                        setUrl(prev => ({
                            ...prev,
                            value: e.target.value.slice(0, 100),
                            isValid: handleUrlValidation(e.target.value.slice(0, 100))
                        }))
                    }}
                    onBlur={() => { setUrl(prev => ({ ...prev, isTouched: true })) }}
                    placeholder="https://when2meet.com/example"
                />
            </div>
            <p>{url.isTouched.toString()}</p>
            {url.isTouched && (!url.value || !url.isValid) ? <p>INVALID</p> : null}
        </div>
    )
}
export default Page;
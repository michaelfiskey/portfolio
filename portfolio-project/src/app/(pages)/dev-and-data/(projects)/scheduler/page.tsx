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

    const handleSubmit = async () => {
        if (!url.value || !url.isValid) return;
        const response = await fetch('http://localhost:8000/api/scrape/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url.value })
        });
        const data = await response.json();
        console.log(data)
    };

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
                <button onClick={handleSubmit} className='bg-stone-700 text-white hover:cursor-crosshair'>go!</button>
            </div>
            <p>{url.isTouched.toString()}</p>
            {url.isTouched && (!url.value || !url.isValid) ? <p>INVALID</p> : null}
        </div>
    )
}
export default Page;
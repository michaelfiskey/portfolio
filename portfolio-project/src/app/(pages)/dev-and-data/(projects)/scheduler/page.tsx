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
                <label className='p-2 text-white bg-stone-700 mb-2'>when2meet url:</label>
                <div className='flex flex-row w-full justify-between gap-2'>
                    <input
                        onChange={(e) => {
                            setUrl(prev => ({
                                ...prev,
                                value: e.target.value.slice(0, 100),
                                isValid: handleUrlValidation(e.target.value.slice(0, 100))
                            }))
                        }}
                        onBlur={() => { setUrl(prev => ({ ...prev, isTouched: true })) }}
                        placeholder=" https://when2meet.com/example"
                        className='w-full border border-stone-700'
                    />
                    <button disabled={!url.value || !url.isValid} onClick={handleSubmit} className='p-3 bg-stone-700 text-white hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>Go!</button>
                </div>
            </div>
            {url.isTouched && !url.value ? <p className='mt-3 text-red-500'>URL is required!</p> : (url.isTouched && !url.isValid ? <p className='mt-3 text-red-500'>Invalid URL format!</p> : null)}
        </div>
    )
}
export default Page;
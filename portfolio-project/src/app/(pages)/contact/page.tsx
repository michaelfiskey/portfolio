'use client';
import React, { useState } from "react";

const Page = () => {
    const [firstName, setFirstName] = useState({
        value: "",
        isTouched: false,
        errorMessage: <li className="text-red-500">First name is required!</li>
    });
    const [lastName, setLastName] = useState({
        value: "",
        isTouched: false,
        errorMessage: <li className="text-red-500">Last name is required!</li>
    });
    const [email, setEmail] = useState({
        value: "",
        isTouched: false,
        isValid: true,
        errorMessage: <li className="text-red-500">Email is required!</li>
    });
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState({
        value: "",
        isTouched: false,
        errorMessage: <li className="text-red-500">Message is required!</li>
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName) {
            
        }
    }
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());

        console.log({ firstName, lastName, email, phone, company, message });
    };


    return (
        <div>
            <div>
                <div className="flex flex-row items-stretch justify-baseline">
                    <div className='w-full max-w-[800px] w-flex pt-5 pl-5 pr-5 pb-10'>
                        <h1 className="h1">CONTACT.</h1>
                        <p>If you like anything you see... Feel free to reach out! ^-^</p>
                    </div>
                </div>
                <div className="mr-70 ml-70 flex flex-col justify-center mt-10">
                    <ul className="list-disc ml-6">
                        {firstName.isTouched && !firstName.value && firstName.errorMessage}
                        {lastName.isTouched && !lastName.value && lastName.errorMessage}
                        {email.isTouched && !email.value && email.errorMessage}
                        {message.isTouched && !message.value && message.errorMessage}
                    </ul>
                    <form onSubmit={handleSubmit}className="text-white border border-gray-700 rounded-sm relative overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            src="/assets/gradient_contact.mp4"
                        />
                        <div className="bg-stone-700 w-full items-center justify-center p-1 rounded-sm relative z-10 bg-opacity-80">
                            <h2 className="h2 text-white text-center">Contact Form</h2>
                        </div>
                        <div className="m-15 flex flex-col justify-center gap-5 relative z-10">
                            <div className="flex flex-row gap-20 justify-center items-center ">
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-full"><p className="ml-2 mt-1">First Name<sup className="text-red-500">*</sup></p></label>
                                    <input onChange={(e) => setFirstName({...firstName, value: e.target.value})} onBlur={() => setFirstName({...firstName, isTouched: true})}  className="input mt-auto" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-full"><p className="ml-2 mt-1">Last Name<sup className="text-red-500">*</sup></p></label>
                                    <input onChange={(e) => setLastName({...lastName, value: e.target.value})} onBlur={() => setLastName({...lastName, isTouched: true})} className="input mt-auto" />
                                </div>
                            </div>
                            <div className="flex flex-row gap-20 justify-center items-center">
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Email<sup className="text-red-500">*</sup></p></label>
                                    <input onChange={(e) => setEmail({...email, value: e.target.value})} onBlur={() => setEmail({...email, isTouched: true})} className="input mt-auto" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Phone</p></label>
                                    <input onChange={(e) => setPhone(e.target.value)} className="input mt-auto" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Company</p></label>
                                    <input onChange={(e) => setCompany(e.target.value)} className="input mt-auto" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Message</p></label>
                                <textarea onChange={(e) => setMessage({...message, value: e.target.value})} onBlur={() => setMessage({...message, isTouched: true})} className="input h-[150px] mt-auto resize-none" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <button className="bebas-font bg-stone-700 text-white text-2xl p-2 rounded-md hover:bg-stone-600 hover:cursor-pointer transition-colors duration-200">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page;
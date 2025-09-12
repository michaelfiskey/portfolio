'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Page = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null)
    const [firstName, setFirstName] = useState({
        value: "",
        isTouched: false,
    });
    const [lastName, setLastName] = useState({
        value: "",
        isTouched: false,
    });
    const [email, setEmail] = useState({
        value: "",
        isTouched: false,
    });
    const [countryCode, setCountryCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState({
        value: "",
        isTouched: false,
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");

    useGSAP(() => {
        gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
    });

    const validateEmail = useCallback((email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },[]);

    const validateForm = useCallback(() => {
        const newErrors: string[] = [];
        
        if (firstName.isTouched && !firstName.value.trim()) {
            newErrors.push('First name is required');
        }
        
        if (lastName.isTouched && !lastName.value.trim()) {
            newErrors.push('Last name is required');
        }
        
        if (email.isTouched) {
            if (!email.value.trim()) {
                newErrors.push('Email is required');
            } else if (!validateEmail(email.value.trim())) {
                newErrors.push('Email is invalid');
            }
        }
        
        if (message.isTouched && !message.value.trim()) {
            newErrors.push('Message is required');
        }
        
        setErrors(newErrors);
        return newErrors.length === 0; 
    }, [firstName, lastName, email, message, validateEmail])

    const isFormValid = () => {
        const hasAllFields = firstName.value.trim() && 
                           lastName.value.trim() && 
                           email.value.trim() && 
                           message.value.trim()
        return hasAllFields && errors.length === 0;
    }

    useEffect(() => {
        validateForm();
    }, [firstName, lastName, email, message, validateForm]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitSuccessMessage("");
        
        setFirstName({...firstName, isTouched: true});
        setLastName({...lastName, isTouched: true});
        setEmail({...email, isTouched: true});
        setMessage({...message, isTouched: true});
        
        if (!validateForm()) {
            return;
        }
        
        setErrors([]);
        sendEmail();
    }

    const clearFormFields = () => {
        setFirstName((prev) => ({...prev, value: "", isTouched: false}));
        setLastName((prev) => ({...prev, value: "", isTouched: false}));
        setEmail({ value: "", isTouched: false });
        setCountryCode("");
        setPhoneNumber("");
        setCompany("");
        setMessage((prev) => ({...prev, value: "", isTouched: false}));
    }

    const sendEmail = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/contact/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    phoneNumber: countryCode ? `+${countryCode} ${phoneNumber}` : phoneNumber,
                    company: company,
                    message: message.value,
                })
            });
            
            const data = await response.json()

            if (!response.ok) {
                setErrors([data.error || 'Failed to send email']);
                return;
            }
            
            setSubmitSuccessMessage(data.message);
            clearFormFields();
            setErrors([]);

        } catch (error) {
            console.error('Network error:', error);
            setErrors(['Failed to send email. Please try again later.']);
        };
    }

    return (
        <div ref={pageRef}>
            <div>
                <div className="page-container">
            <div className="mt-5 mb-12 sm:ml-0 text-center sm:text-left">
                <h1 className="h1 ">CONTACT.</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-300 mx-auto sm:ml-5 mt-2 mb-4"></div>
                <p>If you&apos;d like to get in touch with me for any reason, feel free to reach out by filling out the form below! ^-^</p>
            </div>
                </div>
                <div className="flex flex-1 justify-center items-center">
                    <div className="w-full max-w-[1100px]">
                        {errors.length > 0 && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded-sm">
                                <ul className="list-disc list-inside text-red-700">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <form ref={formRef} onSubmit={handleSubmit} className="text-white border border-gray-700 rounded-md relative overflow-hidden">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover z-0"
                                src="/assets/gradient.mp4"
                            />
                            <div className="bg-stone-700 w-full items-center justify-center p-1 relative z-10 bg-opacity-80">
                                <h2 className="h2 !text-white text-center">Contact Form.</h2>
                            </div>
                            <div className="m-5 sm:m-8 md:m-8 lg:m-15 grid grid-cols-1 justify-center gap-3 sm:gap-4 md:gap-5 relative z-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
                                    <div className="flex flex-col ">
                                        <label className="bg-stone-700 text-white whitespace-nowrap w-full rounded-t-sm"><p className="text-white ml-2 mt-1">First Name<sup className="text-red-500">*</sup></p></label>
                                        <input 
                                        placeholder='John' 
                                        name='first_name' 
                                        value={firstName.value} 
                                        onChange={(e) => setFirstName({...firstName, value: e.target.value.slice(0,100)})} 
                                        onBlur={() => setFirstName({...firstName, isTouched: true})}  
                                        className="input mt-auto rounded-b-sm" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="bg-stone-700 text-white whitespace-nowrap w-full rounded-t-sm"><p className="text-white ml-2 mt-1">Last Name<sup className="text-red-500">*</sup></p></label>
                                        <input 
                                        placeholder='Doe' 
                                        name='last_name' 
                                        value={lastName.value} 
                                        onChange={(e) => setLastName({...lastName, value: e.target.value.slice(0,100)})} 
                                        onBlur={() => setLastName({...lastName, isTouched: true})} 
                                        className="input mt-auto rounded-b-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
                                    <div className="flex flex-col">
                                        <label className="bg-stone-700 text-white whitespace-nowrap w-full rounded-t-sm"><p className="text-white ml-2 mt-1">Email<sup className="text-red-500">*</sup></p></label>
                                        <input
                                        placeholder='john-doe@example.com'
                                        name='email'
                                        value={email.value}
                                        onChange={(e) => setEmail({...email, value: e.target.value.slice(0,100)})}
                                        onBlur={() => setEmail({...email, isTouched: true})}
                                        className="input mt-auto rounded-b-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="bg-stone-700 whitespace-nowrap w-full rounded-t-sm"><p className="text-white ml-2 mt-1">Phone Number</p></label>
                                        <div className="flex flex-row w-full rounded-b-sm">
                                            <input
                                            name="country_code"
                                            className="input w-[55px] rounded-b-sm"
                                            placeholder="+###"
                                            value={countryCode}
                                            onChange={e => {
                                                let val = e.target.value.replace(/(?!^\+)\D/g, ''); 
                                                if (val.startsWith('+')) {
                                                val = '+' + val.slice(1).replace(/\D/g, '').slice(0, 3); 
                                                } else if (!val.startsWith('+') && val.length > 0) {
                                                val = '+' + val.replace(/\D/g, '').slice(0, 3);
                                                }
                                                setCountryCode(val);
                                            }}
                                            />
                                            <input placeholder='############' name='phone_number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 14))} className="input mt-auto w-full rounded-b-sm" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="bg-stone-700 whitespace-nowrap w-full rounded-t-sm"><p className="text-white ml-2 mt-1">Company</p></label>
                                        <input placeholder='Example LLC' name='company' value={company} onChange={(e) => setCompany(e.target.value.slice(0,100))} className="input mt-auto rounded-b-sm" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-auto rounded-t-sm"><p className="text-white ml-2 mt-1">Message<sup className="text-red-500">*</sup></p></label>
                                    <textarea placeholder='I like your hair... ;)' name='message' value={message.value} onChange={(e) => setMessage({...message, value: e.target.value.slice(0,500)})} onBlur={() => setMessage({...message, isTouched: true})} className="input h-[150px] mt-auto resize-none rounded-b-sm" />
                                </div>
                                <div className='flex flex-col w-full'>
                                <button 
                                type='submit' 
                                    disabled={!isFormValid()}
                                    className={`bebas-font text-white text-2xl p-2 rounded-md transition-colors duration-200 ${
                                        isFormValid() 
                                            ? 'bg-stone-700 hover:bg-stone-600 hover:cursor-pointer' 
                                            : 'bg-stone-500 cursor-not-allowed opacity-60'
                                    }`}
                                >
                                    Submit!
                                </button>
                                    {!submitSuccessMessage ? null : <p className="text-center text-xl mt-2 text-lime-300"><b><u>{submitSuccessMessage}</u></b></p>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
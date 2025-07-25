'use client';
import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser'

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null)
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
        if (!firstName.value) {alert("Please include your first name!"); return}
        if (!lastName.value) {alert("Please include your last name!"); return}
        if (!email.value) {
            alert("Please include an email address!");
            return;
        }
        if (!validateEmail(email.value)) {
            alert("Email address is invalid! Please include a valid email address!");
            return;
        }
        if (!message.value) {alert("Please include a message!"); return}

        sendEmail()
    }

    

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const clearFormFields = () => {
        setFirstName((prev) => ({...prev, value: "", isTouched: false}));
        setLastName((prev) => ({...prev, value: "", isTouched: false}));
        setEmail({ value: "", isTouched: false, isValid: true });
        setPhone("");
        setCompany("");
        setMessage((prev) => ({...prev, value: "", isTouched: false}));
    }


    const sendEmail = () => {
        if (formRef.current) {
            emailjs.sendForm('service_kk5mlt4', 'template_1a22x66', formRef.current, {publicKey: 'mnFPSnlnhoLlrVS0U'})
            .then(() => {console.log("Email sent successfully!"), alert('Email has been sent successfully!'), clearFormFields();}, (error) => {console.log("Failed to send email:", error.text);});
        }
    }

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
                        {email.isTouched && !email.value && (
                          <li className="text-red-500">Email is required!</li>
                        )}
                        {email.isTouched && email.value && !email.isValid && (
                          <li className="text-red-500">Email is invalid!</li>
                        )}
                        {message.isTouched && !message.value && message.errorMessage}
                    </ul>
                    <form ref={formRef} onSubmit={handleSubmit}className="text-white border border-gray-700 rounded-sm relative overflow-hidden">
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
                                    <input name='first_name' value={firstName.value} onChange={(e) => setFirstName({...firstName, value: e.target.value})} onBlur={() => setFirstName({...firstName, isTouched: true})}  className="input mt-auto" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-full"><p className="ml-2 mt-1">Last Name<sup className="text-red-500">*</sup></p></label>
                                    <input name='last_name' value={lastName.value} onChange={(e) => setLastName({...lastName, value: e.target.value})} onBlur={() => setLastName({...lastName, isTouched: true})} className="input mt-auto" />
                                </div>
                            </div>
                            <div className="flex flex-row gap-20 justify-center items-center">
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Email<sup className="text-red-500">*</sup></p></label>
                                    <input
                                      name='email'
                                      value={email.value}
                                      onChange={(e) => { setEmail(prev => ({...prev, value: e.target.value, isValid: validateEmail(e.target.value) })); }}
                                      onBlur={() => setEmail(prev => ({ ...prev, isTouched: true }))}
                                      className="input mt-auto"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Phone</p></label>
                                    <input name='phone_number' value={phone} onChange={(e) => setPhone(e.target.value)} className="input mt-auto" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Company</p></label>
                                    <input name='company' value={company} onChange={(e) => setCompany(e.target.value)} className="input mt-auto" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Message</p></label>
                                <textarea name='message' value={message.value} onChange={(e) => setMessage({...message, value: e.target.value})} onBlur={() => setMessage({...message, isTouched: true})} className="input h-[150px] mt-auto resize-none" />
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
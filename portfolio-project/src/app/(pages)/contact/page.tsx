import React from "react";

const Page = () => {
    return (
        <div>
            <div>
                <div className="flex flex-row items-stretch justify-baseline">
                    <div className='w-full max-w-[800px] w-flex pt-5 pl-5 pr-5 pb-10'>
                        <h1 className="h1">CONTACT.</h1>
                        <p>Feel free to reach out whenever lmaoooo. I am going to continue to type here because I want to see how to wrap an element around correctly...</p>
                    </div>
                    <div>
                        <p>this is some more text to test out what im trying to do</p>
                    </div>
                </div>
                <div className="mr-70 ml-70 text-white flex flex-col justify-center mt-10 border border-gray-700 color-noisy-bg rounded-sm">
                    <div className="bg-stone-700 w-full items-center justify-center p-1 rounded-sm">
                        <h2 className="h2 text-white text-center">Contact Form</h2>
                    </div>
                    <div className="m-15 flex flex-col justify-center gap-5">
                        <div className="flex flex-row gap-20 justify-center items-center ">
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full"><p className="ml-2 mt-1">First Name<sup className="text-red-500">*</sup></p></label>
                                <input className="input mt-auto" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-full"><p className="ml-2 mt-1">Last Name<sup className="text-red-500">*</sup></p></label>
                                <input className="input mt-auto" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-20 justify-center items-center">
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Email<sup className="text-red-500">*</sup></p></label>
                                <input className="input mt-auto" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Phone<sup className="text-red-500">*</sup></p></label>
                                <input className="input mt-auto" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Company</p></label>
                                <input className="input mt-auto" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="bg-stone-700 whitespace-nowrap w-auto"><p className="ml-2 mt-1">Message</p></label>
                            <textarea className="input h-[150px] mt-auto resize-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
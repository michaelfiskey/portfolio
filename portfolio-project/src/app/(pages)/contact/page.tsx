import React from "react";

const Page = () => {
    return (
        <div className="m-20">
            <div>
                <div className="flex flex-row items-stretch justify-baseline">
                    <div className='w-full max-w-[800px] w-flex border border-gray-400 pt-5 pl-5 pr-5 pb-10'>
                        <h1 className="h1">CONTACT.</h1>
                        <p>Feel free to reach out whenever lmaoooo. I am going to continue to type here because I want to see how to wrap an element around correctly...</p>
                    </div>
                    <div>
                        <p>this is some more text to test out what im trying to do</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center mt-10 border border-gray-700">
                    <div className="bg-stone-700 w-full items-center justify-center p-1">
                        <h2 className="h2 text-white text-center">Contact Forum</h2>
                    </div>
                    <p className="m-5">Feel free to contact me whatever it may be!</p>
                    <div className="m-15 flex flex-col justify-center gap-5">
                        <div className="flex flex-row gap-20 justify-center items-center ">
                            <div className="flex flex-col w-full">
                                <label className="whitespace-nowrap w-full">First Name <sup className="text-red-500">*</sup></label>
                                <input className="input mt-auto" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="whitespace-nowrap w-full">Last Name <sup className="text-red-500">*</sup></label>
                                <input className="input mt-auto" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-20 justify-center items-center">
                            <div className="flex flex-col w-full">
                                <label className="whitespace-nowrap w-auto">Email <sup className="text-red-500">*</sup></label>
                                <input className="input mt-auto" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="whitespace-nowrap w-auto">Phone <sup className="text-red-500">*</sup></label>
                                <input className="input mt-auto" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="whitespace-nowrap w-auto">Company</label>
                                <input className="input mt-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
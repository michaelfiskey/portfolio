import React from "react";

const Page = () => {
    return (
        <div>
            <div className='w-full max-w-[1200px] w-flex pt-5 pl-5 pr-5 pb-10'>
                <h1 className="h1">SOCIAL MEDIA.</h1>
                <p>Here you&apos;ll be able to find a showcase of my social media projects!</p>
            </div>
            <div className="flex flex-row items-stretch justify-baseline">
                <div className="w-full max-w-[600px]">
                    <h2 className="text-stone-700">INTRODUCTION.</h2>
                    <p>In my sophomore year of college, I became the social media manager for my university&apos;s a cappella group, and that&apos;s when I really discovered my enthusiasm for social media and marketing. This experience helped me accomplish the following...</p>
                </div>
                <img src='/assets/images/intro.png' 
                    alt="Social media introduction showcase"
                    height={200}
                    width={400}
                    className="ml-5 mt-10 mb-5 shadow-lg"
                />
                <div>
                </div>
            </div>
        </div>
    )
}

export default Page;
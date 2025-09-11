'use client';
import React from "react";
import CardHolder from "@/app/components/CardHolder";
import ContentLoader from '@/app/components/spinners/ContentLoader';
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Page = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tiktokFollowerCount, setTiktokFollowerCount] = useState(0);
    const [instagramFollowerCount, setInstagramFollowerCount] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);



    useEffect(() => {
            // TEMP
            setIsLoading(true);
            setInstagramFollowerCount(31000);
            setTiktokFollowerCount(590000)
        const socialLinks = containerRef.current?.querySelectorAll('.social-link');

        if (socialLinks) {
            socialLinks.forEach((link) => {
                const img = link.querySelector('img');
                
                const handleMouseEnter = () => {
                    if (img) {
                        gsap.to(img, {
                            scale: 1.3,
                            rotation: 10,
                            duration: 0.3,
                            ease: "back.out(1.7)"
                        });
                    }
                };

                const handleMouseLeave = () => {
                    if (img) {
                        gsap.to(img, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: "back.out(1.7)"
                        });
                    }
                };

                link.addEventListener('mouseenter', handleMouseEnter);
                link.addEventListener('mouseleave', handleMouseLeave);

                // Cleanup
                return () => {
                    link.removeEventListener('mouseenter', handleMouseEnter);
                    link.removeEventListener('mouseleave', handleMouseLeave);
                };
            });
        }
    }, []);


    
    useGSAP(() => {
        // page fade-in effect
        const page = pageRef.current;
        gsap.fromTo(page, {
        opacity: 0
        }, {
        opacity: 1,
        duration: 2
        });
    });
    
    return (

            <div ref={pageRef} className="page-container">
                <div className="mt-5 mb-12 sm:ml-0 text-center sm:text-left">
                    <h1 className="h1 ">SOCIAL MEDIA.</h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-300 mx-auto sm:ml-5 mt-2"></div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-8 sm:p-8 shadow-2xl sm:m-0 -m-1">
                    <div ref={containerRef} className="text-center mb-8">
                        <h2 className="h2 !font-bold">FUNDAMENTALLY SOUND</h2>
                        <div className="flex flex-row justify-center items-center gap-2 mb-3 pl-5">
                            <a href='https://tiktok.com/@fsacappella' target="_blank" rel="noopener noreferrer" className="social-link"><img src='/assets/images/social-media-images/tiktok-logo.webp' className="w-12 h-12"></img></a>
                            <a href='https://instagram.com/fsacappella' target="_blank" rel="noopener noreferrer" className="social-link"><img src='/assets/images/social-media-images/instagram-logo.png' className="w-23 h-23"></img></a>
                        </div>
                        <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-2">
                            During my sophomore year, I became the Social Media Manager for my college&apos;s a cappella group, 
                            and that&apos;s when I discovered my enthusiasm for content creation. 
                            I grew our TikTok platform from <b>300</b> to <b>{tiktokFollowerCount} </b>  
                            and Instagram to <b>{instagramFollowerCount}</b> and reaching <b>~160 million</b> total views across platforms, all in the span of 8 months.
                        </p>
                        <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-5">
                            Our success has opened doors to exciting collaborations with renowned brands like 
                            HoYoverse&apos;s Genshin Impact and Men&apos;s Wearhouse, as well as the opportunity to open 
                            for a The Kid LAROI concert!
                        </p>
                        <div className="bg-stone-200 backdrop-blur-sm border border-stone-200 rounded-sm p-6 shadow-lg">
                            <CardHolder className="flex flex-wrap gap-6 items-stretch w-full mb-7">
                                {isLoading ?(
                                    <div>
                                        <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                        <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                        <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                    </div>
                                ) : ( 
                                    <div></div>
                                )}
                            </CardHolder>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <h2 className="h2 !font-bold  mb-3">TikTok</h2>
                        <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-5">
                        I took what I learned from being a Social Media Manager and worked as a TikTok content creator for various brands. I produced <b>400+</b> short-form videos, achieving
                        <b> 1+ million</b> views on <b>10+</b> campaigns. I was also ranked top 10% of creators from July - August 2023.
                        </p>
                        <div className="bg-stone-200 backdrop-blur-sm border border-stone-200 rounded-sm p-6 shadow-lg">
                            <CardHolder className="flex flex-wrap gap-6 items-stretch w-full mb-7">
                                {isLoading ?(
                                    <div>
                                        <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                        <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                        <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                    </div>
                                ) : ( 
                                    <div></div>
                                )}
                            </CardHolder>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Page;
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
            setIsLoading(true);
        const socialLinks = containerRef.current?.querySelectorAll('.social-link');

        if (socialLinks) {
            socialLinks.forEach((link) => {
                const img = link.querySelector('img');
                
                const handleMouseEnter = () => {
                    if (img) {
                        gsap.to(img, {
                            scale: 1.2,
                            rotation: 5,
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
                <div className="mt-5 mb-12 md:ml-0 text-center md:text-left">
                    <h1 className="h1 ">SOCIAL MEDIA.</h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto md:ml-5 mt-2"></div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-8 md:p-8 shadow-2xl md:m-0 -m-1">
                    <div ref={containerRef} className="text-center mb-8">
                        <h2 className="h2 !font-bold !from-pink-500 !to-rose-500 mb-8">FUNDAMENTALLY SOUND</h2>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 px-4">
                            <div className="border border-stone-200 rounded-2xl shadow-lg p-8 min-w-[280px] flex-1 max-w-[350px]">
                                <div className="flex flex-col items-center space-y-4">
                                    <a href='https://tiktok.com/@fsacappella' target="_blank" rel="noopener noreferrer" className="social-link">
                                        <img src='/assets/images/social-media-images/tiktok-logo.webp' className="w-16 h-16 md:w-20 md:h-20" alt="TikTok" />
                                    </a>
                                    <div className="text-center">
                                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">615K</h1>
                                        <h3 className="text-lg font-semibold text-stone-600">Followers</h3>
                                        <p className="text-sm text-stone-500 mt-2">TikTok Platform</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-stone-200 rounded-2xl shadow-lg p-8 min-w-[280px] flex-1 max-w-[350px]">
                                <div className="flex flex-col items-center space-y-4">
                                    <a href='https://instagram.com/fsacappella' target="_blank" rel="noopener noreferrer" className="social-link">
                                        <img src='/assets/images/social-media-images/instagram-logo.png' className="w-16 h-16 md:w-20 md:h-20" alt="Instagram" />
                                    </a>
                                    <div className="text-center">
                                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">33K</h1>
                                        <h3 className="text-lg font-semibold text-stone-600">Followers</h3>
                                        <p className="text-sm text-stone-500 mt-2">Instagram Platform</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-stone-600 text-lg max-w-5xl mx-auto mb-2 leading-relaxed">
                            During my sophomore year, I became the Social Media Manager for my college&apos;s a cappella group, 
                            and that&apos;s when I discovered my passion for content creation. 
                            I grew our TikTok platform from <span className="font-bold text-pink-600">300</span> to <span className="font-bold text-pink-600">615K+ </span> followers  
                            and Instagram to <span className="font-bold text-pink-600">33K+</span>, reaching <span className="font-bold text-pink-600">160M+</span> total views across both platforms in just 8 months.
                        </p>
                        <p className="text-stone-600 text-lg max-w-5xl mx-auto mb-6 leading-relaxed">
                            Our success opened doors to exciting collaborations with renowned brands like 
                            <b> HoYoverse&apos;s Genshin Impact</b> and <b>Men&apos;s Wearhouse</b>, as well as the opportunity to open 
                            for a <b>The Kid LAROI</b> concert!
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
                                    <div className="flex flex-wrap">
                                        <blockquote 
                                            className="tiktok-embed flex-1" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7189829641840889131" 
                                            data-video-id="7189829641840889131" 
                                            style={{ maxWidth: 350, minWidth: 350, minHeight: 600, maxHeight: 600 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> pitch perfect riff off irl with @pitchesandnotes 🤭 
                                                <a target="_blank" title="♬ Flashlight - From &#34;Pitch Perfect 2&#34; Soundtrack - Jessie J" href="https://www.tiktok.com/music/Flashlight-From-Pitch-Perfect-2-Soundtrack-6935862050258159618?refer=embed">♬ Flashlight - From &#34;Pitch Perfect 2&#34; Soundtrack - Jessie J</a> 
                                            </section> 
                                        </blockquote>                                         
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7226207962421841195" 
                                            data-video-id="7226207962421841195" 
                                            style={{ maxWidth: 350, minWidth: 350, minHeight: 600, maxHeight: 600 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> paper buckles go hard 🔥 @edmondx 
                                                <a target="_blank" title="♬ original sound - edmondx" href="https://www.tiktok.com/music/original-sound-7222028724672432942?refer=embed">♬ original sound - edmondx</a> 
                                            </section> 
                                        </blockquote>                                         
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7176864808942193966" 
                                            data-video-id="7176864808942193966" 
                                            style={{ maxWidth: 350, minWidth: 350, minHeight: 600, maxHeight: 600 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> aca-broke his back 
                                                <a target="_blank" title="♬ HOTDAWG - Take45" href="https://www.tiktok.com/music/HOTDAWG-7162198290975427374?refer=embed">♬ HOTDAWG - Take45</a> 
                                            </section> 
                                        </blockquote>
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7219517118755228971" 
                                            data-video-id="7219517118755228971" 
                                            style={{ maxWidth: 350, minWidth: 350, minHeight: 600, maxHeight: 600 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> Thank you so much for the opportunity!  
                                                <a target="_blank" title="♬ LOVE AGAIN - The Kid LAROI" href="https://www.tiktok.com/music/LOVE-AGAIN-7191887368537393153?refer=embed">♬ LOVE AGAIN - The Kid LAROI</a> 
                                            </section> 
                                        </blockquote>                                         
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7195043011745598766" 
                                            data-video-id="7195043011745598766" 
                                            style={{ maxWidth: 350, minWidth: 350, minHeight: 600, maxHeight: 600 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> i dont wanna taco bout it 😔🌮 
                                                <a target="_blank" title="♬ Whatcha Say (Sped Up Beat) - Mr Kleb Balasa" href="https://www.tiktok.com/music/Whatcha-Say-Sped-Up-Beat-7115811196837612293?refer=embed">♬ Whatcha Say (Sped Up Beat) - Mr Kleb Balasa</a> 
                                            </section> 
                                        </blockquote> 
                                        <script async src="https://www.tiktok.com/embed.js"></script>
                                    </div>
                                )}
                            </CardHolder>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <h2 className="h2 !font-bold  !from-pink-500 !to-rose-500 mb-3">TikTok</h2>
                        <p className="text-stone-600 text-lg max-w-5xl mx-auto mb-5">
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
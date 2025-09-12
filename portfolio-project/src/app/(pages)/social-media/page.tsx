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
                        <p className="text-stone-600 text-lg max-w-5xl mx-auto mb-2">
                            During my sophomore year, I became the Social Media Manager for my college&apos;s a cappella group, 
                            and that&apos;s when I discovered my enthusiasm for content creation. 
                            I grew our TikTok platform from <b>300</b> to <b>{tiktokFollowerCount} </b>  
                            and Instagram to <b>{instagramFollowerCount}</b> and reaching <b>~160 million</b> total views across platforms, all in the span of 8 months.
                        </p>
                        <p className="text-stone-600 text-lg max-w-5xl mx-auto mb-5">
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
                                    <div className="flex flex-wrap">
                                        <blockquote 
                                            className="tiktok-embed flex-1" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7189829641840889131" 
                                            data-video-id="7189829641840889131" 
                                            style={{ maxWidth: 605, minWidth: 325 }}> 
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> pitch perfect riff off irl with @pitchesandnotes 🤭 
                                                <a title="pitchperfect" target="_blank" href="https://www.tiktok.com/tag/pitchperfect?refer=embed">#pitchperfect</a> 
                                                <a title="riffoff" target="_blank" href="https://www.tiktok.com/tag/riffoff?refer=embed">#riffoff</a> 
                                                <a title="fsacappella" target="_blank" href="https://www.tiktok.com/tag/fsacappella?refer=embed">#fsacappella</a> 
                                                <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> 
                                                <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou?refer=embed">#foryou</a> 
                                                <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> 
                                                <a title="acappella" target="_blank" href="https://www.tiktok.com/tag/acappella?refer=embed">#acappella</a> 
                                                <a title="beatbox" target="_blank" href="https://www.tiktok.com/tag/beatbox?refer=embed">#beatbox</a> 
                                                <a title="uwmadison" target="_blank" href="https://www.tiktok.com/tag/uwmadison?refer=embed">#uwmadison</a> 
                                                <a title="uw" target="_blank" href="https://www.tiktok.com/tag/uw?refer=embed">#uw</a> 
                                                <a title="madison" target="_blank" href="https://www.tiktok.com/tag/madison?refer=embed">#madison</a> 
                                                <a title="wisconsin" target="_blank" href="https://www.tiktok.com/tag/wisconsin?refer=embed">#wisconsin</a> 
                                                <a title="icca" target="_blank" href="https://www.tiktok.com/tag/icca?refer=embed">#icca</a> 
                                                <a title="sing" target="_blank" href="https://www.tiktok.com/tag/sing?refer=embed">#sing</a> 
                                                <a title="singing" target="_blank" href="https://www.tiktok.com/tag/singing?refer=embed">#singing</a> 
                                                <a title="music" target="_blank" href="https://www.tiktok.com/tag/music?refer=embed">#music</a> 
                                                <a target="_blank" title="♬ Flashlight - From &#34;Pitch Perfect 2&#34; Soundtrack - Jessie J" href="https://www.tiktok.com/music/Flashlight-From-Pitch-Perfect-2-Soundtrack-6935862050258159618?refer=embed">♬ Flashlight - From &#34;Pitch Perfect 2&#34; Soundtrack - Jessie J</a> 
                                            </section> 
                                        </blockquote> 
                                        <script async src="https://www.tiktok.com/embed.js"></script>
                                        
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7226207962421841195" 
                                            data-video-id="7226207962421841195" 
                                            style={{ maxWidth: 605, minWidth: 325 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> paper buckles go hard 🔥 @edmondx 
                                                <a title="voiceeffects" target="_blank" href="https://www.tiktok.com/tag/voiceeffects?refer=embed">#voiceeffects</a> 
                                                <a title="fsacappella" target="_blank" href="https://www.tiktok.com/tag/fsacappella?refer=embed">#fsacappella</a> 
                                                <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> 
                                                <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou?refer=embed">#foryou</a> 
                                                <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> 
                                                <a title="acappella" target="_blank" href="https://www.tiktok.com/tag/acappella?refer=embed">#acappella</a> 
                                                <a title="beatbox" target="_blank" href="https://www.tiktok.com/tag/beatbox?refer=embed">#beatbox</a> 
                                                <a title="uwmadison" target="_blank" href="https://www.tiktok.com/tag/uwmadison?refer=embed">#uwmadison</a> 
                                                <a title="uw" target="_blank" href="https://www.tiktok.com/tag/uw?refer=embed">#uw</a> 
                                                <a title="madison" target="_blank" href="https://www.tiktok.com/tag/madison?refer=embed">#madison</a> 
                                                <a title="wisconsin" target="_blank" href="https://www.tiktok.com/tag/wisconsin?refer=embed">#wisconsin</a> 
                                                <a title="pitchperfect" target="_blank" href="https://www.tiktok.com/tag/pitchperfect?refer=embed">#pitchperfect</a> 
                                                <a title="icca" target="_blank" href="https://www.tiktok.com/tag/icca?refer=embed">#icca</a> 
                                                <a title="sing" target="_blank" href="https://www.tiktok.com/tag/sing?refer=embed">#sing</a> 
                                                <a title="singing" target="_blank" href="https://www.tiktok.com/tag/singing?refer=embed">#singing</a> 
                                                <a title="music" target="_blank" href="https://www.tiktok.com/tag/music?refer=embed">#music</a> 
                                                <a title="12bucklemyshoe" target="_blank" href="https://www.tiktok.com/tag/12bucklemyshoe?refer=embed">#12bucklemyshoe</a> 
                                                <a title="bucklemyshoe" target="_blank" href="https://www.tiktok.com/tag/bucklemyshoe?refer=embed">#bucklemyshoe</a> 
                                                <a target="_blank" title="♬ original sound - edmondx" href="https://www.tiktok.com/music/original-sound-7222028724672432942?refer=embed">♬ original sound - edmondx</a> 
                                            </section> 
                                        </blockquote> 
                                        <script async src="https://www.tiktok.com/embed.js"></script>
                                        
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7176864808942193966" 
                                            data-video-id="7176864808942193966" 
                                            style={{ maxWidth: 605, minWidth: 325 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> aca-broke his back 
                                                <a title="sturdy" target="_blank" href="https://www.tiktok.com/tag/sturdy?refer=embed">#sturdy</a> 
                                                <a title="hotdawg" target="_blank" href="https://www.tiktok.com/tag/hotdawg?refer=embed">#hotdawg</a>  
                                                <a title="fsacappella" target="_blank" href="https://www.tiktok.com/tag/fsacappella?refer=embed">#fsacappella</a> 
                                                <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> 
                                                <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou?refer=embed">#foryou</a> 
                                                <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> 
                                                <a title="acappella" target="_blank" href="https://www.tiktok.com/tag/acappella?refer=embed">#acappella</a> 
                                                <a title="beatbox" target="_blank" href="https://www.tiktok.com/tag/beatbox?refer=embed">#beatbox</a> 
                                                <a title="uwmadison" target="_blank" href="https://www.tiktok.com/tag/uwmadison?refer=embed">#uwmadison</a> 
                                                <a title="uw" target="_blank" href="https://www.tiktok.com/tag/uw?refer=embed">#uw</a> 
                                                <a title="madison" target="_blank" href="https://www.tiktok.com/tag/madison?refer=embed">#madison</a> 
                                                <a title="wisconsin" target="_blank" href="https://www.tiktok.com/tag/wisconsin?refer=embed">#wisconsin</a> 
                                                <a title="pitchperfect" target="_blank" href="https://www.tiktok.com/tag/pitchperfect?refer=embed">#pitchperfect</a> 
                                                <a title="icca" target="_blank" href="https://www.tiktok.com/tag/icca?refer=embed">#icca</a> 
                                                <a title="sing" target="_blank" href="https://www.tiktok.com/tag/sing?refer=embed">#sing</a> 
                                                <a title="singing" target="_blank" href="https://www.tiktok.com/tag/singing?refer=embed">#singing</a> 
                                                <a title="music" target="_blank" href="https://www.tiktok.com/tag/music?refer=embed">#music</a> 
                                                <a target="_blank" title="♬ HOTDAWG - Take45" href="https://www.tiktok.com/music/HOTDAWG-7162198290975427374?refer=embed">♬ HOTDAWG - Take45</a> 
                                            </section> 
                                        </blockquote> 
                                        <script async src="https://www.tiktok.com/embed.js"></script>
                                        
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7219517118755228971" 
                                            data-video-id="7219517118755228971" 
                                            style={{ maxWidth: 605, minWidth: 325 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> Thank you so much for the opportunity!  
                                                <a title="bleed4youtour" target="_blank" href="https://www.tiktok.com/tag/bleed4youtour?refer=embed">#bleed4youtour</a> 
                                                <a title="thekidlaroi" target="_blank" href="https://www.tiktok.com/tag/thekidlaroi?refer=embed">#thekidlaroi</a> 
                                                <a title="fsacappella" target="_blank" href="https://www.tiktok.com/tag/fsacappella?refer=embed">#fsacappella</a> 
                                                <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> 
                                                <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou?refer=embed">#foryou</a> 
                                                <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> 
                                                <a title="acappella" target="_blank" href="https://www.tiktok.com/tag/acappella?refer=embed">#acappella</a> 
                                                <a title="beatbox" target="_blank" href="https://www.tiktok.com/tag/beatbox?refer=embed">#beatbox</a> 
                                                <a title="uwmadison" target="_blank" href="https://www.tiktok.com/tag/uwmadison?refer=embed">#uwmadison</a> 
                                                <a title="uw" target="_blank" href="https://www.tiktok.com/tag/uw?refer=embed">#uw</a> 
                                                <a title="madison" target="_blank" href="https://www.tiktok.com/tag/madison?refer=embed">#madison</a> 
                                                <a title="wisconsin" target="_blank" href="https://www.tiktok.com/tag/wisconsin?refer=embed">#wisconsin</a> 
                                                <a title="pitchperfect" target="_blank" href="https://www.tiktok.com/tag/pitchperfect?refer=embed">#pitchperfect</a> 
                                                <a title="icca" target="_blank" href="https://www.tiktok.com/tag/icca?refer=embed">#icca</a> 
                                                <a title="sing" target="_blank" href="https://www.tiktok.com/tag/sing?refer=embed">#sing</a> 
                                                <a title="singing" target="_blank" href="https://www.tiktok.com/tag/singing?refer=embed">#singing</a> 
                                                <a title="music" target="_blank" href="https://www.tiktok.com/tag/music?refer=embed">#music</a> 
                                                <a target="_blank" title="♬ LOVE AGAIN - The Kid LAROI" href="https://www.tiktok.com/music/LOVE-AGAIN-7191887368537393153?refer=embed">♬ LOVE AGAIN - The Kid LAROI</a> 
                                            </section> 
                                        </blockquote> 
                                        <script async src="https://www.tiktok.com/embed.js"></script>
                                        
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@fsacappella/video/7195043011745598766" 
                                            data-video-id="7195043011745598766" 
                                            style={{ maxWidth: 605, minWidth: 325 }}>
                                            <section> 
                                                <a target="_blank" title="@fsacappella" href="https://www.tiktok.com/@fsacappella?refer=embed">@fsacappella</a> i dont wanna taco bout it 😔🌮 
                                                <a title="tacotuesday" target="_blank" href="https://www.tiktok.com/tag/tacotuesday?refer=embed">#tacotuesday</a> 
                                                <a title="fsacappella" target="_blank" href="https://www.tiktok.com/tag/fsacappella?refer=embed">#fsacappella</a> 
                                                <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> 
                                                <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou?refer=embed">#foryou</a> 
                                                <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> 
                                                <a title="acappella" target="_blank" href="https://www.tiktok.com/tag/acappella?refer=embed">#acappella</a> 
                                                <a title="beatbox" target="_blank" href="https://www.tiktok.com/tag/beatbox?refer=embed">#beatbox</a> 
                                                <a title="uwmadison" target="_blank" href="https://www.tiktok.com/tag/uwmadison?refer=embed">#uwmadison</a> 
                                                <a title="uw" target="_blank" href="https://www.tiktok.com/tag/uw?refer=embed">#uw</a> 
                                                <a title="madison" target="_blank" href="https://www.tiktok.com/tag/madison?refer=embed">#madison</a> 
                                                <a title="wisconsin" target="_blank" href="https://www.tiktok.com/tag/wisconsin?refer=embed">#wisconsin</a> 
                                                <a title="pitchperfect" target="_blank" href="https://www.tiktok.com/tag/pitchperfect?refer=embed">#pitchperfect</a> 
                                                <a title="icca" target="_blank" href="https://www.tiktok.com/tag/icca?refer=embed">#icca</a> 
                                                <a title="sing" target="_blank" href="https://www.tiktok.com/tag/sing?refer=embed">#sing</a> 
                                                <a title="singing" target="_blank" href="https://www.tiktok.com/tag/singing?refer=embed">#singing</a> 
                                                <a title="music" target="_blank" href="https://www.tiktok.com/tag/music?refer=embed">#music</a> 
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
                        <h2 className="h2 !font-bold  mb-3">TikTok</h2>
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
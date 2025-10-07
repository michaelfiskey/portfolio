'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Socialsbar = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-stone-700 py-3 px-5 rounded-lg shadow-lg" ref={containerRef}>
            <div className="flex flex-row gap-5">
                <a href='https://github.com/michaelfiskey' target="_blank" rel="noopener noreferrer" className="social-link">
                    <img 
                        src='/assets/images/social-bar-images/github-logo.png' 
                        alt="GitHub" 
                        className="w-6 h-6 cursor-pointer" 
                    />
                </a>
                <a href='https://linkedin.com/in/michaelfiskey' target="_blank" rel="noopener noreferrer" className="social-link">
                    <img 
                        src='/assets/images/social-bar-images/linkedin-logo.webp' 
                        alt="Linkedin" 
                        className="mt-0.5 w-5 h-5 cursor-pointer" 
                    />
                </a>
            </div>
        </div>
    )
}
export default Socialsbar;
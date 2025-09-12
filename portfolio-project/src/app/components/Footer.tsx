import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='bg-stone-700 text-stone-100 py-8 px-6'>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold font-[family-name:var(--font-bebas-neue)] mb-1">
                            Michael Fiskey
                        </h3>
                        <p className="text-stone-300 text-sm">
                            Fullstack Developer & Data Enthusiast
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-stone-300 text-sm">Connect with me</p>
                        <div className="flex gap-4">
                            <a 
                                href='https://github.com/michaelfiskey' 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group transition-transform hover:scale-110"
                            >
                                <img 
                                    src='/assets/images/social-bar-images/github-logo.png' 
                                    alt="GitHub" 
                                    className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                            </a>
                            <a 
                                href='https://linkedin.com/in/michaelfiskey' 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group transition-transform hover:scale-110"
                            >
                                <img 
                                    src='/assets/images/social-bar-images/linkedin-logo.webp' 
                                    alt="LinkedIn" 
                                    className="w-5 h-5 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                            </a>
                            <a 
                                href='https://tiktok.com/@michaelfiskey' 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group transition-transform hover:scale-110"
                            >
                                <img 
                                    src='/assets/images/social-bar-images/tiktok-logo.webp' 
                                    alt="TikTok" 
                                    className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                            </a>
                            <a 
                                href='https://instagram.com/michaelfiskey' 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group transition-transform hover:scale-110"
                            >
                                <img 
                                    src='/assets/images/social-bar-images/instagram-logo.png' 
                                    alt="Instagram" 
                                    className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                            </a>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-stone-300 text-sm mb-3">
                            Interested in working together?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-end">
                            <a 
                                href="https://docs.google.com/document/d/1YkH3DPY-C7cLWiCbPGgnZUkPgUM4-wF6hh0B6oxeImo/edit?usp=sharing"
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block px-4 py-2 border-2 border-stone-300 text-stone-300 text-sm font-semibold rounded-sm hover:bg-stone-300 hover:text-stone-700 transform hover:scale-105 transition-all duration-300"
                            >
                                Download Resume
                            </a>
                            <Link 
                                href="/contact"
                                className="inline-block px-4 py-2 bg-gradient-to-r from-red-400 to-rose-300 text-white text-sm font-semibold rounded-sm hover:from-red-500 hover:to-rose-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                Contact Me
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-stone-600 mt-6 pt-4 text-center">
                    <p className="text-stone-400 text-xs">
                        © {new Date().getFullYear()} Michael Fiskey. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // background scroll effect
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll)

    }, [])

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-warm-50/92 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
            <div className='max-w-5xl mx-auto flex flex-col px-10 py-5 items-center mt-5 gap-y-4 md:mt-0 md:px-24 md:flex-row md:justify-between '>
                <Link to={{pathname: '/'}} className='font-[Marcellus] text-warm-925 text-lg tracking-wide whitespace-nowrap'>Michael Fiskey</Link>
                <div className='md:flex md:items-center md:flex-1 md:ml-10'>
                    <div className='px-10 flex flex-wrap justify-center gap-x-6 gap-y-2 md:flex-nowrap md:gap-5 md:items-center md:flex-1 md:ml-10 text-sm text-warm-800 tracking-wide'>
                        <Link to={{ pathname: "/", hash: "#about"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">About</Link>
                        <Link to={{ pathname: "/", hash: "#education"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Education</Link>
                        <Link to={{ pathname: "/", hash: "#experience"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Experience</Link>
                        <Link to={{ pathname: "/", hash: "#projects"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Projects</Link>
                        <Link to={{ pathname: "/", hash: "#contact"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Contact</Link>
                        <Link to={{ pathname: "/login"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Login</Link>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-3 text-warm-450 ml-auto">
                        <a
                            href="https://github.com/michaelfiskey"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="hover:text-warm-600 hover:scale-110 hover:transition-all transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.8 3.44 22.3 8.21 23.89C8.81 24 9.03 23.63 9.03 23.31C9.03 23.03 9.02 22.09 9.02 21.09C5.67 21.82 4.97 19.67 4.97 19.67C4.42 18.27 3.63 17.9 3.63 17.9C2.55 17.16 3.71 17.18 3.71 17.18C4.9 17.26 5.53 18.41 5.53 18.41C6.59 20.23 8.3 19.7 8.98 19.39C9.09 18.62 9.39 18.09 9.72 17.79C7.05 17.49 4.24 16.45 4.24 11.81C4.24 10.49 4.71 9.42 5.48 8.58C5.35 8.28 4.95 7.06 5.6 5.41C5.6 5.41 6.62 5.09 8.99 6.69C9.97 6.42 11.01 6.29 12.05 6.29C13.09 6.29 14.13 6.42 15.11 6.69C17.48 5.09 18.5 5.41 18.5 5.41C19.15 7.06 18.75 8.28 18.62 8.58C19.39 9.42 19.86 10.49 19.86 11.81C19.86 16.46 17.05 17.49 14.37 17.78C14.79 18.15 15.16 18.87 15.16 19.97C15.16 21.54 15.15 22.81 15.15 23.31C15.15 23.63 15.37 24.01 15.98 23.89C20.76 22.3 24.2 17.8 24.2 12.5C24.2 5.87 18.83 0.5 12.2 0.5H12Z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/michaelfiskey/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="hover:text-warm-600 hover:scale-110 hover:transition-all transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                <path d="M22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.27C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225ZM7.119 20.452H3.555V9H7.119V20.452ZM5.337 7.433C4.198 7.433 3.275 6.509 3.275 5.37C3.275 4.231 4.198 3.308 5.337 3.308C6.476 3.308 7.4 4.231 7.4 5.37C7.4 6.509 6.477 7.433 5.337 7.433ZM20.452 20.452H16.893V14.88C16.893 13.552 16.867 11.846 15.043 11.846C13.191 11.846 12.907 13.292 12.907 14.784V20.452H9.351V9H12.764V10.561H12.811C13.285 9.661 14.443 8.711 16.173 8.711C19.771 8.711 20.452 11.08 20.452 14.167V20.452Z" />
                            </svg>
                        </a>
                    </div>
                    </div>
            </div>     
        </nav>
    )
}
export default Navbar;
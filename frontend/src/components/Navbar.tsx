
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuthContext } from '../hooks/useAuthContext';
import { ROUTES } from "../constants/routes";
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { isLoggedIn, logout } = useAuthContext();

    useEffect(() => {
        // background scroll effect
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll)

    }, [])

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-warm-50/92 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
            <div className='max-w-5xl mx-auto flex flex-col px-10 py-5 items-center mt-5 gap-y-4 lg:mt-0 lg:px-24 lg:flex-row lg:justify-between '>
                <Link to={{pathname: '/'}} className='font-[Marcellus] text-warm-925 text-lg tracking-wide whitespace-nowrap'>Michael Fiskey</Link>
                <div className='lg:flex lg:items-center lg:flex-1 lg:ml-10'>
                    <div className='px-10 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:flex-nowrap lg:gap-5 lg:items-center lg:flex-1 lg:ml-10 text-sm text-warm-800 tracking-wide'>
                        <Link to={{ pathname: ROUTES.ROOT, hash: "#about"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">About</Link>
                        <Link to={{ pathname: ROUTES.ROOT, hash: "#experience"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Experience</Link>
                        <Link to={{ pathname: ROUTES.ROOT, hash: "#education"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Education</Link>
                        <Link to={{ pathname: ROUTES.ROOT, hash: "#projects"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Projects</Link>
                        <Link to={{ pathname: ROUTES.ROOT, hash: "#contact"}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Contact</Link>
                        {!isLoggedIn && <Link to={{ pathname: ROUTES.AUTH.LOGIN_PATH}} className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all">Login</Link>}
                        {isLoggedIn && (
                            <button
                                onClick={logout}
                                className="hover:text-warm-900 transition-colors hover:scale-105 hover:transition-all bg-transparent border-none cursor-pointer"
                                style={{ background: 'none', border: 'none', padding: 0 }}
                            >
                                Logout
                            </button>
                        )}
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
                    <a
                        href="https://app.joinhandshake.com/profiles/michaelfiskey"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Handshake"
                        className="hover:text-warm-600 hover:scale-110 hover:transition-all transition-colors"                    
                    >
                        <svg
                            viewBox="0 0 512 512"
                            className="h-5 w-5 fill-current"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <g>
                                <path d="M255.366,141.046c-7.4,3.583-14.732,8.548-21.533,15.357c-34.091,34.098-65.081,65.088-65.081,65.088
                                l0.013,0.02c-0.185,0.186-0.371,0.338-0.557,0.53c-8.824,8.831-9.174,22.909-1.025,32.146c0.323,0.371,0.668,0.736,1.025,1.086
                                c9.161,9.174,24.036,9.196,33.232,0l35.797-35.797c6.176,2.263,12.248,3.583,18.074,4.243c7.937,0.88,15.392,0.55,22.022-0.385
                                c16.162-2.29,14.47-1.623,23.844-4.704c9.353-3.068,19.862-9.354,19.862-9.354l6.362,6.355
                                c0.701,0.681,16.919,16.925,25.192,25.185c1.465,1.471,2.709,2.682,3.542,3.549c0.956,0.997,2.022,1.719,2.682,2.682l41.278,41.279
                                c11.898-13.35,25.488-33.232,23.81-56.058L320.763,129.14C320.763,129.14,285.062,126.589,255.366,141.046z"/>
                                <path d="M261.115,394.362c-9.134-9.147-23.961-9.147-33.101,0l-6.794,6.794c9.119-9.132,9.112-23.926-0.021-33.066
                                c-9.14-9.126-23.947-9.126-33.087,0.007c9.14-9.133,9.14-23.94,0-33.087c-9.133-9.148-23.947-9.133-33.087,0
                                c9.14-9.133,9.14-23.947,0-33.095c-9.134-9.132-23.947-9.132-33.088,0.014l-20.46,20.453c-9.14,9.147-9.14,23.947,0,33.094
                                c9.133,9.134,23.941,9.134,33.08,0c-9.14,9.134-9.14,23.947,0,33.087c9.147,9.133,23.954,9.133,33.094,0
                                c-9.14,9.133-9.14,23.941,0,33.088c9.14,9.133,23.947,9.133,33.088,0l6.802-6.809c-9.119,9.147-9.113,23.94,0.02,33.081
                                c9.14,9.132,23.947,9.132,33.088,0l20.467-20.468C270.248,418.302,270.248,403.495,261.115,394.362z"/>
                                <path d="M507.987,178.28L387.543,57.822c-5.351-5.337-14.002-5.337-19.339,0l-38.631,38.63
                                c-5.337,5.337-5.337,13.989,0,19.333l120.458,120.451c5.33,5.35,13.996,5.35,19.326,0l38.63-38.638
                                C513.338,192.276,513.338,183.624,507.987,178.28z M473.655,204.992c-5.75,5.736-15.048,5.736-20.777,0
                                c-5.735-5.743-5.735-15.041,0-20.777c5.729-5.736,15.027-5.736,20.777,0C479.391,189.951,479.384,199.249,473.655,204.992z"/>
                                <path d="M182.417,99.864l-38.624-38.63c-5.336-5.337-13.995-5.337-19.332,0L4.003,181.691
                                c-5.337,5.323-5.337,13.989,0,19.319l38.631,38.644c5.33,5.331,14.002,5.331,19.325,0l120.458-120.458
                                C187.761,113.859,187.761,105.207,182.417,99.864z M59.118,208.403c-5.736,5.729-15.04,5.729-20.777,0
                                c-5.735-5.742-5.735-15.041,0-20.777c5.736-5.735,15.041-5.735,20.777,0C64.854,193.362,64.854,202.66,59.118,208.403z"/>
                                <path d="M397.528,312.809l-7.468-7.482l-72.509-72.509l-4.883,2.166l-5.316,1.919l-0.384,0.117
                                c-0.936,0.296-9.684,2.971-26.932,5.412c-9.12,1.273-18.156,1.431-26.904,0.434c-3.459-0.385-6.898-0.95-10.296-1.692
                                l-27.757,27.744c-16.678,16.678-43.836,16.678-60.514,0c-0.585-0.591-1.149-1.19-1.671-1.781l-0.179-0.2
                                c-10.529-11.939-13.204-28.28-8.252-42.461l10.673-16.609l-0.02-0.02l65.081-65.074c2.647-2.641,5.426-5.103,8.314-7.428
                                c-20.281-3.982-37.296-2.806-37.296-2.806L88.093,235.679c-1.389,18.988,11.651,39.799,20.928,51.952
                                c16.692-15.963,43.239-15.756,59.641,0.654c6.107,6.1,9.952,13.617,11.574,21.498c7.895,1.637,15.406,5.475,21.513,11.582
                                c6.107,6.114,9.952,13.631,11.575,21.519c7.888,1.623,15.412,5.46,21.513,11.568c4.078,4.078,7.152,8.783,9.222,13.817
                                c11.1-0.137,22.242,4.016,30.688,12.455c16.65,16.636,16.643,43.733,0,60.363l-6.809,6.822l3.411,3.412
                                c9.148,9.147,23.954,9.147,33.095,0c9.14-9.134,9.14-23.947,0-33.088l6.808,6.83c9.147,9.133,23.947,9.133,33.087,0
                                c9.14-9.147,9.147-23.954,0-33.101c9.147,9.147,23.947,9.147,33.087,0c9.134-9.126,9.154-23.94,0-33.088
                                c9.154,9.148,23.954,9.148,33.088,0c9.147-9.132,9.147-23.947,0-33.08L397.528,312.809z"/>
                            </g>
                            </svg>
                        
                    </a>
                </div>
                </div>
            </div>     
        </nav>
    )
}
export default Navbar;
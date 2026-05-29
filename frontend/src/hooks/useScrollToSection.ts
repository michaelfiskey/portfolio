import { useEffect } from 'react'
import { useLocation } from 'react-router'

function useScrollToSection() {
    const { hash, pathname, key } = useLocation()

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        const element = document.querySelector(hash)
        if (!element) return
        const navHeight = document.querySelector('nav')?.offsetHeight ?? 0
        const top = element.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
    }, [hash, pathname, key])
}
export default useScrollToSection;
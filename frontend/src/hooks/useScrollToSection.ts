import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useIsMobile } from './useIsMobile'

function useScrollToSection() {
    const { hash, pathname } = useLocation()
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        const element = document.querySelector(hash)
        if (!element) return
        const top = element.getBoundingClientRect().top + window.scrollY - (isMobile ? 150 : 0)
        window.scrollTo({ top, behavior: 'smooth' })
    }, [hash, pathname, isMobile])
}
export default useScrollToSection;
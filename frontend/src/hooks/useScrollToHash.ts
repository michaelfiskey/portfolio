import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useIsMobile } from './useIsMobile'

function useScrollToHash() {
    const { hash, pathname } = useLocation()
    const isMobile = useIsMobile()
    
    const MOBILE_PADDING = 150

    useEffect(() => {
        if (!hash) return
        const element = document.querySelector(hash)
        if (!element) return
        const top = element.getBoundingClientRect().top + window.scrollY - (isMobile ? MOBILE_PADDING : 0)
        window.scrollTo({ top, behavior: 'smooth' })
    }, [hash, pathname, isMobile])
}
export default useScrollToHash;

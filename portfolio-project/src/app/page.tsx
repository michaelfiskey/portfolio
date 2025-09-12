"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from './components/AuthContext';

gsap.registerPlugin(ScrollTrigger);
export default function Home() {

  const { authUser, isLoggedIn} = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const frameCount = 240;
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const techNamesRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const images: HTMLImageElement[] = [];
    const pinkGradient = { frame: 0 };

    const resizeCanvas = () => {
      if (canvas) {
        const baseWidth = window.innerWidth;
        
        canvas.width = baseWidth;
        // mobile breakpoint
        if (baseWidth < 500) { 
          canvas.height = baseWidth * 3.0; 
        } else if (baseWidth < 1024) { // tablet breakpoint
          canvas.height = baseWidth * 2.0; 
        } else {
          canvas.height = baseWidth * 0.9; 
        }
        render();
      }
    };

    // Image sequence animation logic adapted from GSAP community forums
    // Source: https://gsap.com/community/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/
    
    resizeCanvas();

    const handleResize = () => {resizeCanvas();};

    window.addEventListener('resize', handleResize);

    const currentFrame = (index: number) => ('/assets/gradient_sequences/pink/gradient_' + String(index).padStart(5, '0') + '.jpg');
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    function render() {
      if (!canvas || !context) return;
      const idx = pinkGradient.frame;
      const image = images[idx];
      if (image && image.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    }

    if (images[0]) images[0].onload = render;

    gsap.to(pinkGradient, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
      scrollTrigger: {
        scrub: 0.5
      }
    });

    // scrolling h1s logic - synchronized with horizontal scroll pace
    const portfolioH1s = gsap.utils.toArray<HTMLElement>('.portfolio-h1');
    const scrollRow = scrollRowRef.current;

    if (portfolioH1s.length && scrollRow) {
      const isMobile = window.innerWidth < 500;
      const isTablet = window.innerWidth < 1024;
      
      // Use same scroll distance calculation as horizontal scroll
      const maxScroll = scrollRow.scrollWidth - scrollRow.clientWidth;
      const totalScrollDistance = maxScroll + 300;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: portfolioH1s[0],
          start: isMobile ? 'top 80%' : 'top bottom',
          end: `+=${totalScrollDistance}`, // Match horizontal scroll distance
          scrub: true,
          toggleActions: 'play none none reverse',
        }
      });
      
      const yOffset = isMobile ? -30 : 80; 
      const staggerAmount = 0.5;
      
      tl.fromTo(portfolioH1s,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration: 0.5, stagger: { amount: staggerAmount } },
        0
      );
    }    return () => {window.removeEventListener('resize', handleResize);};
  }, [authUser]);

  useGSAP(() => {
    const scrollRow = scrollRowRef.current;
    const techNames = techNamesRef.current;
    if (!scrollRow || !techNames) return;
    
    const maxScroll = scrollRow.scrollWidth - scrollRow.clientWidth;
    if (maxScroll <= 0) return;

    const nameElements = gsap.utils.toArray<HTMLElement>('.tech-name');
    
    const isMobile = window.innerWidth < 500;
    const isTablet = window.innerWidth < 1024;
    const yOffset = isMobile ? -30 : 80;
    const staggerAmount = isMobile ? 0.4 : 1;
    
    const totalScrollDistance = maxScroll + 300;
    
    const techNamesTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRow,
        start: isMobile ? 'top 80%' : 'top center',
        end: `+=${totalScrollDistance}`, 
        scrub: true,
        toggleActions: 'play none none reverse',
      }
    });
    
    techNamesTl.fromTo(nameElements,
      { opacity: 0, y: yOffset },
      { opacity: 1, y: 0, duration: 0.05, stagger: { amount: 0.5 } },
      0
    );
    
    const horizontalTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRow,
        start: isMobile ? "top 70%" : "top center", // On mobile, pin lower to leave room for content above
        end: `+=${totalScrollDistance}`, // Use same distance
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      }
    });

    // Add horizontal scroll animation to timeline
    horizontalTl.to(scrollRow, {
      scrollLeft: maxScroll,
      ease: "none",
      duration: 1
    });

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
  }, [authUser]);


  return (
    <div className="-m-1 sm:mx-0 opacity-0" ref={pageRef}>
      {isLoggedIn ? (
        <div className="mt-8 ml-4">
          <h1 className='h1 -mb-12.5'>HELLO, {`${authUser?.slice(0,30) || 'USER'}`}.</h1>
          <h1 className='h1 mt-30 -mb-12.5'>I AM.</h1>
        </div>
      ) : (
        <div className="flex flex- items-stretch justify-between mt-8">
          <h1 className='h1 -mb-12.5 sm:ml-4 mx-auto'>HELLO. I AM.</h1> 
        </div>
      )}
      <div className="mt-10 flex items-center justify-center relative">
        <canvas 
          ref={canvasRef}
          className="w-full"
        ></canvas>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="h1 !text-white !font-bold !drop-shadow-lg">MICHAEL FISKEY.</h1>
        </div>
      </div>
      <div className="mt-5 mx-auto">
        <h1 className="h1 portfolio-h1">THIS IS MY</h1>
        <h1 className="h1 portfolio-h1">&lt;Developer/&gt;<span className="opacity-0 animate-pulse inline-block">_</span></h1>
        <h1 className="h1 portfolio-h1">Social Media<span className="animate-spin inline-block">&copy;</span></h1>
        <h1 className="h1 portfolio-h1">Music<span className="animate-bounce inline-block">&#9835;</span></h1>
        <h1 className="h1 mb-10 portfolio-h1">Portfolio.</h1>
      </div>
      <div className="relative w-full flex flex-col sm:flex-row">
        <div className="hidden sm:block sm:w-1/2 sm:order-2 overflow-hidden">
          <div ref={scrollRowRef} className="scroll flex flex-row overflow-x-hidden whitespace-nowrap py-10 items-center gap-10 px-4">
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/js.png" 
        alt="JavaScript logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/next-js.svg" 
        alt="NextJS logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/express-js.png" 
        alt="ExpressJS logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/html5.png" 
        alt="HTML5 logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/css.png" 
        alt="CSS logo" />
        <img 
        className="h-20 sm:h-35"
        src="/assets/images/tailwind.png" 
        alt="TailwindCSS logo" />
        <img 
        className="h-20 sm:h-45"
        src="/assets/images/gsap.webp" 
        alt="GSAP logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/python.png" 
        alt="Python logo" />
        <img 
        className="h-15 sm:h-25"
        src="/assets/images/django-logo.png" 
        alt="Django logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/postgresql-logo.png" 
        alt="PostgreSQL logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/vercel.png" 
        alt="Vercel logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/railway.svg" 
        alt="Vercel logo" />
        <img 
        className="h-25 sm:h-45"
        src="/assets/images/git-logo.png" 
        alt="Git logo" />
          </div>
        </div>
        
        {/* Tech Names on Bottom/Left - Mobile: appears second, Desktop: left side */}
        <div ref={techNamesRef} className="w-full sm:w-1/2 sm:order-1 flex flex-col justify-center">
          <h1 className="h1 tech-name opacity-0" data-tech="techstack">Tech Stack:</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="javascript">JavaScript</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="nextjs">Next.js</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="express">Express.js</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="html">HTML5</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="css" >CSS3</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="tailwind" >Tailwind CSS</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="gsap" >GSAP</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="python" >Python</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="django" >Django</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="postgresql" >PostgreSQL</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="vercel" >Vercel</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="railway" >Railway</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="git" >Git</h1>
        </div>
      </div>
      <div className="h-[200px]"/>  

    </div>
  );
}

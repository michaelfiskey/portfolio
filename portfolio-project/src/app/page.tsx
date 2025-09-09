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
  const portfolioHingeRef = useRef<HTMLHeadingElement>(null);
  const frameCount = 240;
  const scrollRowRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const images: HTMLImageElement[] = [];
    const pinkGradient = { frame: 0 };

    // Image sequence animation logic adapted from GSAP community forums
    // Source: https://gsap.com/community/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/
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
    }

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

    // scrolling h1s logic
    const portfolioH1s = gsap.utils.toArray<HTMLElement>('.portfolio-h1');
    const hingeH1 = portfolioHingeRef.current;
    const normalH1s = portfolioH1s.slice(0, -1);

    if (normalH1s.length && hingeH1) {
      const totalH1s = portfolioH1s.length;
      const isMobile = window.innerWidth < 500;
      const isTablet = window.innerWidth < 1024;
      
      let scrollLength;
      if (isMobile) {
        scrollLength = 150 * totalH1s; // mobile
      } else if (isTablet) {
        scrollLength = 175 * totalH1s; // tablet
      } else {
        scrollLength = 200 * totalH1s; // desktop
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: normalH1s[0],
          start: isMobile ? 'top 80%' : 'top center',
          end: '+=' + scrollLength,
          scrub: true,
          toggleActions: 'play none none reverse',
        }
      });
      
      const yOffset = isMobile ? -30 : 80; 
      const staggerAmount = isMobile ? 0.4 : 1;
      
      tl.fromTo(normalH1s,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration: 1, stagger: { amount: staggerAmount } },
        0
      );
      const hingeDelay = isMobile? 0.7 : 1.2;
      tl.fromTo(hingeH1,
        { opacity: 0, rotateZ: -80, transformOrigin: 'left top' },
        { opacity: 1, rotateZ: 0, duration: 0.3, ease: 'back.out(1.3)' },
        hingeDelay
      );
    }

  }, [authUser]);

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

  useGSAP(() => {
    const row = scrollRowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    if (maxScroll <= 0) return;
    gsap.to(row, {
      scrollLeft: maxScroll,
      duration: 10,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  });

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
        <h1 className="h1 mb-10 portfolio-h1" ref={portfolioHingeRef}>Portfolio.</h1>
      </div>
      <div ref={scrollRowRef} className="scroll flex flex-row overflow-x-auto whitespace-nowrap px-5 py-10 items-center gap-10">
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/js.png" 
        alt="JavaScript logo" />
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/next-js.svg" 
        alt="NextJS logo" />
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/express-js.png" 
        alt="ExpressJS logo" />
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/html5.png" 
        alt="HTML5 logo" />
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/css.png" 
        alt="CSS logo" />
        <img 
        className="h-20 sm:h-45"
        src="/assets/images/tailwind.png" 
        alt="TailwindCSS logo" />
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/python.png" 
        alt="Python logo" />
        <img 
        className="h-15 sm:h-35"
        src="/assets/images/django-logo.png" 
        alt="Django logo" />
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/postgresql-logo.png" 
        alt="PostgreSQL logo" />
        <img 
        className="h-25 sm:h-55"
        src="/assets/images/git-logo.png" 
        alt="Git logo" />
      </div>
      <div className="h-[200px]"/>  

    </div>
  );
}

"use client";
import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
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
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const frameCount = 240;
  const scrollRowRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const page = pageRef.current;
    const images: HTMLImageElement[] = [];
    const pinkGradient = { frame: 0 };

    // Image sequence animation logic adapted from GSAP community forums
    // Source: https://gsap.com/community/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/
    if (canvas) {
      const baseWidth = window.innerWidth;
      
      canvas.width = baseWidth;
      canvas.height = baseWidth * 0.9;
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

    gsap.to(canvasRef.current, {
      y: -300,
      scrollTrigger: {
        trigger: page,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // scrolling h1s logic
    const portfolioH1s = gsap.utils.toArray<HTMLElement>('.portfolio-h1');
    const hingeH1 = portfolioHingeRef.current;
    const normalH1s = portfolioH1s.slice(0, -1);

    if (normalH1s.length && hingeH1) {
      const totalH1s = portfolioH1s.length;
      const scrollLength = 200 * totalH1s;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: normalH1s[0],
          start: 'top center',
          end: '+=' + scrollLength,
          scrub: true,
          toggleActions: 'play none none reverse',
        }
      });
      tl.fromTo(normalH1s,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, stagger: { amount: 1 } },
        0
      );
      const hingeDelay = 1 + (400 / scrollLength);
      tl.fromTo(hingeH1,
        { opacity: 0, rotateZ: -80, transformOrigin: 'left top' },
        { opacity: 1, rotateZ: 0, duration: 0.5, ease: 'back.out(1.7)' },
        hingeDelay
      );
    }

  }, [isMobile, authUser]);

  useGSAP(() => {
    // page fade-in effect
    const page = pageRef.current;
    gsap.fromTo(page, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 2
    });
  }, [authUser])

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
  }, []);

  return (
    <div className="video-play-scroll-trigger opacity-0" ref={pageRef}>
      {isLoggedIn ? (
        <div className="mt-8 ml-4">
          <h1 className='h1 -mb-12.5'>HELLO, {`${authUser?.slice(0,30) || 'USER'}`}.</h1>
          <h1 className='h1 mt-30 -mb-12.5'>I AM.</h1>
        </div>
      ) : (
        <div className="flex flex- items-stretch justify-between mt-8">
          <h1 className='h1 -mb-12.5 ml-4'>HELLO. I AM.</h1> 
        </div>
      )}
      <div className="mt-10 flex items-center justify-center relative">
        <canvas 
          ref={canvasRef}
          className="w-full shadow-2xl"
        ></canvas>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="h1 !text-white !font-bold !drop-shadow-lg">MICHAEL FISKEY.</h1>
        </div>
      </div>
      <div>
        <h1 className="h1 ml-4 portfolio-h1">THIS IS MY</h1>
        <h1 className="h1 ml-4 portfolio-h1">&lt;Developer/&gt;<span className="opacity-0 animate-pulse inline-block">_</span></h1>
        <h1 className="h1 ml-4 portfolio-h1">Social Media<span className="animate-spin inline-block">&copy;</span></h1>
        <h1 className="h1 ml-4 portfolio-h1">Music<span className="animate-bounce inline-block">&#9835;</span></h1>
        <h1 className="h1 ml-4 mb-10 portfolio-h1" ref={portfolioHingeRef}>Portfolio.</h1>
      </div>
      <div ref={scrollRowRef} className="scroll-row flex flex-row  overflow-x-auto whitespace-nowrap px-5 py-10 mx-[-60] min-h-[300px] items-center gap-10">
        <img 
        className="h-55"
        src="/assets/images/js.png" 
        alt="JavaScript logo" />
        <img 
        className="h-55"
        src="/assets/images/next-js.svg" 
        alt="NextJS logo" />
        <img 
        className="h-55"
        src="/assets/images/express-js.png" 
        alt="ExpressJS logo" />
        <img 
        className="h-55"
        src="/assets/images/html5.png" 
        alt="HTML5 logo" />
        <img 
        className="h-55"
        src="/assets/images/css.png" 
        alt="CSS logo" />
        <img 
        className="h-45"
        src="/assets/images/tailwind.png" 
        alt="TailwindCSS logo" />
        <img 
        className="h-55"
        src="/assets/images/python.png" 
        alt="Python logo" />
        <img 
        className="h-35"
        src="/assets/images/django-logo.png" 
        alt="Django logo" />
        <img 
        className="h-55"
        src="/assets/images/postgresql-logo.png" 
        alt="PostgreSQL logo" />
        <img 
        className="h-55"
        src="/assets/images/git-logo.png" 
        alt="Git logo" />
      </div>
      <div className="h-[300px]"/>
    </div>
  );
}

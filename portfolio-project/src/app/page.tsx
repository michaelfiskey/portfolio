"use client";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const portfolioHingeRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const frameCount = 240;

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const page = pageRef.current;
    const images: HTMLImageElement[] = [];
    const pinkGradient = { frame: 0 };

    // scrolling gradient logic 
    function render() {
      if (!canvas || !context) return;
      const idx = Math.floor(pinkGradient.frame);
      const image = images[idx];
      if (image && image.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    }

    if (canvas) {
      canvas.width = 1500;
      canvas.height = 2000;
    }

    const currentFrame = (index: number) => ('/assets/gradient_sequences/pink/gradient_' + String(index).padStart(5, '0') + '.jpg');
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
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
    if (canvas) {
      const widthProxy = { w: 1500 };
      gsap.to(widthProxy, {
        w: 1980,
        ease: 'none',
        onUpdate: () => {
          canvas.width = widthProxy.w;
          render();
        },
        scrollTrigger: {
          trigger: page,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
    gsap.to(canvasRef.current, {
      y: -150,
      scrollTrigger: {
        trigger: page,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

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

    // page fade-in effect
    gsap.fromTo(page, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 2
    });

  }, [isMobile]);

  return (
    <div className="video-play-scroll-trigger opacity-0" ref={pageRef}>
      <div className="flex flex-row items-stretch justify-between mt-8">
          <h1 className='h1 -mb-12.5 ml-4'>HELLO.</h1>
          <h1 className='h1 -mb-12.5'>I AM.</h1>
      </div>
      <div className="mt-10 flex items-center justify-center relative">
        <canvas ref={canvasRef}></canvas>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-8xl font-bold drop-shadow-lg">MICHAEL FISKEY</h1>
        </div>
      </div>
      <div>
        <h1 className="h1 ml-4 portfolio-h1">THIS IS MY</h1>
        <h1 className="h1 ml-4 portfolio-h1">&lt;Developer/&gt;</h1>
        <h1 className="h1 ml-4 portfolio-h1">Social Media<span></span>&copy;</h1>
        <h1 className="h1 ml-4 portfolio-h1">Music&#9835;</h1>
        <h1 className="h1 ml-4 mb-50 portfolio-h1" ref={portfolioHingeRef}>Portfolio.</h1>
      </div>
      <div className="h-[300px]">
      </div>

      
      </div>
  );
}

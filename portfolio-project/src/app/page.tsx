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
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const frameCount = 120;

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const page = pageRef.current;
    const images: HTMLImageElement[] = [];
    const pinkGradient = { frame: 0 };

    // moving gradient logic 
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
      canvas.width = 1920;
      canvas.height = 1080;
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
      <div className="flex flex-row items-stretch justify-between mt-4">
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
        <h1 className="h1 ml-4">THIS IS MY PORTFOLIO.</h1>
        
      </div>
      <div className="h-[300px]">
      </div>

      
      </div>
  );
}

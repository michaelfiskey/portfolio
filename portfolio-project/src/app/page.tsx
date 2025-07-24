"use client";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  // gradient video trigger logic
  const gradientTimeline = () => {
    const video = videoRef.current;
    const videoStart = isMobile ? 'top top' : 'top top';
    const videoEnd = isMobile ? '600% top' : 'bottom -200%';
    if (!video) return;
    gsap.to(video, {
      currentTime: video.duration,
      scrollTrigger: {
        trigger: '.video-play-scroll-trigger',
        start: videoStart,
        end: videoEnd,
        scrub: true,
        onUpdate: self => {},
      },
      ease: 'none',
    });
  };

  useGSAP(() => {
    // gradient video timeline
    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      gradientTimeline();
    }

    const page = pageRef.current;
    gsap.fromTo(page, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 2
    });


    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas) {
      canvas.width = 1920;
      canvas.height = 1080;
    }

    const frameCount = 120;
    const currentFrame = (index: number) => (
      '/assets/gradient_sequences/pink/gradient_' + String(index).padStart(5, '0') + '.jpg'
    );

    const images: HTMLImageElement[] = [];
    const pinkGradient = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    function render() {
      if (!canvas || !context) return;
      const idx = Math.floor(pinkGradient.frame);
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
  }, [isMobile]);

  return (
    <div className="video-play-scroll-trigger fade-in" ref={pageRef}>
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

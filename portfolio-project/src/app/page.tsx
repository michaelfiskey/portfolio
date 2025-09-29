"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from './components/AuthContext';
import { usePathname } from 'next/navigation'; 

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const { authUser, isLoggedIn} = useAuth();
  const pathname = usePathname(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const techNamesRef = useRef<HTMLDivElement>(null);
  const discoverSectionRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  const frameCount = 240;


  useGSAP(() => {
    // page fade-in effect
    const page = pageRef.current;
    gsap.fromTo(page, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 2
    });
  });

  useGSAP(() => {
    // scrolling gradient background
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const images: HTMLImageElement[] = [];
    const pinkGradient = { frame: 0 };

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 1.5;
        render();
      }
    };

    // image sequence animation logic adapted from GSAP community forums
    // source: https://gsap.com/community/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/
    
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

    // scrolling intro elements
    const introElements = gsap.utils.toArray<HTMLElement>('.portfolio-h1');
    const scrollRow = scrollRowRef.current;
    const introCol = introRef.current;
    
    if (!scrollRow || !introCol) {return};
    
    if (introCol && scrollRow) {
      const isMobile = window.innerWidth < 500;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introElements[0],
          start: isMobile ? 'top 80%' : 'top 80% center',
          end: `+=${introCol.clientHeight}`,
          scrub: true,
          toggleActions: 'play none none reverse',
        }
      });
            
      tl.fromTo(introElements,
        { opacity: 0, y: isMobile ? -30 : 80 },
        { opacity: 1, y: 0, duration: 0.05, stagger: { amount: 0.2 } },
        0
      );
    }    return () => {window.removeEventListener('resize', handleResize);};
  });

  
  useGSAP(() => {
    let techTimelines: gsap.core.Timeline[] = [];

    const createAnimations = () => {
      techTimelines.forEach(tl => tl.kill());
      techTimelines = [];

      // scrolling tech stack names
      const scrollRow = scrollRowRef.current;
      const techNames = techNamesRef.current;
      if (!scrollRow || !techNames) return;

      gsap.set(scrollRow, { scrollLeft: 0 });

      const maxScroll = scrollRow.scrollWidth - scrollRow.clientWidth;
      const nameElements = gsap.utils.toArray<HTMLElement>('.tech-name');
      const isMobile = window.innerWidth < 500;
      const isXL = window.innerWidth >= 1280;

      if (isXL) {
        const techNamesTl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollRow,
            start: isMobile ? 'top 80%' : 'top 80% center',
            end: `+=${maxScroll}`,
            scrub: true,
            toggleActions: 'play none none reverse',
            refreshPriority: -1,
            invalidateOnRefresh: true,
          }
        });
        techTimelines.push(techNamesTl);

        techNamesTl.fromTo(nameElements,
          { opacity: 0, y: isMobile ? -30 : 80 },
          { opacity: 1, y: 0, duration: 0.05, stagger: { amount: 0.2 } },
          0
        );
      } else {
        const techNamesTl = gsap.timeline({
          scrollTrigger: {
            trigger: nameElements[0],
            start: isMobile ? 'top 80%' : 'top center',
            end: `+=${techNames.clientHeight}`,
            scrub: true,
            toggleActions: 'play none none reverse',
          }
        });
        techTimelines.push(techNamesTl);

        techNamesTl.fromTo(nameElements,
          { opacity: 0, y: isMobile ? -30 : 80 },
          { opacity: 1, y: 0, duration: 0.05, stagger: { amount: 0.2 } },
          0
        );
      }

      // scroll tech stack images (only for xl screens)
      if (isXL) {
        const horizontalTl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollRow,
            start: isMobile ? "top 70%" : "top center",
            end: `+=${maxScroll}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: -1,
            invalidateOnRefresh: true,
          }
        });
        techTimelines.push(horizontalTl);

        gsap.set(scrollRow.parentElement, { opacity: 0 });

        horizontalTl
          .to(scrollRow.parentElement, {
            opacity: 1,
            ease: "power2.out",
            duration: 0.1
          }, 0)
          .to(scrollRow, {
            scrollLeft: maxScroll,
            ease: "none",
            duration: 0.6
          }, 0.2)
          .to(scrollRow.parentElement, {
            opacity: 0,
            ease: "power2.out",
            duration: 0.1
          }, 0.8);
      }

      ScrollTrigger.refresh();
    };

    createAnimations();

    const handleResize = () => {
      createAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      techTimelines.forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  useGSAP(() => {
    // page information animation
    const discoverSection = discoverSectionRef.current;
    const featureCards = featureCardsRef.current;
    const ctaSection = ctaSectionRef.current;
    
    if (!discoverSection) {return};
    gsap.fromTo(discoverSection, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: discoverSection,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    if (featureCards) {
      const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
      gsap.fromTo(cards, {
        opacity: 0,
        y: 60,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: featureCards,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }

    if (ctaSection) {
      gsap.fromTo(ctaSection, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }
  });


  return (
    <div className="-m-1 sm:mx-0 opacity-0" ref={pageRef}>
      {isLoggedIn ? (
        <div className="mt-8 ml-4 mx-auto text-center">
          <h1 className='h1 -mb-25.5'>HELLO, {`${authUser?.slice(0,30) || 'USER'}`}.</h1>
          <h1 className='h1 mt-30 -mb-12.5'>I AM.</h1>
        </div>
      ) : (
        <div className="mt-8 ml-4 mx-auto text-center">
          <h1 className='h1 -mb-12.5 sm:ml-4 mx-auto'>HELLO. I AM.</h1> 
        </div>
      )}
      <div className="mt-10 flex items-center justify-center relative">
        <canvas 
          ref={canvasRef}
          className="w-full"
        ></canvas>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="h1 !text-white !font-bold !drop-shadow-lg name center">MICHAEL FISKEY.</h1>
        </div>
      </div>
      <div ref={introRef} className="mt-5 mx-auto">
        <h1 className="h1 portfolio-h1">THIS IS MY</h1>
        <h1 className="h1 portfolio-h1">&lt;Developer/&gt;<span className="opacity-0 animate-pulse inline-block">_</span></h1>
        <h1 className="h1 portfolio-h1">Social Media<span className="animate-spin inline-block">&copy;</span></h1>
        <h1 className="h1 portfolio-h1">Music<span className="animate-bounce inline-block">&#9835;</span></h1>
        <h1 className="h1 mb-10 portfolio-h1">Portfolio.</h1>
      </div>
      <div className="relative w-full flex flex-col sm:flex-row">
        <div className="hidden xl:block xl:w-1/2 xl:order-2 overflow-hidden">
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
        <div ref={techNamesRef} className="w-full sm:w-1/2 sm:order-1 flex flex-col justify-center">
          <h1 className="h1 tech-name opacity-0" data-tech="techstack">Tech Stack:</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="javascript">JavaScript</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="nextjs">Next.js</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="express">Express.js</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="html">HTML5</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="css" >CSS3</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="tailwind" >TailwindCSS</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="gsap" >GSAP</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="python" >Python</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="django" >Django</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="postgresql" >PostgreSQL</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="vercel" >Vercel</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="railway" >Railway</h1>
          <h1 className="h1 tech-name opacity-0" data-tech="git" >Git.</h1>
        </div>
      </div>

      <div className="mt-20 mb-20 mx-auto max-w-6xl px-4">
        <div ref={discoverSectionRef} className="mx-auto mb-16 text-center">
          <h1 className="h1 mb-6">WHAT YOU&apos;LL DISCOVER HERE.</h1>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto">
            I discovered my passion for coding websites and building digital experiences in my undergrad. 
            Beyond development, I also love music and content creation. Here you will find the various projects I have been a part of.
          </p>
        </div>

        <div ref={featureCardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card bg-gradient-to-br from-stone-50 to-stone-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-stone-700 mb-3">&lt;Dev &amp; Data /&gt;<span className="opacity-0 ml-1 inline-block animate-pulse">_</span></h3>
            </div>
            <p className="text-stone-600 mb-4 flex-grow">
              Explore my personal projects showcasing fullstack development skills, from scheduling applications 
              to data visualization tools and interactive web experiences.
            </p>
            <ul className="text-sm text-stone-500 space-y-2 mb-6">
              <li>• ExpressJS & Django backend development</li>
              <li>• Meeting scheduler with algorithm</li>
              <li>• More projects to come...</li>
            </ul>
            <Link 
              href="/dev-and-data" 
              className="inline-block px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-sm hover: hover:scale-102 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 mt-auto"
            >
              View Projects →
            </Link>
          </div>
          <div className="feature-card bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-stone-700 mb-3">Music <span className="inline-block animate-bounce">&#9835;</span></h3>
            </div>
            <p className="text-stone-600 mb-4 flex-grow">
              Discover my personal music projects and explore my current favorite tracks. This section showcases 
              both technical implementation with the Spotify API and my genuine passion for music.
            </p>
            <ul className="text-sm text-stone-500 space-y-2 mb-6">
              <li>• Spotify API integration</li>
              <li>• Personal Projects</li>
              <li>• Current Favorites</li>
            </ul>
            <Link 
              href="/music" 
              className="inline-block px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold rounded-sm hover:from-purple-600 hover:to-purple-700 hover:scale-102 transition-all duration-300 mt-auto"
            >
              Explore Music →
            </Link>
          </div>

          <div className="feature-card bg-gradient-to-br from-pink-50 to-rose-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-stone-700 mb-3">Social Media <span className="animate-spin inline-block">&copy;</span></h3>
            </div>
            <p className="text-stone-600 mb-4 flex-grow">
              Hundreds of videos created, hundreds of millions of views garnered. Explore the content I created that grew 
              a TikTok account I managed to 500K+ followers and discover my journey in content creation and digital marketing.
            </p>
            <ul className="text-sm text-stone-500 space-y-2 mb-6">
              <li>• Viral content</li>
              <li>• Brand collaborations</li>
              <li>• Analytics-driven strategy</li>
            </ul>
            <Link 
              href="/social-media" 
              className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-sm hover:from-pink-600 hover:to-rose-600 transition-all hover:scale-102 duration-300 mt-auto"
            >
              See My Work →
            </Link>
          </div>
        </div>

        <div ref={ctaSectionRef} className="mt-16 text-center bg-gradient-to-r from-stone-700 to-stone-800 text-white p-12 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">Ready to Work Together?</h3>
          <p className="text-stone-200 text-lg mb-8 max-w-2xl mx-auto">
            With experience in fullstack development, data analysis, and content creation, 
            I bring a unique blend of technical skills and creative thinking to every project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-400 to-rose-300 text-white font-semibold rounded-sm hover:from-red-500 hover:to-rose-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get In Touch
            </Link>
            <a 
              href="https://github.com/michaelfiskey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-stone-700 transition-all duration-300"
            >
              View GitHub
            </a>
            <a 
              href="https://docs.google.com/document/d/1YkH3DPY-C7cLWiCbPGgnZUkPgUM4-wF6hh0B6oxeImo/edit?usp=sharing"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-stone-700 transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

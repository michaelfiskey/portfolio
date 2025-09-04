'use client';
import React, { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type CardProps = {
    children?: ReactNode;
};

const Card = ({ children }: CardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.fromTo(card, 
            {
                y: 50,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: 0.3
            }
        );

        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.05,
                y: -8,
                rotation: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                rotation: 0,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, []);

    return (
        <div ref={cardRef} className="relative rounded-lg cursor-pointer">
            {children}
        </div>
    );
};

export default Card;
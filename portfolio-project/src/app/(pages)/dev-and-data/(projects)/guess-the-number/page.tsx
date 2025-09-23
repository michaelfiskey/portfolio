"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Page = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [prediction, setPrediction] = useState<string | null>(null);

    useGSAP(() => {
        const page = pageRef.current;
        gsap.fromTo(page, { opacity: 0 }, { opacity: 1, duration: 2 });
    });

    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                const context = canvas.getContext('2d');
                if (context) {
                    if (canvas.width < 500) {context.lineWidth = 5;}
                    if (canvas.width < 1000) {context.lineWidth = 7;}
                    if (canvas.width < 1500) {context.lineWidth = 8;}
                    else {context.lineWidth = 10;}

                    context.lineCap = 'round';
                    context.closePath();
                }
                setIsDrawing(false);
            }
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); 

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            if (context) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                context.beginPath();
                context.moveTo(x, y);
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            if (context) {
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                context.lineTo(x, y);
                context.stroke();
                context.beginPath();
                context.moveTo(x, y);
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const context = canvasRef.current?.getContext('2d');
        if (context) {context.closePath()}
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const handleSubmitGuess = async () => {
        try {
            const canvas = canvasRef.current;
            const context = canvas?.getContext('2d');

            // Fill background with white if needed
            if (context && canvas) {
                context.globalCompositeOperation = 'destination-over';
                context.fillStyle = '#fff';
                context.fillRect(0, 0, canvas.width, canvas.height);
        
                const image = canvas.toDataURL('image/png');
                const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URL}/api/guess-the-number/make-guess/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: image })
                });
                const result = await response.json();
                setPrediction(result.prediction || null); 
                clearCanvas(); 
            }
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div ref={pageRef} className="page-container">
            <div className="mt-5 mb-12 sm:ml-0 text-center sm:text-left">
                <h1 className="h1 ">GUESS THE NUMBER.</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-blue-500 mx-auto sm:ml-5 mt-2"></div>
            </div>
            <div className="bg-white backdrop-blur-sm p-3 sm:p-8 shadow-2xl rounded-lg">
                <div className="text-center mb-8">
                    <h2 className="h2 !font-bold mb-3 !from-sky-400 !to-blue-700 ">GUESS THE NUMBER</h2>
                    <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                        Draw a number in the canvas below, and the convolutional neural network I built will try and guess what you wrote!
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center bg-stone-200/80 rounded-md p-6 shadow-lg mb-8">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-white rounded-sm border-5 border-stone-400 hover:cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onMouseMove={draw}
                    />
                    <div className='flex flex-row gap-5'>
                        <button 
                            className='button mt-3 !from-red-500 !to-red-600'
                            onClick={clearCanvas}>Clear
                        </button>
                        <button 
                            className='button mt-3 !from-sky-500 !to-blue-600'
                            onClick={handleSubmitGuess}>Guess!
                        </button>
                    </div>
                    {prediction && (
                        <div className="mt-4 text-xl font-bold">
                            Prediction: {prediction}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Page;
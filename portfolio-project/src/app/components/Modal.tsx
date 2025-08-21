import { createPortal } from 'react-dom';
import { useEffect, useState, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    submitButtonText?: string;
    children?: ReactNode;
    buttonAlignment?: 'left' | 'center' | 'right';
    submitButtonColor?: string;
}

const Modal = ({ title, isOpen, onClose, onSubmit, submitButtonText='Submit', children, buttonAlignment='right', submitButtonColor='from-red-400 to-rose-300 hover:from-red-500 hover:to-rose-400' }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useGSAP(() => {
        const overlay = overlayRef.current;
        const modal = modalRef.current;
        if (!modal || !overlayRef) return;

        gsap.fromTo(overlay, 
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            }
        );

        gsap.fromTo(modal, 
            {
                opacity: 0,
                scale: 0.8
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
            }
        );
    }, [mounted, isOpen]);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div 
            ref={overlayRef}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
            onClick={onClose}
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-sm p-6 max-w-md w-full mx-4 shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="text-stone-700 flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="pl-1 pr-1 text-gray-500 hover:text-gray-700 text-xl hover:bg-gray-200 hover:rounded-full"
                    >
                        ×
                    </button>
                </div>

                <div className="mb-4">
                    {children || <p>Modal content goes here...</p>}
                </div>
                <div className={`flex gap-2 ${
                    buttonAlignment === 'center' ? 'justify-center' : 
                    buttonAlignment === 'right' ? 'justify-end' : 
                    'justify-end' // default
                }`}>
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-sm hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onSubmit({})}
                        className={`px-4 py-2 bg-gradient-to-r text-white rounded-sm ${submitButtonColor} `}
                    >
                        {submitButtonText}
                    </button>
                </div>
            </div>
        </div>,
        document.body 
    );
};

export default Modal;
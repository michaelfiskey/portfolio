'use client';
import React, { ReactNode } from 'react';

type CardHolderProps = {
    children: ReactNode;
    className?: string;
};

const CardHolder = ({ children, className = 'flex flex-row gap-5 items-center justify-center overflow-y-hidden' }: CardHolderProps) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default CardHolder;
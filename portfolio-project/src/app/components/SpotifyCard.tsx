'use client';
import React from 'react';
import Card from './Card';

type SpotifyCardProps = {
    spotifyUrl: string;
    width?: string;
    height?: string;
    title?: string;
};

const SpotifyCard = ({ 
    spotifyUrl, 
    width = "100%", 
    height = "352",
    title = ""
}: SpotifyCardProps) => {
    return (
        <Card title={title}>
            <iframe 
                data-testid="embed-iframe"  
                src={spotifyUrl}
                width={width} 
                height={height} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
            />
        </Card>
    );
};

export default SpotifyCard;
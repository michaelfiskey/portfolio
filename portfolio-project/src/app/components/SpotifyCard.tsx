'use client';
import React from 'react';
import { useState } from 'react';
import Card from './Card';
import { useAuth } from '../components/AuthContext'
import RemoveModal from './RemoveModal';

type SpotifyCardProps = {
    spotifyId: string;
    type: 'track' | 'album';
    width?: string;
    height?: string;
    title?: string;
    theme?: boolean;
    onRemove?: () => Promise<void>;
};

const SpotifyCard = ({ 
    spotifyId, 
    type,
    width = "100%", 
    height = "352",
    theme = false,
    onRemove
}: SpotifyCardProps) => {
    const { authRole } = useAuth();
    const [modalView, setModalView] = useState(false);
    const themeQuery = theme ? '&theme=0' : '';
    const spotifyUrl = `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator${themeQuery}`
    
    const removeSpotifyAlbum = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/spotify/album/${spotifyId}`, 
                { method: 'DELETE' }
            )

            await response.json();

            return;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const removeSpotifyTrack = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/spotify/track/${spotifyId}`, 
                { method: 'DELETE' }
            )

            await response.json();

            return;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    
    const handleRemoveProject = async () => {
        try {
            if (type === 'track') { await removeSpotifyTrack();
            } else if (type === 'album') {await removeSpotifyAlbum();}
            
            if (onRemove) {await onRemove()};
            
        } catch (error) {
            console.error('Error removing project:', error);
        } finally {
            setModalView(false);
        }

    }

    return (
        <div>
            <Card>
                <iframe 
                    data-testid="embed-iframe"  
                    src={spotifyUrl}
                    width={width} 
                    height={height} 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                />
            </Card>
            {authRole === 'owner' ? 
            <div>
                <button 
                onClick={() => setModalView(true)} 
                className="mt-3 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold rounded-sm hover:from-red-500 hover:to-rose-400 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Remove
                </button>
                {modalView && (
                    <RemoveModal
                        title='Are you sure?'
                        description={type === 'album' ? 'WARNING: Removing this album will delete all connected tracks (cannot be undone)!' : ''}
                        isOpen={modalView}
                        onClose={() => setModalView(false)}
                        onSubmit={handleRemoveProject}
                    />
                )} 
            </div>
            : 
            
            <></>}
        </div>
    );
};

export default SpotifyCard;
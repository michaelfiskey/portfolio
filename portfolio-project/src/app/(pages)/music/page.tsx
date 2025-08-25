'use client';
import React from "react";
import { useAuth } from '@/app/components/AuthContext';
import CardHolder from '@/app/components/CardHolder';
import { useEffect, useState } from 'react';
import SpotifyCard from "@/app/components/SpotifyCard";
import Modal from "@/app/components/Modal";
const Page = () => {
    const { authRole } = useAuth();
    const [tracks, setTracks] = useState<string[]>([]);
    const [albums, setAlbums] = useState<string[]>([]);
    const [modalView, setModalView] = useState(false);
    const [spotifyId, setSpotifyId] = useState('');

    type SpotifyTrack = { track_id: string; album_id: string };

    const getSpotifyTracks = async (): Promise<SpotifyTrack[]> => {
        try {
            const response = await fetch('http://localhost:5500/api/spotify/track-ids')
            const data = await response.json();
            return data as SpotifyTrack[];

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const handleAddProject = async () => {
        try {
            if (!spotifyId.trim()) {
                alert('Please enter a Spotify Id!');
                return;
            }

            console.log('Adding track:', spotifyId);

            const response = await fetch('http://localhost:5500/api/spotify/add-track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ track_id: spotifyId })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add track: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Track added:', data);
        } catch (error) {
            console.error(error);
        } finally {
            setModalView(false);
            setSpotifyId('');
        }

        await refreshTracks();
    };

    const refreshTracks = async () => {
        const trackData = await getSpotifyTracks();
        setTracks(trackData.map((item: { track_id: string }) => item.track_id));
        setAlbums([...new Set(trackData.map((item: {album_id: string}) => item.album_id))]);
    };

    useEffect(() => {
        refreshTracks();
    }, [])
    
    return (
        <div className="page-container">
            <div className="mb-12">
                <h1 className="h1 ">MUSIC.</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-300 ml-5 mt-2"></div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="h2 !font-bold  mb-3">PERSONAL PROJECTS</h2>
                    <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Below is a showcase of the amazing projects I&apos;ve had the privlige of being a part of and some music I&apos;ve made myself!
                    </p>
                </div>
                <div className="bg-stone-200 backdrop-blur-sm border border-stone-200 rounded-sm p-6 shadow-lg">
                    <p className="font-bold text-xl pl-5 mb-2 text-stone-700">Tracks.</p>
                    <CardHolder className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-6 items-center w-full mb-7'>
                        {tracks.map((trackId) => (
                            <SpotifyCard
                                key={trackId}
                                spotifyId={trackId}
                                type='track'
                                onRemove={refreshTracks}
                                theme={true}
                            />
                        ))}
                    </CardHolder>
                    <p className="font-bold text-xl pl-5 mb-2 text-stone-700">Associated Albums.</p>
                    <CardHolder className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-6 items-center w-full'>
                        {albums.map((albumId) => (
                            <SpotifyCard
                                key={albumId}
                                spotifyId={albumId}
                                type='album'
                                onRemove={refreshTracks}
                                theme={true}
                            />
                        ))}
                    </CardHolder>
                </div>
                {authRole === 'owner' && (
                    <div className="text-center mt-8">
                        <button onClick={() => setModalView(true)} className="px-6 py-3 bg-gradient-to-r from-red-400 to-rose-300 text-white font-semibold rounded-sm hover:from-red-500 hover:to-rose-400 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            + Add New Track
                        </button>
                        {modalView && (<>
                            <Modal
                                title='Add New Track'
                                isOpen={modalView}
                                onClose={() => {setModalView(false); setSpotifyId('')}}
                                onSubmit={handleAddProject}
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Spotify ID
                                        </label>
                                        <input
                                            type="url"
                                            value={spotifyId}
                                            onChange={(e) => setSpotifyId(e.target.value)}
                                            placeholder="3qpSOmkUobfgpaRXhqc8zT"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Paste the Spotify ID for the track you want to add. If there is an associated album with the track, it will be added automatically.
                                        </p>
                                    </div>
                                </div>
                            </Modal>
                            </>
                            
                            
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
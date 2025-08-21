'use client';
import React from "react";
import { useAuth } from '../../components/AuthContext';
import CardHolder from '../../components/CardHolder';
import { useEffect, useState } from 'react';
import SpotifyCard from "@/app/components/SpotifyCard";
import AddMusicModal from '../../components/AddMusicModal';

const Page = () => {
    const { authRole } = useAuth();
    const [tracks, setTracks] = useState<string[]>([]);
    const [albums, setAlbums] = useState<string[]>([]);
    const [modalView, setModalView] = useState(false);

    type SpotifyTrack = { track_id: string; album_id: string };

    const getSpotifyTracks = async (): Promise<SpotifyTrack[]> => {
        try {
            const response = await fetch('http://localhost:5500/api/spotify/track-ids')
            const data = await response.json();
            console.log(data)
            return data as SpotifyTrack[];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const handleAddProject = async (projectData: any) => {
        console.log('Adding project:', projectData);
        setModalView(false);
        // Refresh the data after adding
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
                    <h2 className="h2 !font-bold  mb-3">MY PROJECTS</h2>
                    <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Below is a showcase of the amazing projects I've had the privlige of being a part of and some music I've made!
                    </p>
                </div>
                <div className="bg-stone-200 backdrop-blur-sm border border-stone-200 rounded-sm p-6 shadow-lg">
                    <p className="font-bold text-xl pl-5 mb-2 text-stone-700">Tracks.</p>
                    <CardHolder className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-6 items-center w-full mb-7'>
                        {tracks.map((trackId, index) => (
                            <SpotifyCard
                                key={trackId}
                                spotifyId={trackId}
                                type='track'
                                onRemove={refreshTracks}
                            />
                        ))}
                    </CardHolder>
                    <p className="font-bold text-xl pl-5 mb-2 text-stone-700">Albums.</p>
                    <CardHolder className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-6 items-center w-full'>
                        {albums.map((albumId, index) => (
                            <SpotifyCard
                                key={albumId}
                                spotifyId={albumId}
                                type='album'
                                onRemove={refreshTracks}
                            />
                        ))}
                    </CardHolder>
                </div>
                {authRole === 'owner' && (
                    <div className="text-center mt-8">
                        <button onClick={() => setModalView(true)} className="px-6 py-3 bg-gradient-to-r from-red-400 to-rose-300 text-white font-semibold rounded-sm hover:from-red-500 hover:to-rose-400 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            + Add New Project
                        </button>
                        {modalView && (
                            <AddMusicModal
                                title='Add New Project'
                                isOpen={modalView}
                                onClose={() => setModalView(false)}
                                onSubmit={handleAddProject}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
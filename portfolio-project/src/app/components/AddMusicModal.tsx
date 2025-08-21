'use client';
import React, { useState } from 'react';
import Modal from './Modal';

type AddMusicModalProps = {
    title: string,
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
};

const AddMusicModal = ({ 
    title,
    isOpen,
    onClose,
    onSubmit
}: AddMusicModalProps) => {
    const [spotifyId, setSpotifyId] = useState('');

    const handleSubmit = () => {
        if (!spotifyId.trim()) {
            alert('Please enter a Spotify Id!');
            return;
        }
        onSubmit(spotifyId);
    };

    return (
        <Modal                  
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText="Add Track"
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
    );
};

export default AddMusicModal;
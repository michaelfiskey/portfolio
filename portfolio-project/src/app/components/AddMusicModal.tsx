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
    const [projectType, setProjectType] = useState<'track' | 'album'>('track');

    const handleSubmit = () => {
        if (!spotifyId.trim()) {
            alert('Please enter a Spotify URL');
            return;
        }


        onSubmit({spotifyId});
    };

    return (
        <Modal                  
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText="Add Project"
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type
                    </label>
                    <select 
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value as 'track' | 'album')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                        <option value="track">Track</option>
                        <option value="album">Album</option>
                    </select>
                </div>
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
                        Paste the Spotify ID for the {projectType} you want to add
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default AddMusicModal;
'use client';
import React from 'react';
import Modal from './Modal';

type RemoveModalProps = {
    title: string,
    description?: string,
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

const RemoveModal = ({ 
    title,
    description,
    isOpen,
    onClose,
    onSubmit
}: RemoveModalProps) => {

    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <Modal                  
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText="Remove"
            buttonAlignment="center"
            submitButtonColor='from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400'
        >
            <div className="space-y-4">
                <p>{description}</p>
            </div>
        </Modal>
    );
};

export default RemoveModal;
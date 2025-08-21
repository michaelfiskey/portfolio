'use client';
import React, { useState } from 'react';
import Modal from './Modal';

type RemoveModalProps = {
    title: string,
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
};

const RemoveModal = ({ 
    title,
    isOpen,
    onClose,
    onSubmit
}: RemoveModalProps) => {

    const handleSubmit = () => {
        onSubmit({});
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
                <div>
                </div>
            </div>
        </Modal>
    );
};

export default RemoveModal;
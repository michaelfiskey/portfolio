'use client';
import React from 'react';
import Card from './Card';
import Link from 'next/link';

type ProjectCardProps = {
    projectId: string;
    projectTitle: string; 
    projectDescription: string;
    projectDate: Date;
    projectAuthors?: string[],
    projectPath: string;
    projectImagePath: string;
    width?: string;
    height?: string;
};

const ProjectCard = ({ 
    projectTitle,
    projectDescription,
    projectDate,
    projectAuthors,
    projectPath,
    projectImagePath,
}: ProjectCardProps) => {

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Link href={`/dev-and-data/${projectPath}`}>
            <div>
                <Card>
                    <div className="flex flex-row justify-between items-center bg-gradient-to-br from-stone-800 to-stone-700 border border-slate-200 rounded-2xl p-6 shadow-inner w-full max-h-[352px]">
                        <img 
                            src={`/assets/images/project-images/${projectImagePath}`}
                            alt={projectTitle}
                            className="w-full h-full max-w-[352px] max-h-[352px] object-cover rounded-lg"
                        />
                        <div className="mb-4 flex flex-col justify-center items-center w-1/2">
                            <h3 className='h3 !text-white'>
                                {projectTitle}
                            </h3>
                            <p className="text-white text-lg line-clamp-4 mb-5">
                                {projectDescription}
                            </p>
                            <span className="bg-gradient-to-br border border-red-500 from-red-400 to-rose-300 text-stone-700 text-sm font-medium px-2 py-1 rounded-full">
                                <b>Created:</b> {formatDate(projectDate)}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </Link>
    );
};

export default ProjectCard;
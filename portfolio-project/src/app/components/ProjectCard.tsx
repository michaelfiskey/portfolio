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
            <div className="group relative">
                <Card>
                    <div className="hidden md:block relative bg-gradient-to-br from-stone-800 to-stone-700 border border-slate-200 rounded-2xl overflow-hidden shadow-inner h-[300px] w-full">
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                            style={{
                                backgroundImage: `url(/assets/images/project-images/${projectImagePath})`,
                            }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300" />
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <h1 className='h3 !text-white text-center mb-4'>{projectTitle}</h1>
                            <p className="text-white text-center text-lg line-clamp-4 mb-4">
                                {projectDescription}
                            </p>
                            <span className="bg-gradient-to-br border border-blue-800 from-sky-400 to-blue-700 text-stone-700 text-sm font-medium px-3 py-2 rounded-full">
                                <b>Created:</b> {formatDate(projectDate)}
                            </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                            <h3 className="h3 !text-white  text-lg">
                                {projectTitle}
                            </h3>
                        </div>
                    </div>
                    <div className="md:hidden block relative bg-gradient-to-br from-stone-800 to-stone-700 border border-slate-200 rounded-2xl overflow-hidden shadow-inner h-[500px] w-full">
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(/assets/images/project-images/${projectImagePath})`,
                            }}
                        />
                        <div className="absolute inset-0 bg-black/60" />
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 opacity-100 ">
                            <h1 className='h3 !text-white text-center mb-4'>{projectTitle}</h1>
                            <p className="text-white text-center text-lg line-clamp-10 mb-4">
                                {projectDescription}
                            </p>
                            <span className="bg-gradient-to-br border border-blue-800 from-sky-400 to-blue-700 text-stone-700 text-sm font-medium px-3 py-2 rounded-full">
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
'use client';
import React from "react";
import CardHolder from "@/app/components/CardHolder";
import ContentLoader from '@/app/components/spinners/ContentLoader';
import { useCallback, useEffect, useState, useRef } from "react";
import ProjectCard from "@/app/components/ProjectCard";
import { useGSAP } from "@gsap/react";
import { useAuth } from '../../components/AuthContext';
import gsap from "gsap";
import Modal from '../../components/Modal';
const Page = () => {
    const { authRole } = useAuth();
    const pageRef = useRef<HTMLDivElement>(null);
    const [modalView, setModalView] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectTitle, setProjectTitle] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');
    const [projectDate, setProjectDate] = useState<string>('');
    const [projectPath, setProjectPath] = useState<string>('');
    const [projectImageUpload, setProjectImageUpload] = useState<File | null>(null);
    const [projectImagePath, setProjectImagePath] = useState<string | null>(null);

    useGSAP(() => {
        // page fade-in effect
        const page = pageRef.current;
        gsap.fromTo(page, {
        opacity: 0
        }, {
        opacity: 1,
        duration: 2
        });
    });
    
    type Project = { project_id: string; 
                     project_title: string; 
                     project_description: string;
                     project_date: Date;
                     project_authors?: string[];
                     project_path: string;
                     project_image_path: string;
                   };

    const getProjects = useCallback(async (): Promise<Project[]> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/projects`)
            const data = await response.json();
            return data as Project[];
        } catch (error) {
            console.log(error);
            return [];
        }
    }, []);

    const refreshProjects = useCallback( async () => {
        setIsLoading(true);
        const projectData = await getProjects();
        
        setProjects(projectData);

        sessionStorage.setItem('spotify_tracks', JSON.stringify(projectData));
        setIsLoading(false);
    },[getProjects, setProjects]);

    useEffect(() => {
        const loadProjects = async () => {
            setIsLoading(true);

            const cachedProjects = sessionStorage.getItem('projects');
            
            if (cachedProjects) {
                const projectData = JSON.parse(cachedProjects) as Project[];
                setProjects(projectData);
                setIsLoading(false);
            } else {
                const projectData = await getProjects();
                setProjects(projectData);
                sessionStorage.setItem('projects', JSON.stringify(projectData));
                setIsLoading(false);
            }
        };
        loadProjects();
    }, [getProjects]);

    const clearFields = () => {
        setProjectTitle('');
        setProjectDescription('');
        setProjectDate('');
        setProjectPath('');
        setProjectImageUpload(null);
        setProjectImagePath('');
    }

    const handleAddProject = async () => {
        console.log('submitting!');
        setProjectImagePath(projectImageUpload ? `/assets/images/project-images/${projectImageUpload.name}` : null);
        setIsLoading(true);
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('project_title', projectTitle);
        formData.append('project_description', projectDescription);
        formData.append('project_date', projectDate);
        formData.append('project_path', projectPath);
        if (projectImageUpload) {
            formData.append('project_image_path', `/assets/images/project-images/${projectImageUpload.name}`);
            formData.append('image', projectImageUpload);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/projects/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        console.log(response.json());

        await refreshProjects();

        clearFields();
        setModalView(false);
        setIsLoading(false);
    }

    return (
        <div ref={pageRef} className="page-container">
            <div className="mt-5 mb-12 sm:ml-0 text-center sm:text-left">
                <h1 className="h1 ">DEV & DATA.</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto sm:ml-5 mt-2"></div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-8 sm:p-8 shadow-2xl sm:m-0 -m-1">
                <div className="text-center mb-8">
                    <h2 className="h2 !font-bold !from-sky-400 !to-blue-700 mb-3">PERSONAL PROJECTS</h2>
                    <p className="text-stone-600 text-lg max-w-5xl mx-auto mb-5">
                        Below is a showcase of the projects I&apos;ve created!
                    </p>
                    <div className="bg-stone-200 backdrop-blur-sm border border-stone-200 rounded-sm p-6 shadow-lg">
                        <CardHolder className="flex flex-wrap gap-6 items-stretch w-full mb-7">
                            {isLoading ?(
                                <div>
                                    <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                    <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                    <div className="flex-1 min-w-[300px]"><ContentLoader /></div>
                                </div>
                            ) : ( 
                                projects
                                    .map((project) => (
                                        <div key={project.project_id} className="flex-1 min-w-[300px]">
                                            <ProjectCard 
                                                projectId={project.project_id}
                                                projectTitle={project.project_title}
                                                projectDescription={project.project_description}
                                                projectDate={project.project_date}
                                                projectPath={project.project_path}
                                                projectImagePath={project.project_image_path}
                                                onRemove={refreshProjects}
                                            />
                                        </div>
                                    )
                            ))}
                            </CardHolder>
                            {authRole === 'owner' && <>
                                <button onClick={() => setModalView(true)} className="hover:cursor-pointer mb-7 px-6 py-3 bg-gradient-to-r from-red-400 to-rose-300 text-white font-semibold rounded-sm hover:from-red-500 hover:to-rose-400 transform hover:scale-105 transition-all duration-280 shadow-lg">
                                    + Add New Project
                                </button>
                                {modalView && 
                                    <Modal
                                        title='Add New Project'
                                        isOpen={modalView}
                                        onClose={() => {setModalView(false); clearFields(); }}
                                        onSubmit={handleAddProject}
                                    >
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Title:
                                            </label>
                                            <input
                                                value={projectTitle}
                                                onChange={(e) => setProjectTitle(e.target.value.slice(0,100))}
                                                placeholder="New Project"
                                                className="mb-5 w-full p-2 border border-gray-280 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                            />
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description:
                                            </label>
                                            <input
                                                value={projectDescription}
                                                onChange={(e) => setProjectDescription(e.target.value.slice(0,500))}
                                                placeholder="This is a new project!"
                                                className="mb-5 w-full p-2 border border-gray-280 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                            />
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Creation Date:
                                            </label>
                                            <input
                                                value={projectDate}
                                                onChange={(e) => setProjectDate(e.target.value)}
                                                placeholder={`${new Date().toLocaleDateString()}`}
                                                className="mb-5 w-full p-2 border border-gray-280 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                            />
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Project Path:
                                            </label>
                                            <input
                                                value={projectPath}
                                                onChange={(e) => setProjectPath(e.target.value.slice(0,500))}
                                                placeholder={'project-path-here'}
                                                className="mb-5 w-full p-2 border border-gray-280 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                            />
                                            <label htmlFor="project-image" className="px-4 py-2 bg-gradient-to-br from-sky-400 to-blue-700 hover:from-sky-500 hover:to-blue-800 text-white font-semibold rounded-sm hover:cursor-pointer hover:bg-gray-500 block !w-full text-center">
                                                Upload Project Image
                                            </label>
                                            <input 
                                                id="project-image" 
                                                type="file" 
                                                accept=".png,.jpg,.jpeg,.svg"
                                                className="hidden" 
                                                onChange={(e) => {setProjectImageUpload(e.target.files?.[0] ?? null)}}
                                            />
                                            {projectImageUpload && 
                                                <div className="flex flex-col justify-center m-3">
                                                    <img
                                                    src={URL.createObjectURL(projectImageUpload)}
                                                    alt="Preview"
                                                    className="max-w-full h-auto rounded-md shadow-xl mb-3"
                                                    />
                                                    <button 
                                                        type="button"
                                                        onClick={(e) => {e.preventDefault; setProjectImageUpload(null)}}
                                                        className="bg-gradient-to-br hover:cursor-pointer from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-semibold py-2 px-3 rounded-md">
                                                        Remove
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Modal>
                                }
                            </>
                        }  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
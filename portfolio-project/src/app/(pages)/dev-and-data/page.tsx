'use client';
import React from "react";
import CardHolder from "@/app/components/CardHolder";
import ContentLoader from '@/app/components/spinners/ContentLoader';
import { useCallback, useEffect, useState, useRef } from "react";
import ProjectCard from "@/app/components/ProjectCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Page = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    
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

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<Project[]>([]);

    const getProjects = useCallback(async (): Promise<Project[]> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/projects`)
            const data = await response.json();
            return data as Project[];
        } catch (error) {
            console.log(error);
            return [];
        }
    }, [])

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

    return (

            <div ref={pageRef} className="page-container">
                <div className="mt-5 mb-12 sm:ml-0 text-center sm:text-left">
                    <h1 className="h1 ">DEV & DATA.</h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-300 mx-auto sm:ml-5 mt-2"></div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-8 sm:p-8 shadow-2xl sm:m-0 -m-1">
                    <div className="text-center mb-8">
                        <h2 className="h2 !font-bold  mb-3">PERSONAL PROJECTS</h2>
                        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                        Below is a showcase of the projects I&apos;ve created!
                        </p>
                        <div className="bg-stone-200 backdrop-blur-sm border border-stone-200 rounded-sm p-6 shadow-lg">
                            <CardHolder className="flex flex-wrap gap-6 items-stretch w-full mb-7">
                                {isLoading ?(
                                    Array.from({ length: 3 }, (_, index) => (
                                        <div key={`personal-loader-${index}`} className="flex-1 min-w-[300px]">
                                            <ContentLoader />
                                        </div>
                                    ))
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
                                                />
                                            </div>
                                        )
                                ))}
                            </CardHolder>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Page;
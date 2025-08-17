'use client';
import React from "react";
import Card from "@/app/components/Card";
import { useAuth } from '../../components/AuthContext'

const Page = () => {
    const { authRole } = useAuth()
    return (
        <div>
            <div className='w-full max-w-[800px] min-w-[800px] w-flex pt-5 pl-5 pr-5 pb-10'>
                <h1 className="h1">MUSIC.</h1>
                {authRole === 'owner' ? 
                <button className="button mb-10">add music</button>
                : 
                <></>}
                <p>Here you'll be able to find some of the amazing musical projects I've been apart of!</p>
            </div>
            <div className="ml-15">
                <Card title='fundamentally sound'></Card>
            </div>
        </div>
    )
}

export default Page;
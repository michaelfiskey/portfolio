"use client";
import React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react'; 
import { Inject, ScheduleComponent, Day, Week, Month, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import Spinner from '@/app/components/spinners/Spinner';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// syncfusion schedule styling
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';

registerLicense(process.env.SYNCFUSION_KEY ?? "");

type ScheduleResponse = {
    title?: string
    schedules?: ScheduleEvent[]; 
    start?: string
    end?: string
};

type ScheduleEvent = {
    id?: string;
    title: string;
    start: string;
    end: string;
    color?: string;
    names?: string[];
};

const Page = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<ScheduleResponse | null>(null);
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [duration, setDuration] = useState(15)
    const [urlError, setUrlError] = useState('');
    const [url, setUrl] = useState({
        value: '',
        isTouched: false,
        isValid: true,
    });
    const [currentView, setCurrentView] = useState<'Day' | 'Week' | 'Month'>('Week')
    const [scheduleTitle, setScheduleTitle] = useState<string>('Schedule');
    const handleUrlValidation = useCallback((url: string) => {
        try {
            const fullUrl = url.startsWith('http') ? url : `https://${url}`;
            const urlObj = new URL(fullUrl);
            return urlObj.hostname.includes('when2meet.com');
            
        } catch { return false; }
    }, [])

    
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

    const handleSubmit = useCallback(async () => {
        try {
            if (!url.value || !url.isValid) return;

            setIsLoading(true);

            const fullUrl = url.value.startsWith('http') ? url.value : `https://${url}`
            const urlObj = new URL(fullUrl)
            const scheduleId = urlObj.search.slice(1)
            const formattedUrl = `https://www.when2meet.com/?${scheduleId}`

            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URL}/api/scheduler/find-schedules/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: formattedUrl, duration: duration })
            });

            const data = await response.json();
            
            if (!response.ok) {
                setUrlError(data.error)
                setIsLoading(false);
                return;
            }

            setData(data)
            setEvents(data.schedules ? data.schedules.map((item: ScheduleEvent, idx: number) => (
                {  Id: idx, 
                Subject: `Schedule option #${idx + 1}`,
                Description: `Attendees: (${item.names?.length})\n- ${item.names?.join('\n- ') || 'No attendees'}`,
                StartTime: new Date(item.start),
                EndTime: new Date(item.end),
                IsAllDay: false,
                IsReadonly: true,
                CategoryColor: '#f43f5e',
                }
            )): [])

            setScheduleTitle(data.title)

            const dateDiff = new Date(data.end).getTime() - new Date(data.start).getTime();
            const daysDiff = dateDiff / (1000 * 60 * 60 * 24);
            
            if (daysDiff <= 1) {
                setCurrentView('Day');
            } else if (daysDiff <= 7) {
                setCurrentView('Week');
            } else {
                setCurrentView('Month');
            }
            setIsLoading(false);
        } catch {
            setIsLoading(false);
        }
    }, [url, duration]);

    useEffect(() => {
    }, [currentView, scheduleTitle, handleSubmit, data])

    return (
                <div ref={pageRef} className="page-container">
                    <div className="mt-5 mb-12 sm:ml-0 text-center sm:text-left">
                        <h1 className="h1 ">SCHEDULER.</h1>
                        <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-blue-500 mx-auto sm:ml-5 mt-2"></div>
                    </div>
                    <div className="bg-white backdrop-blur-sm p-3 sm:p-8 shadow-2xl rounded-lg">
                        <div className="text-center mb-8">
                            <h2 className="h2 !font-bold mb-3 !from-sky-400 !to-blue-700 ">FIND THE BEST MEETING TIME</h2>
                            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                                Paste a When2Meet schedule URL and select a duration to find the time block where the most people are available from your group.<br/>
                                This tool finds windows where the <em>same group of people</em> is available for the entire duration of each window.
                            </p>
                            <p className='mt-3'>Example URL: <b>https://www.when2meet.com/?32439772-i82cp</b></p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-stone-200/80 rounded-md p-6 shadow-lg mb-8">
                            <label className="label mb-4 w-full text-left">when2meet url:</label>
                            <div className="flex flex-row flex-wrap w-full gap-2 mb-4">
                                <input
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(0, 100);
                                        const isValid = handleUrlValidation(inputValue);
                                        setUrl(prev => ({ ...prev, value: inputValue, isValid: isValid }))
                                        if (isValid) { setUrlError('') } else { setUrlError('Invalid URL!') }
                                    }}
                                    onBlur={() => { setUrl(prev => ({ ...prev, isTouched: true })) }}
                                    placeholder=" https://when2meet.com/example"
                                    className="input rounded-md flex-1 min-w-[200px]"
                                />
                                <select
                                    className="button !px-0 !from-stone-700 !to-stone-600 w-full sm:max-w-[200px]"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                >
                                    <option className='text-stone-700' value={15}>15min</option>
                                    <option className='text-stone-700' value={30}>30min</option>
                                    <option className='text-stone-700' value={45}>45min</option>
                                    <option className='text-stone-700' value={60}>1h</option>
                                    <option className='text-stone-700' value={90}>1h 30min</option>
                                    <option className='text-stone-700' value={120}>2h</option>
                                    <option className='text-stone-700' value={240}>4h</option>
                                    <option className='text-stone-700' value={300}>5h</option>
                                </select>
                                <button
                                    disabled={!url.value || !url.isValid}
                                    onClick={handleSubmit}
                                    className="button !from-sky-500 !to-blue-700 w-full sm:max-w-[200px]"
                                >
                                    Go!
                                </button>
                            </div>
                            {url.isTouched && (!url.value || url.isValid) ? (
                                <p className="mt-3 text-red-500 w-full text-left">{urlError}</p>
                            ) : (url.isTouched && !url.isValid ? (
                                <p className="mt-3 text-red-500 w-full text-left">Invalid URL format!</p>
                            ) : null)}
                        </div>
                        
                        {isLoading && (<Spinner isLoading={isLoading}/>)}
                        
                        {!isLoading && data && 
                        <>
                            <div className="flex flex-col items-center justify-center bg-stone-200/80 rounded-md p-6 shadow-lg mb-8">
                                <p className='text-stone-600 text-xl max-w-2xl mx-auto leading-relaxed'>There were <b>{data?.schedules?.length ?? 0}</b> schedules found with <b>{(data?.schedules && data.schedules[0]?.names?.length) ?? 0}</b> people available...</p>
                            </div>
                            <div className="bg-white/80 border border-stone-200 rounded-md p-6 shadow-lg mt-8">
                                <p className="font-bold text-xl pl-5 mb-2 text-stone-700">{scheduleTitle} options:</p>
                                <div className="mt-4 m-[-10] sm:m-0">
                                    <ScheduleComponent
                                        eventSettings={{ dataSource: events}}
                                        selectedDate={new Date(data?.start ?? Date.now())}
                                        currentView={currentView}
                                        readonly={true}
                                        minDate={(() => {
                                            const date = new Date(data?.start ?? Date.now());
                                            date.setDate(date.getDate() - 1);
                                            return date;
                                        })()}
                                        maxDate={(() => {
                                            const date = new Date(data?.end ?? Date.now());
                                            date.setDate(date.getDate() + 1);
                                            return date;
                                        })()}
                                    >
                                        <ViewsDirective>
                                            <ViewDirective option="Day" />
                                            <ViewDirective option="Week" />
                                            <ViewDirective option="Month" />
                                        </ViewsDirective>
                                        <Inject services={[Day, Week, Month]} />
                                    </ScheduleComponent>
                                </div>
                            </div>
                        </>
                        }

                    </div>
                </div>
            );
}
export default Page;
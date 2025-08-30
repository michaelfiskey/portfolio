"use client";
import React from 'react';
import { useState, useCallback } from 'react'; 
import { Inject, ScheduleComponent, Day, Week, Month, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';


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

registerLicense('Ngo9BigBOggjHTQxAR8/V1JEaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjUXxecXZRTmBYWEJwW0leYw==');

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
    const [data, setData] = useState<ScheduleResponse | null>(null);
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [duration, setDuration] = useState(15)
    const [urlError, setUrlError] = useState('');
    const [url, setUrl] = useState({
        value: '',
        isTouched: false,
        isValid: true,
    });

    const handleUrlValidation = useCallback((url: string) => {
        try {
            const fullUrl = url.startsWith('http') ? url : `https://${url}`;
            const urlObj = new URL(fullUrl);
            return urlObj.hostname.includes('when2meet.com');
            
        } catch { return false; }
    }, [])

    const handleSubmit = async () => {
        try {
            if (!url.value || !url.isValid) return;

            const fullUrl = url.value.startsWith('http') ? url.value : `https://${url}`
            const urlObj = new URL(fullUrl)
            const scheduleId = urlObj.search.slice(1)
            const formattedUrl = `https://www.when2meet.com/?${scheduleId}`

            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URL}/api/find-schedules/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: formattedUrl, duration: duration })
            });

            const data = await response.json();
            
            if (!response.ok) {
                setUrlError(data.error)
                return;
            }

            setData(data)
            setEvents(data.schedules ? data.schedules.map((item: ScheduleEvent, idx: number) => (
                {  Id: idx, 
                Subject: data.title,
                StartTime: new Date(item.start),
                EndTime: new Date(item.end),
                IsAllDay: false,
                }
            )): [])

            console.log(data)
        } catch {

        }
    };

            return (
                <div className="page-container">
                    <div className="mb-12">
                        <h1 className="h1">SCHEDULER.</h1>
                        <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-300 ml-5 mt-2"></div>

                    </div>
                    <div className="bg-white backdrop-blur-sm p-8 shadow-2xl rounded-lg">
                        <div className="text-center mb-8">
                            <h2 className="h2 !font-bold mb-3">FIND THE BEST MEETING TIME</h2>
                            <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
                                Paste a When2Meet schedule URL and select a duration to find the time block where the most people are available from your group.<br/>
                                The tool finds the window where the <em>same group of people</em> is available for the entire duration.
                            </p>
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
                                    className="input rounded-md flex-1 min-w-[250px]"
                                />
                                <select
                                    className="button !px-0 !from-stone-700 !to-stone-600 w-full max-w-[200px]"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                >
                                    <option value={15}>15min</option>
                                    <option value={30}>30min</option>
                                    <option value={45}>45min</option>
                                    <option value={60}>1h</option>
                                    <option value={90}>1h 30min</option>
                                    <option value={120}>2h</option>
                                    <option value={240}>4h</option>
                                    <option value={300}>5h</option>
                                </select>
                                <button
                                    disabled={!url.value || !url.isValid}
                                    onClick={handleSubmit}
                                    className="button w-full max-w-[200px]"
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
                        <div className="bg-white/80 border border-stone-200 rounded-md p-6 shadow-lg mt-8">
                            <p className="font-bold text-xl pl-5 mb-2 text-stone-700">Schedule Results</p>
                            <div className="mt-4">
                                <ScheduleComponent
                                    eventSettings={{ dataSource: events }}
                                    selectedDate={new Date(data?.start ?? Date.now())}
                                    currentView="Month"
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
                    </div>
                </div>
            );
}
export default Page;
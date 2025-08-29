'use client';
import React from 'react';
import { useState, useCallback } from 'react'; 
import { Inject, ScheduleComponent, Day, Week, Month, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';

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
        <div>
            <h1 className="h1">Scheduler.</h1>
            <div className="flex flex-col max-w-[400px]">
                <label className='p-2 text-white bg-stone-700 mb-2'>when2meet url:</label>
                <div className='flex flex-row w-full justify-between gap-2'>
                    <input
                        onChange={(e) => {
                            const inputValue = e.target.value.slice(0, 100);
                            const isValid = handleUrlValidation(inputValue);
                            
                            setUrl(prev => ({
                                ...prev,
                                value: inputValue,
                                isValid: isValid
                            }))

                            if (isValid) { setUrlError('') } else{ setUrlError('Invalid URL!') }
                        }}
                        onBlur={() => { setUrl(prev => ({ ...prev, isTouched: true })) }}
                        placeholder=" https://when2meet.com/example"
                        className='w-full border border-stone-700'
                    />
                    <select 
                    className='bg-stone-700 text-white'
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
                        className='p-3 bg-stone-700 text-white hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
                        Go!
                    </button>
                </div>
            </div>
            {url.isTouched && (!url.value || url.isValid) ? <p className='mt-3 text-red-500'>{urlError}</p> : (url.isTouched && !url.isValid ? <p className='mt-3 text-red-500'>Invalid URL format!</p> : null)}
            <div>
                <ScheduleComponent
                eventSettings={{dataSource: events}}
                selectedDate={new Date(data?.start ?? Date.now())}
                currentView='Month'>
                    <ViewsDirective>
                        <ViewDirective option='Day'/>
                        <ViewDirective option='Week'/>
                        <ViewDirective option='Month'/>
                    </ViewsDirective>
                    <Inject services={[Day, Week, Month]}/>
                </ScheduleComponent>
            </div>
        </div>
    )
}
export default Page;
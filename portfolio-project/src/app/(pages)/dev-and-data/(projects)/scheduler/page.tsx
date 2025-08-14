'use client';
import React from 'react';
import { useRef, useState } from 'react'; 
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
    schedules?: any[]; 
    start?: string
    end?: string
};

type Event = {
    startDate?: Date
    endDate?: Date
    subject?: string
}

const Page = () => {
    const [data, setData] = useState<ScheduleResponse | null>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [duration, setDuration] = useState(15)
    const [url, setUrl] = useState({
        value: '',
        isTouched: false,
        isValid: true,
    });

    const colors = [
        '#FF6B6B', '#4ECDC4', '#FFD93D', '#1A535C', '#FF9F1C', '#5F4B8B', '#FFB7B2', '#6A4C93'
    ];

    const handleUrlValidation = (url: string) => {
        const regex = /^(https:\/\/)?(www\.)?when2meet\.com\/\?[\w-]+$/;
        return regex.test(url);
    }

    const handleSubmit = async () => {
        if (!url.value || !url.isValid) return;
        const response = await fetch('http://localhost:8000/api/find-schedules/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url.value, duration: duration })
        });
        const data = await response.json();
        setData(data)
        setEvents(data.schedules ? data.schedules.map((item: any, idx: number) => (
            {  Id: idx, 
               Subject: data.title,
               StartTime: new Date(item.start),
               EndTime: new Date(item.end),
               IsAllDay: false,
            }
        )): [])

        console.log(data)
    };

    return (    
        <div>
            <h1 className="h1">Scheduler.</h1>
            <div className="flex flex-col max-w-[400px]">
                <label className='p-2 text-white bg-stone-700 mb-2'>when2meet url:</label>
                <div className='flex flex-row w-full justify-between gap-2'>
                    <input
                        onChange={(e) => {
                            setUrl(prev => ({
                                ...prev,
                                value: e.target.value.slice(0, 100),
                                isValid: handleUrlValidation(e.target.value.slice(0, 100))
                            }))
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
            {url.isTouched && !url.value ? <p className='mt-3 text-red-500'>URL is required!</p> : (url.isTouched && !url.isValid ? <p className='mt-3 text-red-500'>Invalid URL format!</p> : null)}
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
            <div>
              {data && data.start && data.end && Array.isArray(data.schedules) ? data.schedules.map((item, idx) => (
                <div key={idx} className="mb-4 p-2 border-b border-stone-300">
                  <div>
                    <strong>Start:</strong> {item.start} <strong>End:</strong> {item.end}
                  </div>
                  <div>
                    <strong>Names:</strong> {Array.isArray(item.names) ? item.names.join(', ') : ''}
                  </div>
                </div>
              )): <p>ERROR DISPLAYING VALUES</p>}
            </div>
        </div>
    )
}
export default Page;
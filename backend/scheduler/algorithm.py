from typing import Optional
import pandas as pd
from datetime import datetime, time, timedelta
from when2meet_scraper import scrape

def get_max_duration(when2meet_schedule : pd.DataFrame):
    today = datetime.today().date()
    
    start_date = when2meet_schedule['date'].iloc[0].date()
    start_time = when2meet_schedule['date'].iloc[0].time()
    end_date = (when2meet_schedule['date'].iloc[-1] + timedelta(minutes=15)).date()
    end_time = (when2meet_schedule['date'].iloc[-1] + timedelta(minutes=15)).time()

    if end_time < start_time:
        time_difference = (datetime.combine(today + timedelta(days=1), end_time) - 
                          datetime.combine(today, start_time))
    else:
        time_difference = datetime.combine(today, end_time) - datetime.combine(today, start_time)
    
    days = (end_date - start_date).days
    hours_per_day = time_difference.total_seconds() / 60
    
    return days * hours_per_day

def assign_song_part(name: str, song: str, part: str, when2meet_schedule: pd.DataFrame):
    df = pd.DataFrame([{'name' : name, song : True, f'{song}_part' : part}])
    new_when2meet_schedule = when2meet_schedule.merge(df, how='outer', on='name')
    new_when2meet_schedule[song].fillna(False, inplace=True)
    print(df.head())
    new_when2meet_schedule.to_csv('test1.csv')
    return new_when2meet_schedule

def optimal_schedule(when2meet_schedule: pd.DataFrame = None, meeting_window=60):
    if meeting_window < 15:
        raise ValueError(f'A meeting window must be at least 15 minutes!')
    max = get_max_duration(when2meet_schedule)
    if meeting_window > max:
        raise ValueError(f'Meeting window has exceeded the schedule! Please choose a smaller meeting window less than {max} minutes.')
    if meeting_window % 15 != 0:
        raise ValueError(f'A meeting window must be an increment of 15 minutes!')
    
    # Convert meeting window to number of 15-minute slots
    slots_needed = meeting_window // 15
    return slots_needed

def main():
    #recording = scrape('https://www.when2meet.com/?27497701-jRmJk')
    recording_small = scrape('https://www.when2meet.com/?31297823-f1ISk')

    #svp = {'Judas' : {'T1' : ['gallop', 'jump'], 'T2': ['skip']}}

    #optimal_recording_schedule(recording_small, songs=svp, recording_window=240)
    #print(recording_small)

    #when2meet_schedule = assign_song_part('skip', 'judas', 't3', recording_small)
    #when2meet_schedule_2 = assign_song_part('gallop', 'blue', 't2', when2meet_schedule)
    print(recording_small.head(30))
    print(optimal_schedule(recording_small, 60))

if __name__ == '__main__':
    main()
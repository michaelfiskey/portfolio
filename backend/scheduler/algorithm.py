import pandas as pd
from datetime import datetime, timedelta
from when2meet_scraper import scrape
pd.set_option('future.no_silent_downcasting', True)

def get_max_duration(when2meet_schedule: pd.DataFrame) -> int:
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

def optimal_schedules(when2meet_schedule: pd.DataFrame = None, meeting_window=60):
    if meeting_window < 15:
        raise ValueError(f'A meeting window must be at least 15 minutes!')
    max_duration = get_max_duration(when2meet_schedule)
    if meeting_window > max_duration:
        raise ValueError(f'Meeting window has exceeded the schedule! Please choose a smaller meeting window less than {max_duration} minutes.')
    if meeting_window % 15 != 0:
        raise ValueError(f'A meeting window must be an increment of 15 minutes!')
    
    when2meet_schedule['available'] = True
    pivot = when2meet_schedule.pivot_table(
        index='date',
        columns='name',
        values='available',
        fill_value=False,
        aggfunc='any'
    )

    start, window_start = pivot.index.min(), pivot.index.min()
    end = pivot.index.max()
    date_range = pd.date_range(start=start, end=end, freq='15min')
    empty_schedule = pd.DataFrame({'date': date_range})

    schedule = empty_schedule.join(pivot, on='date', how='left').fillna(False).infer_objects(copy=False)
    
    schedule_tracker = {}

    while (window_start < end) and (end - window_start) >= timedelta(minutes=meeting_window):
        window_end = window_start + timedelta(minutes=meeting_window)
        available = schedule.loc[(schedule['date'] >= window_start) & (schedule['date'] < window_end), schedule.columns[1:]].all(axis=0)

        names = available[available].index.tolist()

        if len(names) in schedule_tracker:
            schedule_tracker[len(names)].append({'start': window_start, 'end': window_end, 'names': names})
        else:
            schedule_tracker[len(names)] = [{'start': window_start, 'end': window_end, 'names': names}]

        window_start += timedelta(minutes=15)

    if not schedule_tracker or max(schedule_tracker.keys()) == 0:
        return 'NO SCHEDULES FOUND'
    return schedule_tracker[max(schedule_tracker.keys())]


def main():
    recording = scrape('https://www.when2meet.com/?27497701-jRmJk')
    #recording_small = scrape('https://www.when2meet.com/?31297823-f1ISk')

    #svp = {'Judas' : {'T1' : ['gallop', 'jump'], 'T2': ['skip']}}

    #optimal_recording_schedule(recording_small, songs=svp, recording_window=240)
    #print(recording_small)

    #when2meet_schedule = assign_song_part('skip', 'judas', 't3', recording_small)
    #when2meet_schedule_2 = assign_song_part('gallop', 'blue', 't2', when2meet_schedule)
    print(recording.head(30))
    print(optimal_schedules(recording, 15))

if __name__ == '__main__':
    main()
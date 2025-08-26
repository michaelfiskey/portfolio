import pandas as pd
from datetime import datetime, timedelta

pd.set_option('future.no_silent_downcasting', True)

def get_max_duration(schedule: pd.DataFrame) -> int:
    today = datetime.today().date()
    
    start_date = schedule['date'].iloc[0].date()
    start_time = schedule['date'].iloc[0].time()
    end_date = (schedule['date'].iloc[-1] + timedelta(minutes=15)).date()
    end_time = (schedule['date'].iloc[-1] + timedelta(minutes=15)).time()

    if end_time < start_time:
        time_difference = (datetime.combine(today + timedelta(days=1), end_time) - 
                          datetime.combine(today, start_time))
    else:
        time_difference = datetime.combine(today, end_time) - datetime.combine(today, start_time)
    
    days = (end_date - start_date).days
    hours_per_day = time_difference.total_seconds() / 60
    
    return days * hours_per_day

def optimal_schedules(schedule: pd.DataFrame = None, meeting_window=60):
    if meeting_window < 15:
        raise ValueError(f'A meeting window must be at least 15 minutes!')
    max_duration = get_max_duration(schedule)
    if meeting_window > max_duration:
        raise ValueError(f'Meeting window has exceeded the schedule! Please choose a smaller meeting window less than {max_duration} minutes.')
    if meeting_window % 15 != 0:
        raise ValueError(f'A meeting window must be an increment of 15 minutes!')
    
    schedule['available'] = True
    pivot = schedule.pivot_table(
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

    full_schedule = empty_schedule.join(pivot, on='date', how='left').fillna(False).infer_objects(copy=False)
    
    schedule_tracker = {}

    while (window_start < end) and (end - window_start) >= timedelta(minutes=meeting_window):
        window_end = window_start + timedelta(minutes=meeting_window)
        available = full_schedule.loc[(full_schedule['date'] >= window_start) & (full_schedule['date'] < window_end), full_schedule.columns[1:]].all(axis=0)

        names = available[available].index.tolist()

        if len(names) in schedule_tracker:
            schedule_tracker[len(names)].append({'start': window_start, 'end': window_end, 'names': names})
        else:
            schedule_tracker[len(names)] = [{'start': window_start, 'end': window_end, 'names': names}]

        window_start += timedelta(minutes=15)

    if not schedule_tracker or max(schedule_tracker.keys()) == 0:
        return 'NO SCHEDULES FOUND'
    return start, end, schedule_tracker[max(schedule_tracker.keys())]

def main():
    pass

if __name__ == '__main__':
    main()
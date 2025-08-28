import pandas as pd
from datetime import datetime, timedelta

pd.set_option('future.no_silent_downcasting', True)

def get_schedule_length(schedule: pd.DataFrame) -> int:
    """
    Gets the total duration of a When2Meet schedule, taking into account the start and end times of each day within the schedule.

        Args:
            schedule (pd.DataFrame): A When2Meet Pandas DataFrame 
            that contains the datetimes in which >=1 or more people are avaialble 
            and the corresponding people available, sorted by datetime, then by name.

        Returns:
            int: length of schedule in minutes.       
    """
    if (schedule.empty): raise ValueError('Schedule must not be empty!') 

    today = datetime.today().date()

    start_date = schedule['date'].iloc[0].date()
    start_time = schedule['date'].iloc[0].time()

    # add 15 minutes because each time chunk is denoated by its START time (so schedule end is 15 minutes after last date/time window)
    end_date = (schedule['date'].iloc[-1] + timedelta(minutes=15)).date()
    end_time = (schedule['date'].iloc[-1] + timedelta(minutes=15)).time()

    # extracting the date from the start and end datetime objects opens up the posibility of end_time < start_time.
    if end_time < start_time:
        time_difference = (datetime.combine(today + timedelta(days=1), end_time) - 
                          datetime.combine(today, start_time))
    else:
        time_difference = datetime.combine(today, end_time) - datetime.combine(today, start_time)
    
    days = (end_date - start_date).days if (end_date - start_date).days > 0 else 1

    minutes_per_day = time_difference.total_seconds() / 60
    
    return days * minutes_per_day

def optimal_schedules(schedule: pd.DataFrame = None, meeting_window=60):
    """
    Finds all possible meeting windows of a given length where the maximum number of participants are available.

    Args:
        schedule (pd.DataFrame): A When2Meet DataFrame with columns 'date' (datetime) and 'name' (participant),
            containing all available time slots for each participant. Must be sorted by datetime, then by name.
        meeting_window (int): Desired meeting length in minutes. Must be at least 15, a multiple of 15 and less than the When2Meet schedule length.

    Returns:
        tuple: (start, end, windows)
            - start (datetime): Earliest time in the schedule.
            - end (datetime): Latest time in the schedule (+15 minutes because each time in the schedule is the start of a 15 minute increment).
            - windows (list[dict] or None): List of dictionaries, each with keys 'start', 'end', and 'names' (participants available for the window).
              Returns None if no valid meeting windows are found.

    Raises:
        ValueError: If the schedule is empty, meeting_window is invalid, or meeting_window exceeds the schedule length.

    Example:
        start, end, windows = optimal_schedules(schedule, meeting_window=60)
        if windows is None:
            print("No meeting windows found.")
        else:
            for window in windows:
                print(window)
    """
    if schedule.empty:
        raise ValueError(f'Schedule must not be empty!')
    if meeting_window < 15:
        raise ValueError(f'Meeting window must be at least 15 minutes!')
    if meeting_window % 15 != 0:
        raise ValueError(f'Meeting window must be an increment of 15 minutes!')
    max_duration = get_schedule_length(schedule)
    if meeting_window > max_duration:
        raise ValueError(f'Meeting window has exceeded the schedule! Please choose a smaller meeting window less than {max_duration} minutes.')
    
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

    while (window_start < end) and ((end - window_start) >= timedelta(minutes=meeting_window)):
        window_end = window_start + timedelta(minutes=meeting_window)
        available = full_schedule.loc[(full_schedule['date'] >= window_start) & (full_schedule['date'] < window_end), full_schedule.columns[1:]].all(axis=0)

        names = available[available].index.tolist()

        if len(names) in schedule_tracker:
            schedule_tracker[len(names)].append({'start': window_start, 'end': window_end, 'names': names})
        else:
            schedule_tracker[len(names)] = [{'start': window_start, 'end': window_end, 'names': names}]

        window_start += timedelta(minutes=15)

    if not schedule_tracker or max(schedule_tracker.keys()) == 0:
        return start, end, None
    
    return start, end + timedelta(minutes=15), schedule_tracker[max(schedule_tracker.keys())]
from datetime import datetime, timezone
from typing import Dict, List, Tuple
import pandas as pd
import requests
import re
import pdb

def parse(html: str) -> Tuple[str, pd.DataFrame]:
    """
    Parses the raw html of a When2Meet schedule and sorts availiblity data into a Pandas DataFrame object.

        Args:
            html (str): Raw When2Meet HTML

        Returns:
            tuple: A tuple containing (title, DataFrame) where:
            - title (str): The meeting title from the page
            - DataFrame: Pandas DataFrame with columns ['name', 'date']           
    """

    # regex matching
    title_match = re.search(r'<title>(.+?)<\/title>', html)
    name_matches = re.findall(r"PeopleNames\[(\d+)\] = '([^']+)';", html)
    id_matches = re.findall(r"PeopleIDs\[(\d+)\] = (\d+);", html)
    time_of_slot_matches = re.findall(r'TimeOfSlot\[(\d+)\]\s*=\s*(\d+);', html)
    available_at_slot_matches = re.findall(r'AvailableAtSlot\[(\d+)\].push\((\d+)\);', html)

    if (len(name_matches) < 1 or len(id_matches) < 1):
        raise ValueError('No participant names or IDs found in the provided When2Meet HTML.')
    if (len(time_of_slot_matches) < 1):
        raise ValueError('No valid timeslots found in the provided When2Meet HTML.')
    
    if title_match: title = title_match.group(1).replace(' - When2meet', '').strip()
    else: 
        start_date = datetime.fromtimestamp(int(time_of_slot_matches[0][1]), tz=timezone.utc).date()
        end_date = datetime.fromtimestamp(int(time_of_slot_matches[len(time_of_slot_matches) - 1][1]), tz=timezone.utc).date()
        title = f'New Schedule ({start_date} - {end_date})' if (start_date < end_date) else f'New Schedule ({start_date})'
        
    if (not available_at_slot_matches):
        return title, pd.DataFrame({})
    
    # convert matching lists into dictionaries to prep to convert data into a Pandas DataFrame object
    names_dict = {int(index): name for index, name in name_matches}
    ids_dict = {int(index): int(id) for index, id in id_matches}
    id_name_dict = {ids_dict[i]: names_dict[i] for i in names_dict if i in ids_dict}
    time_of_slot_dict = {int(index) : datetime.fromtimestamp(int(time), tz=timezone.utc) for index, time in time_of_slot_matches}
    available_at_slot_dict: Dict[int, List[str]] = {}

    for index, person_id in available_at_slot_matches:
        slot = time_of_slot_dict[int(index)]
        name = id_name_dict.get(int(person_id), str(person_id))
        if slot not in available_at_slot_dict:
            available_at_slot_dict[slot] = [name]
        else:
            available_at_slot_dict[slot].append(name)
    
    # DataFrame object construction
    rows = []
    for date, people in available_at_slot_dict.items():
        for name in people:
            rows.append({'date': date, 'name' : name})

    schedule = pd.DataFrame(rows, columns=['date', 'name'])
    schedule.sort_values(by=['date', 'name'], inplace=True)
    schedule.reset_index(drop=True, inplace=True)
    
    return title, schedule
    
def scrape(url: str) -> pd.DataFrame:
    '''
    Scrapes a raw When2Meet schedule html and parses availibility data.

        Raises:
            ValueError: If the HTTP request fails or returns non-200 status

        Returns:
            tuple: A tuple containing (title, DataFrame) where:
            - title (str): The meeting title from the page
            - DataFrame: Pandas DataFrame with columns ['name', 'date']     
    '''

    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Failed to fetch data from {url}. Status code: {response.status_code}")
    html = response.text
    return parse(html)


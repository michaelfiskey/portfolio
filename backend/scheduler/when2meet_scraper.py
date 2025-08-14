from datetime import datetime
from typing import Dict, List
import pandas as pd
import requests
import re

def scrape(url: str) -> pd.DataFrame:
    
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Failed to fetch data from {url}. Status code: {response.status_code}")

    html = response.text

    title_match = re.search(r'<title>(.*?)<\/title>', html)
    if title_match:
        title = title_match.group(1).replace(' - When2meet', '').strip()
    else:
        title = None
    name_matches = re.findall(r"PeopleNames\[(\d+)\] = '([^']+)';", html)
    id_matches = re.findall(r"PeopleIDs\[(\d+)\] = (\d+);", html)
    time_of_slot_matches = re.findall(r'TimeOfSlot\[(\d+)\]\s*=\s*(\d+);', html)
    available_at_slot_matches = re.findall(r'AvailableAtSlot\[(\d+)\].push\((\d+)\);', html)

    names_dict = {int(index): name for index, name in name_matches}
    ids_dict = {int(index): int(id) for index, id in id_matches}
    id_name_dict = {ids_dict[i]: names_dict[i] for i in names_dict if i in ids_dict}
    time_of_slot_dict = {int(index) : datetime.fromtimestamp(int(time)) for index, time in time_of_slot_matches}
    available_at_slot_dict: Dict[int, List[str]] = {}

    for index, person_id in available_at_slot_matches:
        slot = time_of_slot_dict[int(index)]
        name = id_name_dict.get(int(person_id), str(person_id))
        if slot not in available_at_slot_dict:
            available_at_slot_dict[slot] = [name]
        else:
            available_at_slot_dict[slot].append(name)

    rows = [
        {'name': name, 'date': date}
        for date, people in available_at_slot_dict.items()
        for name in people
    ]

    when2meet_schedule = pd.DataFrame(rows, columns=['name', 'date'])
    when2meet_schedule.sort_values(by=['date', 'name'], inplace=True)
    when2meet_schedule.reset_index(drop=True, inplace=True)
    
    return title, when2meet_schedule
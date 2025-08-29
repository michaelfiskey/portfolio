from django.test import TestCase
from .scraper import scrape, parse
from .algorithm import optimal_schedules, get_schedule_length
from datetime import datetime, timedelta, timezone
import pandas as pd


class ScraperTests(TestCase):
    
    # Test existing website w/ non 200 status response raises ValueError
    def test_invalid_url(self):
        with self.assertRaises(ValueError):
            scrape('https://httpbin.org/status/404')

    # Test non existing website (connection error) raises Exception
    def test_nonexistent_url(self):
        with self.assertRaises(Exception):
            scrape('https://thisdoesnotexist12345.com')
    
    def test_title_regex(self):

        # Test that the title regex removes the '- When2meet' tag
        html1 = f'''
        <title>Test1 Meeting - When2meet</title>
        PeopleIDs[0] = 112941342;
        PeopleNames[0] = 'Test';
        TimeOfSlot[0] = 1731427200;
        AvailableAtSlot[0].push(112941342);
        '''
        title1, schedule = parse(html1)
        self.assertEqual(title1, 'Test1 Meeting')

        # Test that the title functionality works even without '- When2meet' tag
        html2 = f'''
        <title>Test2 Meeting</title>
        PeopleIDs[0] = 112941342;
        PeopleNames[0] = 'Test';
        TimeOfSlot[0] = 1731427200;
        AvailableAtSlot[0].push(112941342);
        '''
        title2, schedule = parse(html2)
        self.assertEqual(title2, 'Test2 Meeting')

        # Test that title is changed to:
        # 'New Schedule (datetime.fromtimestamp(int(time_of_slot_matches[0], tz=timezone.utc)).date() - datetime.fromtimestamp(int(time_of_slot_matches[len(time_of_slot_matches, tz=timezone.utc) - 1])).date())'
        # IFF title match is not found AND
        # datetime.fromtimestamp(int(time_of_slot_matches[0], tz=timezone.utc)).date() < datetime.fromtimestamp(int(time_of_slot_matches[len(time_of_slot_matches, tz=timezone.utc) - 1])).date()
        timestamp1 = 1731427200
        timestamp2 = 1731827200
        timestamp3 = 1732427200

        html3 = f'''
        <title></title>
        PeopleIDs[0] = 112941342;
        PeopleNames[0] = 'Test';
        TimeOfSlot[0] = {timestamp1};
        TimeOfSlot[1] = {timestamp2};
        TimeOfSlot[2] = {timestamp3};
        AvailableAtSlot[0].push(112941342);
        '''
        title3, schedule = parse(html3)
        self.assertEqual(title3, f'New Schedule ({datetime.fromtimestamp(timestamp1, tz=timezone.utc).date()} - {datetime.fromtimestamp(timestamp3, tz=timezone.utc).date()})')

        # Test that title is changed to:
        # 'New Schedule (datetime.fromtimestamp(int(time_of_slot_matches[0], tz=timezone.utc)).date())'
        # IFF title match is not found AND 
        # datetime.fromtimestamp(int(time_of_slot_matches[0], tz=timezone.utc)).date() >= datetime.fromtimestamp(int(time_of_slot_matches[len(time_of_slot_matches, tz=timezone.utc) - 1])).date()
        timestamp1 = 1731427200
        
        html4 = f'''
        <title></title>
        PeopleIDs[0] = 112941342;
        PeopleNames[0] = 'Test';
        TimeOfSlot[0] = {timestamp1};
        AvailableAtSlot[0].push(112941342);
        '''
        title4, schedule = parse(html4)
        self.assertEqual(title4, f'New Schedule ({datetime.fromtimestamp(timestamp1, tz=timezone.utc).date()})')
        
    
    #Test missing regex matches before the Dataframe construction process.
    def test_missing_peoplenames_array(self):
        # HTML with missing PeopleNames array
        html_no_names = f'''
        <title>Test Meeting - When2meet</title>
        PeopleIDs[0] = 112941342;
        TimeOfSlot[0] = 1731427200;
        AvailableAtSlot[0].push(112941342);
        '''

        with self.assertRaises(ValueError) as context: 
            parse(html_no_names)
        self.assertIn('No participant names or IDs found in the provided When2Meet HTML.', str(context.exception))
    
    def test_missing_peopleids_array(self):
        # HTML with missing PeopleIDs array
        html_no_ids = f'''
        <title>Test Meeting - When2meet</title>
        PeopleNames[0] = Aidan;
        TimeOfSlot[0] = 1731427200;
        AvailableAtSlot[0].push(112941342);
        '''
        
        with self.assertRaises(ValueError) as context: 
            parse(html_no_ids)
        self.assertIn('No participant names or IDs found in the provided When2Meet HTML.', str(context.exception))
    
    def test_missing_timeofslot_array(self):
        # HTML with missing TimeOfSlot array
        html_no_timeslots = f'''
        <title>Test Meeting - When2meet</title>
        PeopleIDs[0] = 112941342;
        PeopleNames[0] = 'Test';
        AvailableAtSlot[0].push(112941342);
        '''
        
        with self.assertRaises(ValueError) as context: 
            parse(html_no_timeslots)
        self.assertIn('No valid timeslots found in the provided When2Meet HTML.', str(context.exception))

    def test_missing_availableatslot_array(self):
        # HTML with missing AvailableAtSlot array
        html_no_available_slots = f'''
        <title>Test Meeting - When2meet</title>
        PeopleIDs[0] = 112941342;
        PeopleNames[0] = 'Test';
        TimeOfSlot[0] = 1731427200;
        '''

        title, schedule = parse(html_no_available_slots)
        self.assertTrue(schedule.empty)

    # Test basic dataframe structure on one person and one datetime
    def test_basic_dataframe_structure(self):
        timestamp = 1731427200
        datetime_from_timestamp = datetime.fromtimestamp(timestamp, tz=timezone.utc)

        html = f'''
        <title>Test Meeting - When2meet</title>
        PeopleNames[0] = 'Aidan';
        PeopleIDs[0] = 112941342;
        TimeOfSlot[0] = {timestamp};
        AvailableAtSlot[0].push(112941342);
        ''' 

        title, schedule = parse(html)

        self.assertListEqual(list(schedule.columns), ['date', 'name'])
        self.assertEqual(schedule.iloc[0]['date'], datetime_from_timestamp)
        self.assertEqual(schedule.iloc[0]['name'], 'Aidan')

    # Test dataframe structure on multiple people and datetimes
    def test_dataframe_structure_multiple(self):
        start_timestamp = 1731427200
        end_timestamp = start_timestamp + 200000
        datetime_from_start_timestamp = datetime.fromtimestamp(start_timestamp, tz=timezone.utc)
        datetime_from_end_timestamp = datetime.fromtimestamp(end_timestamp, tz=timezone.utc)

        html = f'''
        <title>Test Meeting - When2meet</title>
        PeopleNames[0] = 'Aidan';
        PeopleNames[1] = 'Erick';
        PeopleNames[2] = 'Jordan';
        PeopleIDs[0] = 112941342;
        PeopleIDs[1] = 112941355;
        PeopleIDs[2] = 112941367;
        TimeOfSlot[0] = {start_timestamp};
        TimeOfSlot[1] = {start_timestamp + 100000};
        TimeOfSlot[2] = {end_timestamp};
        AvailableAtSlot[0].push(112941342);
        AvailableAtSlot[0].push(112941355);
        AvailableAtSlot[1].push(112941342);
        AvailableAtSlot[2].push(112941342);
        AvailableAtSlot[2].push(112941355);
        AvailableAtSlot[2].push(112941367);
        ''' 

        title, schedule = parse(html)

        self.assertListEqual(list(schedule.columns), ['date', 'name'])
        self.assertEqual(schedule.iloc[0]['date'], datetime_from_start_timestamp)
        self.assertEqual(schedule.iloc[0]['name'], 'Aidan')
        self.assertEqual(schedule.iloc[-1]['date'], datetime_from_end_timestamp)
        self.assertEqual(schedule.iloc[-1]['name'], 'Jordan')

class AlgorithmTests(TestCase):
    non_empty_schedule_placeholder = schedule = pd.DataFrame({'date' : [datetime.fromtimestamp(1731452400, tz=timezone.utc), datetime.fromtimestamp(1731725100, tz=timezone.utc)], 'name' : ['Aidan', 'Erick']})
    empty_schedule_placeholder = pd.DataFrame({})

    # Test get_schedule_length() from 2024-11-12 5PM to 2024-11-15 1AM (minus 15 minutes)
    def test_get_schedule_length_end_time_less_than_start_time(self):
        schedule = pd.DataFrame({'date' : [datetime.fromtimestamp(1731430800, tz=timezone.utc), datetime.fromtimestamp(1731631500, tz=timezone.utc)], 'name' : ['Aidan', 'Erick']})
        
        length = get_schedule_length(schedule)
        self.assertEqual(length, 1440)

    # Test get_schedule_length() from 2024-11-12 5PM to 2024-11-15 9PM (minus 15 minutes)
    def test_get_schedule_length_end_time_greater_than_start_time(self):
        schedule = pd.DataFrame({'date' : [datetime.fromtimestamp(1731430800, tz=timezone.utc), datetime.fromtimestamp(1731703500, tz=timezone.utc)], 'name' : ['Aidan', 'Erick']})
        
        length = get_schedule_length(schedule)
        self.assertEqual(length, 720)
    
    '''optimal_schedules() error handling tests'''
    # Empty schedule test
    def test_optimal_schedules_empty_schedule(self):
        with self.assertRaises(ValueError) as context: 
            optimal_schedules(schedule=self.empty_schedule_placeholder, meeting_window=60)
        self.assertIn('Schedule must not be empty!', str(context.exception))
    
    # <15 minute meeting window test
    def test_optimal_schedules_meeting_window_less_than_15_minutes(self):
        with self.assertRaises(ValueError) as context: 
            optimal_schedules(schedule=self.non_empty_schedule_placeholder, meeting_window=8)
        self.assertIn('Meeting window must be at least 15 minutes!', str(context.exception))
    
    # 15 != 0 meeting window test
    def test_optimal_schedules_meeting_window_not_increment_of_15_minutes(self):
        with self.assertRaises(ValueError) as context: 
            optimal_schedules(schedule=self.non_empty_schedule_placeholder, meeting_window=21)
        self.assertIn('Meeting window must be an increment of 15 minutes!', str(context.exception))

    # meeting_window > max_duration
    def test_optimal_schedules_meeting_window_greater_than_max_duration(self):
        with self.assertRaises(ValueError) as context: 
            optimal_schedules(schedule=self.non_empty_schedule_placeholder, meeting_window=19005)
        self.assertIn(f'Meeting window has exceeded the schedule! Please choose a smaller meeting window less than {get_schedule_length(self.non_empty_schedule_placeholder)} minutes.', str(context.exception))

    ''' optimal_schedules() functionality testing '''
    def test_optimal_schedules_all_available(self):
        # Two people, two 15 minute slots, both available
        times = [datetime(2025, 8, 28, 10, 0), datetime(2025, 8, 28, 10, 15)]
        data = [
            {'date': times[0], 'name': 'Alice'},
            {'date': times[0], 'name': 'Bob'},
            {'date': times[1], 'name': 'Alice'},
            {'date': times[1], 'name': 'Bob'},
        ]
        schedule = pd.DataFrame(data)
        start, end, windows = optimal_schedules(schedule, meeting_window=15)
        self.assertEqual(start, times[0])
        self.assertEqual(end, times[1] + timedelta(minutes=15))
        self.assertEqual(len(windows), 1)
        self.assertEqual(windows[0]['names'], ['Alice', 'Bob'])

    def test_optimal_schedules_partial_overlap(self):
        # Two people, two 15 minute slots, only Alice is available for both
        times = [datetime(2025, 8, 28, 10, 0), datetime(2025, 8, 28, 10, 15)]
        data = [
            {'date': times[0], 'name': 'Alice'},
            {'date': times[0], 'name': 'Bob'},
            {'date': times[0], 'name': 'Jill'},
            {'date': times[1], 'name': 'Alice'},
            {'date': times[1], 'name': 'Joe'},
        ]
        schedule = pd.DataFrame(data)
        start, end, optimal_schedule = optimal_schedules(schedule, meeting_window=15)
        self.assertIn('Alice', optimal_schedule[0]['names'])
        self.assertIn('Bob', optimal_schedule[0]['names'])
        self.assertNotIn('Joe', optimal_schedule[0]['names'])

    def test_optimal_schedules_no_overlap(self):
        # Two people, no overlapping slots, no people available for meeting window provided.
        times = [datetime(2025, 8, 28, 10, 0), datetime(2025, 8, 28, 10, 15)]
        data = [
            {'date': times[0], 'name': 'Alice'},
            {'date': times[1], 'name': 'Bob'},
        ]
        schedule = pd.DataFrame(data)
        start, end, optimal_schedule = optimal_schedules(schedule, meeting_window=30)
        self.assertEqual(optimal_schedule, None)
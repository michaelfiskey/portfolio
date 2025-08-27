from django.test import TestCase
from .scraper import scrape, parse
from datetime import datetime 
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
        # 'New Schedule (datetime.fromtimestamp(int(time_of_slot_matches[0])).date() - datetime.fromtimestamp(int(time_of_slot_matches[len(time_of_slot_matches) - 1])).date())'
        # IFF title match is not found AND
        # datetime.fromtimestamp(int(time_of_slot_matches[0])).date() < datetime.fromtimestamp(int(time_of_slot_matches[len(time_of_slot_matches) - 1])).date()
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
        self.assertEqual(title3, f'New Schedule ({datetime.fromtimestamp(timestamp1).date()} - {datetime.fromtimestamp(timestamp3).date()})')

        # Test that title is changed to:
        # 'New Schedule (datetime.fromtimestamp(int(time_of_slot_matches[0])).date())'
        # IFF title match is not found AND 
        # datetime.fromtimestamp(int(time_of_slot_matches[0])).date() >= datetime.fromtimestamp(int(time_of_slot_matches[len(time_of_slot_matches) - 1])).date()
        timestamp1 = 1731427200
        
        html4 = f'''
        <title></title>
        PeopleIDs[0] = 112941342;
        PeopleNames[0] = 'Test';
        TimeOfSlot[0] = {timestamp1};
        AvailableAtSlot[0].push(112941342);
        '''
        title4, schedule = parse(html4)
        self.assertEqual(title4, f'New Schedule ({datetime.fromtimestamp(timestamp1).date()})')
        
    
    # Test missing regex matches before the Dataframe construction process.
    def test_individual_dataframe_parts(self):
        
        timestamp = 1731427200

        # HTML with missing PeopleNames array
        html_no_names = f'''
        <title>Test Meeting - When2meet</title>
        PeopleIDs[0] = 112941342;
        TimeOfSlot[0] = {timestamp};
        AvailableAtSlot[0].push(112941342);
        '''

        with self.assertRaises(ValueError) as context: 
            parse(html_no_names)
        self.assertIn('No participant names or IDs found in the provided When2Meet HTML.', str(context.exception))
    
        # HTML with missing PeopleIDs array
        html_no_ids = f'''
        <title>Test Meeting - When2meet</title>
        PeopleNames[0] = Aidan;
        TimeOfSlot[0] = {timestamp};
        AvailableAtSlot[0].push(112941342);
        '''
        
        with self.assertRaises(ValueError) as context: 
            parse(html_no_ids)
        self.assertIn('No participant names or IDs found in the provided When2Meet HTML.', str(context.exception))

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

    # Test basic dataframe structure on one person and one date/time
    def test_basic_dataframe_structure(self):
        timestamp = 1731427200
        datetime_from_timestamp = datetime.fromtimestamp(timestamp)

        html = f'''
        <title>Test Meeting - When2meet</title>
        PeopleNames[0] = 'Aidan';
        PeopleIDs[0] = 112941342;
        TimeOfSlot[0] = {timestamp};
        AvailableAtSlot[0].push(112941342);
        ''' 

        title, schedule = parse(html)

        self.assertListEqual(list(schedule.columns), ['name', 'date'])
        self.assertEqual(schedule.iloc[0]['name'], 'Aidan')
        self.assertEqual(schedule.iloc[0]['date'], datetime_from_timestamp)
    
    
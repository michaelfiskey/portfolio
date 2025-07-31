from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .when2meet_scraper import scrape
from .algorithm import optimal_schedules
import json
from rest_framework.decorators import api_view, permission_classes

from datetime import datetime
import pandas as pd


@api_view(['POST'])
@permission_classes([AllowAny])
def scrape_view(request):
    url = request.data.get('url')
    if not url:
        return Response({'error': 'No URL provided'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        df = scrape(url)
        schedules = optimal_schedules(df)

        for window in schedules:
            for key in ['start', 'end']:
                if isinstance(window.get(key), (pd.Timestamp, datetime)):
                    window[key] = window.get(key).isoformat()
        return Response({'result': schedules})
    except Exception as e:
        print("SCRAPE ERROR:", e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

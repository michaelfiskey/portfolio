from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .scraper import scrape
from .algorithm import optimal_schedules
from rest_framework.decorators import api_view, permission_classes
from datetime import datetime
import pandas as pd

@api_view(['POST'])
@permission_classes([AllowAny])
def find_schedules(request):
    url = request.data.get('url')
    if not url:
        return Response({'error': 'No URL provided'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        title, df = scrape(url)
        start, end, schedules = optimal_schedules(df, request.data.get('duration'))

        for window in schedules:
            for key in ['start', 'end']:
                if isinstance(window.get(key), (pd.Timestamp, datetime)):
                    window[key] = window.get(key).isoformat()
        return Response({'title': title, 'start': start, 'end': end, 'schedules': schedules})
    except Exception as e:
        print("SCRAPE ERROR:", e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

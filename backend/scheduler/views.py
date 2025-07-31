from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .when2meet_scraper import scrape
import json
from rest_framework.decorators import api_view, permission_classes


@api_view(['POST'])
@permission_classes([AllowAny])
def scrape_view(request):
    url = request.data.get('url')
    if not url:
        return Response({'error': 'No URL provided'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        df = scrape(url)
        data = json.loads(df.to_json(orient='records'))
        return Response({'result': data})
    except Exception as e:
        print("SCRAPE ERROR:", e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
import base64
from io import BytesIO
from PIL import Image

@api_view(['POST'])
@permission_classes([AllowAny])
def guess_the_number(request):
    print('entered!')
    image = request.data.get('image')
    if not image:
        return Response({'error': 'No number image received!'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        if ',' in image: image = image.split(',')[1]
        img_bytes = base64.b64decode(image)
        img = Image.open(BytesIO(img_bytes)).convert('L')
        img.show()

        return Response({'message': 'success!', 'prediction' : 'not yet implemented!'})
    
    except Exception as e:
        print("ERROR:", e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


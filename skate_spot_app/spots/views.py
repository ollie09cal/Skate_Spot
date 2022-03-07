from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.exceptions import NotFound 
from django.db import IntegrityError 

from .models import Spot
from .serializers.common import SpotSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Create your views here.
class SpotListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly)

    def get(self, _request):
        spots = Spot.objects.all()
        serialized_spots = SpotSerializer(spots, many=True)
        return Response(serialized_spots.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        serialized_data = SpotSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        except:
            return Response(
                { "detail": "Unprocessable Entity" },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
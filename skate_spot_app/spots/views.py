from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.exceptions import NotFound, PermissionDenied 
from django.db import IntegrityError 

from .models import Spot
from .serializers.common import SpotSerializer
from .serializers.populated import PopulatedSpotSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Create your views here.
class SpotListView(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        print("trying request")
        print(request.data)
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

class SpotDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    def get_spot(self, pk):
        try:
            return Spot.objects.get(pk=pk)
        except Spot.DoesNotExist:
            raise NotFound(detail="Festival Not Found")
    
    def get(self, _request, pk):
        spot = self.get_spot(pk=pk)
        serialized_spot = PopulatedSpotSerializer(spot)
        return Response(serialized_spot.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        spot_to_delete = self.get_spot(pk=pk)
        if spot_to_delete.owner != request.owner:
            raise PermissionDenied(detail="unauthorised")
        spot_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        spot_to_update = self.get_spot(pk=pk)
        serialized_spot = SpotSerializer(spot_to_update, data=request.data)
        try:
            serialized_spot.is_valid()
            serialized_spot.save()
            return Response(serialized_spot.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
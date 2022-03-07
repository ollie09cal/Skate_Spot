from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status 

from rest_framework.exceptions import NotFound, PermissionDenied
from django.db import IntegrityError

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import LikeSerializer

from .models import Like
# Create your views here.

class LikeListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly)

    def post(self, request):
        request.data["owner"] = request.user.id

        serialized_like = LikeSerializer(data=request.data)
        try:
            serialized_like.is_valid()
            serialized_like.save()
            return Response(serialized_like.data, status=status.HTTP_201_CREATED)
        except:
            return Response({
                "detail": "Unauthorised"
            }, status=status.HTTP_400_BAD_REQUEST)

class DetailLikeView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly)

    def delete(self, request, pk):
        try:
            like_to_delete = Like.objects.get(pk=pk)
            if like_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            like_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Like.DoesNotExist:
            raise NotFound(detail="no like has been found for this post")
        except:
            return Response({
                "detail": "Failed to remove Like"
            }, status=status.HTTP_401_UNAUTHORIZED)
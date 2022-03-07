from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status

from rest_framework.exceptions import NotFound, PermissionDenied 
from django.db import IntegrityError

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import CommentSerializer

from .models import Comment
# Create your views here.

class CommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly)

    def post(self, request):
        request.data["owner"] = request.user.id

        serialized_comment = CommentSerializer(data=request.data)
        try:
            serialized_comment.is_valid()
            serialized_comment.save()
            return Response(serialized_comment.data, status=status.HTTP_201_CREATED)
        except AssertionError as e:
            print(str(e))
            return Response({
                "detail": str(e)
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({
                "detail": "Unprocessable Entity"
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly)
    def delete(self, request, pk):
        try:
            comment_to_delete = Comment.objects.get(pk=pk)
            if comment_to_delete.owner != request.owner:
                raise PermissionDenied(detail="unauthorised")
            comment_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")
        except:
            return Response({
                "detail": "Failed to delete Comment"
            }, status=status.HTTP_401_UNAUTHORIZED)
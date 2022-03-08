from .common import SpotSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from likes.serializers.populated import LikeSerializer

class PopulatedSpotSerializer(SpotSerializer):
    comments = PopulatedCommentSerializer(many=True)
    likes = LikeSerializer(many=True)
    
from .common import LikeSerializer 
from jwt_auth.serializers.common import UserSerializer 

class PopulatedLikeSerializer(LikeSerializer):
    owner = UserSerializer()
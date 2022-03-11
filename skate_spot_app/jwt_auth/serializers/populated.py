from .common import UserSerializer
from spots.serializers.populated import PopulatedSpotSerializer

class PopulatedUserSerializer(UserSerializer):
    spots = PopulatedSpotSerializer(many=True)
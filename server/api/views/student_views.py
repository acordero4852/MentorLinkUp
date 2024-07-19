from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from api.serializers import *
from api.models import Profile
from api.permissions import IsOwner, IsMentor
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from api.filters import ProfileFilter

# Mentor search
class MentorListView(generics.ListAPIView):
    queryset = Profile.objects.filter(is_mentor=True)
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ProfileFilter
    search_fields = ['user__first_name', 'user__last_name', 'bio']

# Mentor Linkup Request
class MentorLinkupRequestView(APIView):
    pass #TODO

    

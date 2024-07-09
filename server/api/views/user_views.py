# server/api/views/user_views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import UserRegistrationSerializer
from api.models import Profile
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class UserRegisterView(APIView):
    @swagger_auto_schema(
        request_body=UserRegistrationSerializer,
        responses={
            201: openapi.Response('User created successfully'),
            400: openapi.Response('Bad Request'),
        }
    )
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, 
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        return Response({
            'is_mentor': profile.is_mentor,
            'is_active': profile.is_active,
            'date_joined': profile.date_joined,
            'schools': [school.name for school in profile.schools.all()],
            'degrees': [degree.name for degree in profile.degrees.all()],
            'classes': [class_.name for class_ in profile.degrees.all()],
            'clubs': [club.name for club in profile.clubs.all()],
            'bio': profile.bio
        })
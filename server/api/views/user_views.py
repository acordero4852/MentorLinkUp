# server/api/views/user_views.py

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from api.serializers import UserRegistrationSerializer, UserLoginSerializer, ProfileSerializer
from api.models import Profile
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, 
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)

class UserListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
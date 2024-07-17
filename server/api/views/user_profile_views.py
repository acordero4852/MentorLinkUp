# server/api/views/user_views.py
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from api.serializers import *
from api.models import Profile
from api.permissions import IsOwner, IsMentor

# authorization
class UserProfileRegisterView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': user.id,
                'is_mentor': user.profile.is_mentor,
                'first_name': user.first_name,
                'last_name': user.last_name
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.id,
            'is_mentor': user.profile.is_mentor,
            'first_name': user.first_name,
            'last_name': user.last_name
        }, status=status.HTTP_200_OK)
    
class UserProfileRefreshTokenView(APIView):
    # TODO: Implement this view
    pass
    
# update
class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return profile
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User updated successfully'},
                            status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# get user profiles and details

class UserProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UserProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailsSerializer

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        return Profile.objects.get(user_id=user_id)
    
class UserProfileSelfView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailsSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return profile

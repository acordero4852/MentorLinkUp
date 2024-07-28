# server/api/views/user_views.py
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from api.serializers import *
from api.models import Profile
from api.permissions import IsOwner, IsMentor
from api.filters import ProfileFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.db.models import Count, Q, Case, When, IntegerField, F


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

# list all user profiles. Can be filtered and searched.
class UserProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ProfileFilter
    search_fields = ['user__first_name', 'user__last_name', 'bio']

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

# mentor suggestion views (get mentors with similar interests ie. school, degree, class, club)
class MentorListView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.filter(is_mentor=True)
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return profile

    def get_queryset(self):
        profile = self.request.user.profile
        queryset = Profile.objects.filter(is_mentor=True).annotate(
            school_match=Count('schools', filter=Q(schools__in=profile.schools.all())),
            degree_match=Count('degrees', filter=Q(degrees__in=profile.degrees.all())),
            class_match=Count('classes', filter=Q(classes__in=profile.classes.all())),
            club_match=Count('clubs', filter=Q(clubs__in=profile.clubs.all())),
        ).annotate(
            total_score=F('school_match') + F('degree_match') + F('class_match') + F('club_match')
        ).order_by('-total_score')[:10]
        return queryset
    

    
# Linkup request views

# create a linkup request
class LinkupRequestCreateView(generics.CreateAPIView):
    serializer_class = LinkupRequestSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return profile
    
    def perform_create(self, serializer):
        sender = self.get_object()
        receiver_id = self.request.data.get('receiver_id')
        receiver = Profile.objects.get(user_id=receiver_id)
        serializer.save(sender=sender, receiver=receiver)

# update a linkup request (accept or reject)
class LinkupRequestUpdateView(generics.UpdateAPIView):
    queryset = LinkupRequest.objects.all()
    serializer_class = LinkupRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        linkup_request_id = self.kwargs.get('linkup_request_id')
        linkup_request = LinkupRequest.objects.get(id=linkup_request_id)
        if linkup_request.receiver != profile:
            self.permission_denied(self.request, message='You can only update a linkup request you received')
        return linkup_request
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Linkup request updated successfully'},
                            status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# get linkup requests
class LinkupRequestListView(generics.ListAPIView):
    queryset = LinkupRequest.objects.all()
    serializer_class = LinkupRequestSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return LinkupRequest.objects.filter(receiver=profile, date_responded=None)

# Link views

class LinkListView(generics.ListAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return Link.objects.filter(profile1=profile) | Link.objects.filter(profile2=profile)


# Messaging views

# # Chat Serializers
# class MessageSerializer(serializers.ModelSerializer):
#     sender = CompactProfileSerializer(read_only=True)

#     class Meta:
#         model = Message
#         fields = ['id', 'sender', 'content', 'date_sent']

#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         user_profile = self.context['request'].user.profile

#         if user_profile == instance.sender:
#             representation['sender'] = 'You'

#         return representation
    
#     def create(self, validated_data):
#         sender = self.context['request'].user.profile
#         content = validated_data.get('content')
#         # check if either a chat id or receiver id is provided
#         chat_id = self.context['view'].kwargs.get('chat_id')
#         receiver_id = self.context['view'].kwargs.get('receiver_id')
#         if chat_id:
#             chat = Chat.objects.get(id=chat_id)
#         elif receiver_id:
#             try:
#                 receiver = Profile.objects.get(user_id=receiver_id)
#                 chat = Chat.objects.create()
#                 chat.profiles.add(sender, receiver)
#                 chat.save()
#             except:
#                 raise serializers.ValidationError('Receiver ID is invalid')
#         else:
#             raise serializers.ValidationError('Chat ID or Receiver ID must be provided')
        
#         try:
#             message = Message.objects.create(
#                 chat=chat,
#                 sender=sender,
#                 content=content
#             )
#             message.save()
#         except:
#             raise serializers.ValidationError('Error creating message')
#         return message

# send message and create a chat if it doesn't exist
class SendMessageView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return profile

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.context['request'] = request
        serializer.context['view'] = self
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Message sent successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# get chats
class ChatListView(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return Chat.objects.filter(profiles=profile)

# get a chat with all messages
class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        chat_id = self.kwargs.get('chat_id')
        return Chat.objects.get(id=chat_id)

    def get_queryset(self):
        chat = self.get_object()
        return Message.objects.filter(chat=chat)



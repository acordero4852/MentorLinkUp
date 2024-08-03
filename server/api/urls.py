from django.contrib import admin
from django.urls import include, path

from api.views.user_profile_views import *
from api.views.app_data_views import *

urlpatterns = [
    # User authentication, registration, and management
    path('users/register/', UserProfileRegisterView.as_view(), name='register'),
    path('users/login/', UserProfileLoginView.as_view(), name='login'),
    # Get all users or filter users. example: /users/?search=John&is_mentor=true&school=UCLA
    path('users/', UserProfileListView.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserProfileDetailView.as_view(), name='user-detail'),
    # Update and get current user (requirs authentication)
    path('users/self/update/', UserProfileUpdateView.as_view(), name='user-update'),
    path('users/self/', UserProfileSelfView.as_view(), name='user-detail'),

    # Linkup request views
    path('users/linkup/', LinkupRequestCreateView.as_view(), name='linkup-create'),
    path('users/linkup/requests/', LinkupRequestListView.as_view(), name='linkup-list'),
    path('users/linkup/requests/<int:linkup_request_id>/', LinkupRequestUpdateView.as_view(), name='linkup-update'),    
    # Link (friends) views
    path('users/links/', LinkListView.as_view(), name='link-list'),
    # mentor match views (gets top 10 mentors with similar interests)
    path('users/mentor_match/', MentorListView.as_view(), name='mentor-list'),

    # Messaging views
    path('users/messages/', SendMessageView.as_view(), name='message-list'),
    path('users/chats/', ChatListView.as_view(), name='chat-list'),
    path('users/chats/<int:chat_id>/', MessageListView.as_view(), name='chat-detail'),

    # school, degree, class, club
    path('schools/', SchoolListView.as_view(), name='school-list'),
    path('degrees/', DegreeListView.as_view(), name='degree-list'),
    path('classes/', ClassListView.as_view(), name='class-list'),
    path('clubs/', ClubListView.as_view(), name='club-list'),
]
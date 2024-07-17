from django.contrib import admin
from django.urls import include, path

from api.views.user_profile_views import *
from api.views.app_data_views import *
from api.views.student_views import *

urlpatterns = [
    # User authentication, registration, and management
    path('users/register/', UserProfileRegisterView.as_view(), name='register'),
    path('users/login/', UserProfileLoginView.as_view(), name='login'),
    path('users/', UserProfileListView.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserProfileDetailView.as_view(), name='user-detail'),
    # requirs authentication
    path('users/self/update/', UserProfileUpdateView.as_view(), name='user-update'),
    path('users/self/', UserProfileSelfView.as_view(), name='user-detail'),
    # mentor search
    path('mentors/', MentorListView.as_view(), name='mentor-list'),
    # school, degree, class, club
    path('schools/', SchoolListView.as_view(), name='school-list'),
    path('degrees/', DegreeListView.as_view(), name='degree-list'),
    path('classes/', ClassListView.as_view(), name='class-list'),
    path('clubs/', ClubListView.as_view(), name='club-list'),
]
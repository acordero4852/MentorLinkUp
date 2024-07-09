from django.contrib import admin
from django.urls import include, path

from .views.user_views import *

urlpatterns = [
    # User authentication, registration, and management
    path('users/register/', UserRegisterView.as_view(), name='register'),
    # path('users/login/', UserLoginView.as_view(), name='login'),
    # path('users/', UserListView.as_view(), name='user-list'),
    # path('users/<int:id>/', UserDetailView.as_view(), name='user-detail'),
    # mentor search

]
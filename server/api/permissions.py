from rest_framework import permissions
from api.models import Profile

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class IsMentor(permissions.BasePermission):
    def has_permission(self, request, view):
        profile = Profile.objects.get(user=request.user)
        return profile.is_mentor
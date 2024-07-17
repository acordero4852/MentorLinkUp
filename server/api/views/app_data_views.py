from rest_framework import generics
from api.serializers import SchoolSerializer, DegreeSerializer, ClassSerializer, ClubSerializer
from api.models import School, Degree, Class, Club

class SchoolListView(generics.ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class DegreeListView(generics.ListAPIView):
    queryset = Degree.objects.all()
    serializer_class = DegreeSerializer

class ClassListView(generics.ListAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class ClubListView(generics.ListAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

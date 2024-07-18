import django_filters
from api.models import Profile

class ProfileFilter(django_filters.FilterSet):
    school = django_filters.CharFilter(field_name='school__name', lookup_expr='icontains')
    degree = django_filters.CharFilter(field_name='degree__name', lookup_expr='icontains')
    class_name = django_filters.CharFilter(field_name='class__name', lookup_expr='icontains')
    club = django_filters.CharFilter(field_name='club__name', lookup_expr='icontains')

    class Meta:
        model = Profile
        fields = ['school', 'degree', 'class_name', 'club']
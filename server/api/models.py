from django.db import models
from django.contrib.auth.models import User

class School(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "schools"

class Degree(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateTimeField()
    is_completed = models.BooleanField()
    estimated_end_date = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "degrees"

class Class(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "classes"

class Club(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "clubs"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_mentor = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Matching Criteria
    schools = models.ManyToManyField('School', blank=True)
    degrees = models.ManyToManyField('Degree', blank=True)
    classes = models.ManyToManyField('Class', blank=True)
    clubs = models.ManyToManyField('Club', blank=True)

    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
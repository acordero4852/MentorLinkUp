from django.db import models
from django.contrib.auth.models import User

# User models and application data models

class School(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "schools"

class Degree(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
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
    

# Linkup models

class LinkupRequest(models.Model):
    sender = models.ForeignKey(Profile, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(Profile, related_name='receiver', on_delete=models.CASCADE)
    date_sent = models.DateTimeField(auto_now_add=True)
    date_responded = models.DateTimeField(blank=True, null=True)
    is_accepted = models.BooleanField(default=False)

    class Meta:
        db_table = "linkup_requests"

class Mentors(models.Model):
    mentor = models.ForeignKey(Profile, related_name='mentor', on_delete=models.CASCADE)
    mentee = models.ForeignKey(Profile, related_name='mentee', on_delete=models.CASCADE)
    date_linked = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "mentors"

# Messaging models

class Chat(models.Model):
    profiles = models.ManyToManyField(Profile)

    class Meta:
        db_table = "chats"

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "messages"
        ordering = ['timestamp']
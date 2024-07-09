from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    is_mentor = serializers.BooleanField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'is_mentor']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        Profile.objects.create(
            user=user,
            is_mentor=validated_data['is_mentor']
        )

        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid email or password.')
            if not user.check_password(password):
                raise serializers.ValidationError('Invalid email or password.')
        else:
            raise serializers.ValidationError('Must provide both email and password')
        
        data['user'] = user
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user',
                'is_mentor', 'is_active', 'date_joined', 
                'schools', 'degrees', 'classes', 'clubs', 
                'bio'
        ]
from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *
import logging

logger = logging.getLogger(__name__)

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
        fields = ['email', 'password', 'first_name', 'last_name', 'is_mentor']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
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
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'username': {'required': False}
        }

class CompactUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']
        extra_kwargs = {
            'username': {'required': False}
        }

class CompactProfileSerializer(serializers.ModelSerializer):
    user = CompactUserSerializer()

    class Meta:
        model = Profile
        fields = ['user',
                'is_mentor', 'is_active'
        ]

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user',
                'is_mentor', 'is_active', 'date_joined', 'bio'
        ]

class ProfileDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    schools = SchoolSerializer(many=True, required=False)
    degrees = DegreeSerializer(many=True, required=False)
    classes = ClassSerializer(many=True, required=False)
    clubs = ClubSerializer(many=True, required=False)

    class Meta:
        model = Profile
        fields = ['user',
                'is_mentor', 'is_active', 'date_joined', 
                'schools', 'degrees', 'classes', 'clubs', 
                'bio'
        ]

class ProfileUpdateSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    schools = serializers.PrimaryKeyRelatedField(many=True, queryset=School.objects.all(), required=False)
    degrees = serializers.PrimaryKeyRelatedField(many=True, queryset=Degree.objects.all(), required=False)
    classes = serializers.PrimaryKeyRelatedField(many=True, queryset=Class.objects.all(), required=False)
    clubs = serializers.PrimaryKeyRelatedField(many=True, queryset=Club.objects.all(), required=False)

    class Meta:
        model = Profile
        fields = ['user',
                'is_mentor', 'is_active', 'date_joined', 
                'schools', 'degrees', 'classes', 'clubs', 
                'bio'
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        schools_data = validated_data.pop('schools', None)
        degrees_data = validated_data.pop('degrees', None)
        classes_data = validated_data.pop('classes', None)
        clubs_data = validated_data.pop('clubs', None)

        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()

        instance.is_mentor = validated_data.get('is_mentor', instance.is_mentor)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()

        #set based on ids
        if schools_data is not None:
            instance.schools.set(schools_data)
        if degrees_data is not None:
            instance.degrees.set(degrees_data)
        if classes_data is not None:
            instance.classes.set(classes_data)
        if clubs_data is not None:
            instance.clubs.set(clubs_data)

        return instance
    
class LinkupRequestSerializer(serializers.ModelSerializer):
    sender = CompactProfileSerializer(read_only=True)
    is_accepted = serializers.BooleanField(required=False)

    class Meta:
        model = LinkupRequest
        fields = ['id', 'sender', 'date_sent',
                  'date_responded', 'is_accepted']
    
    def update(self, instance, validated_data):
        instance.is_accepted = validated_data.get('is_accepted', instance.is_accepted)
        # set to current time
        if 'is_accepted' in validated_data:
            instance.date_responded = timezone.now()
        if instance.is_accepted == True:
            if not Link.objects.filter(profile1=instance.sender, profile2=instance.receiver).exists() and not Link.objects.filter(profile1=instance.receiver, profile2=instance.sender).exists():
                try:
                    # create a new link
                    link = Link.objects.create(
                        profile1=instance.sender,
                        profile2=instance.receiver
                    )
                    link.save()
                    logger.debug('Link created between {} and {}'.format(instance.sender.user.username, instance.receiver.user.username))
                except Exception as e:
                    logger.error('Error creating link between {} and {}. Error: {}'.format(instance.sender.user.username, instance.receiver.user.username, e))
        instance.save()
        return instance
    

class LinkSerializer(serializers.ModelSerializer):
    profile1 = CompactProfileSerializer(read_only=True)
    profile2 = CompactProfileSerializer(read_only=True)

    class Meta:
        model = Link
        fields = ['id', 'profile1', 'profile2', 'date_linked']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_profile = self.context['request'].user.profile
        
        if representation['profile1']['user']['id'] == user_profile.user.id:
            del representation['profile1']
            representation['link'] = representation['profile2']
            del representation['profile2']
        if representation['profile2']['user']['id'] == user_profile.user.id:
            del representation['profile2']
            representation['link'] = representation['profile1']
            del representation['profile1']

        return representation

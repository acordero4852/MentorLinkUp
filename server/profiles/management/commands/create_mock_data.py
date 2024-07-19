import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth.models import User
from api.models import Profile, School, Degree, Class, Club

class Command(BaseCommand):
    help = 'Create mock data'

    def handle(self, *args, **kwargs):
        try:
            # check if database is empty
            if Profile.objects.exists():
                self.stdout.write(self.style.SUCCESS('Database already has data!'))
                return

            fake = Faker()

            # Mock data for 3 Schools
            School.objects.create(name='New Jersey Institute of Technology',
                                description='Public research university in Newark, New Jersey')
            School.objects.create(name='Rutgers University',
                                description='State university in New Jersey')
            School.objects.create(name='Stevens Institute of Technology',
                                description='Private research university in Hoboken, New Jersey')
            
            # Mock data for 3 Degrees
            Degree.objects.create(name='Computer Science',
                                description='Study of computers and computational systems')
            Degree.objects.create(name='Information Technology',
                                description='Study of technology that processes data')
            Degree.objects.create(name='Cybersecurity',
                                description='Study of protecting computer systems from theft or damage')
            
            # Mock data for 3 Classes
            Class.objects.create(name='Data Structures',
                                description='Study of organizing and storing data')
            
            Class.objects.create(name='Algorithms',
                                description='Study of solving problems with data')
            
            Class.objects.create(name='Operating Systems',
                                description='Study of managing computer hardware and software resources')
            
            # Mock data for 3 Clubs
            Club.objects.create(name='ACM',
                                description='Association for Computing Machinery')
            Club.objects.create(name='IEEE',
                                description='Institute of Electrical and Electronics Engineers')
            Club.objects.create(name='Cybersecurity Club',
                                description='Club for cybersecurity enthusiasts')
            
            # Mock data for 1 Admin User
            admin = User.objects.create_superuser(username='admin',
                                        first_name='Admin',
                                        last_name='User',
                                        email='admin@admin.com',
                                        password='password')
            profile = Profile.objects.create(user=admin, is_mentor=True, bio='Admin User',
                                            is_active=False)
            
            # Mock data for 100 Users
            for _ in range(100):
                
                try:
                    user = User.objects.create_user(username=fake.user_name(),
                                                    first_name=fake.first_name(),
                                                    last_name=fake.last_name(),
                                                    email=fake.email(),
                                                    password='password')
                    
                    profile = Profile.objects.create(user=user,
                                        is_mentor=random.choice([True, False]),
                                        bio=fake.text())
                    
                    # Ranom assignment of profile matching criteria
                    for _ in range(random.randint(1, 3)):
                        profile.schools.add(random.choice(School.objects.all()))
                        profile.degrees.add(random.choice(Degree.objects.all()))
                        profile.classes.add(random.choice(Class.objects.all()))
                        profile.clubs.add(random.choice(Club.objects.all()))
                    profile.save()
                except Exception as e:
                    self.stdout.write(self.style.ERROR('Error creating user: {}'.format(e)))
                    continue

                self.stdout.write(self.style.SUCCESS('Profile created for user: {}'.format(user.username)))

            self.stdout.write(self.style.SUCCESS('Mock data has been created!'))

        except Exception as e:
            self.stdout.write(self.style.ERROR('Error creating mock data: {}'.format(e)))
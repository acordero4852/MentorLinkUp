# Generated by Django 4.2 on 2024-07-16 19:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_profile_delete_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='degree',
            name='estimated_end_date',
        ),
        migrations.RemoveField(
            model_name='degree',
            name='is_completed',
        ),
        migrations.RemoveField(
            model_name='degree',
            name='start_date',
        ),
    ]
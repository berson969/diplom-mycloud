# Generated by Django 5.0.6 on 2024-06-15 09:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='user_folder',
            new_name='folder_name',
        ),
    ]

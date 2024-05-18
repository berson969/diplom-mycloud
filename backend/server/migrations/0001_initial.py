# Generated by Django 5.0.6 on 2024-05-17 16:42

import django.contrib.auth.models
import django.core.validators
import django.db.models.deletion
import django.utils.timezone
import server.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(unique=True, verbose_name='Логин')),
                ('first_name', models.CharField(max_length=40, verbose_name='Имя')),
                ('last_name', models.CharField(max_length=40, verbose_name='Фамилия')),
                ('user_folder', models.CharField(blank=True, max_length=100, verbose_name='user_folder')),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Список пользователей',
                'ordering': ('id', 'username'),
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(blank=True, max_length=60, verbose_name='Название файла')),
                ('file', models.FileField(upload_to=server.models.user_file_upload_path, validators=[django.core.validators.FileExtensionValidator(['tiff', 'jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx'])], verbose_name='File')),
                ('size', models.PositiveIntegerField(blank=True, null=True, verbose_name='Размер файла')),
                ('upload_date', models.DateField(auto_now_add=True, verbose_name='Дата загрузки')),
                ('last_download_date', models.DateField(blank=True, null=True, verbose_name='Дата последней загрузки')),
                ('comment', models.CharField(blank=True, max_length=255, verbose_name='Комментарий')),
                ('storage_path', models.CharField(blank=True, max_length=255, verbose_name='Путь хранения')),
                ('file_url', models.URLField(blank=True, max_length=300, verbose_name='URL файла')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

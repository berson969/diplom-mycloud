from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from server.models import File, User


class CustomUserCreationForm(UserCreationForm):
	class Meta:
		model = User
		fields = ('email', 'password', 'first_name', 'last_name')


class CustomUserChangeForm(UserChangeForm):
	class Meta:
		model = User
		fields = '__all__'


@admin.register(User)
class CustomUserAdmin(UserAdmin):
	model = User
	add_form = CustomUserCreationForm
	form = CustomUserChangeForm


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
	model = File
	list_display = ('file_name', 'user', 'size', 'comment', 'path', 'unique_id')

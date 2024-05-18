from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import FileExtensionValidator
from django.utils.translation import gettext_lazy as _
from django.db import models
from rest_framework.exceptions import ValidationError

allowed_extensions = ['tiff', 'jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx']


class User(AbstractUser):
	"""
	Стандартная модель пользователей
	"""
	username = models.CharField(verbose_name='Логин', unique=True)
	first_name = models.CharField(verbose_name='Имя', max_length=40, blank=False)
	last_name = models.CharField(verbose_name='Фамилия', max_length=40, blank=False)
	user_folder = models.CharField(max_length=100, verbose_name="user_folder", blank=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)

	def __str__(self):
		return self.username

	class Meta:
		verbose_name = 'Пользователь'
		verbose_name_plural = "Список пользователей"
		ordering = ('id', 'username',)

	def _generate_user_folder(self, username):
		"""
		Генерирует user_folder на основе username.
		"""
		return f'{username}_folder/'


def user_file_upload_path(instance):
	"""
		Функция для динамического определения пути загрузки файла на основе значения поля user_folder
		модели User.
	"""
	return instance.user.user_folder


class File(models.Model):
	file_name = models.CharField(verbose_name='Название файла', max_length=60, blank=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	file = models.FileField(
		upload_to=user_file_upload_path,
		validators=[
			FileExtensionValidator(allowed_extensions),
		],
		verbose_name=_('File'),
	)
	size = models.PositiveIntegerField(verbose_name='Размер файла', null=True, blank=True)
	upload_date = models.DateField(verbose_name='Дата загрузки', auto_now_add=True)
	last_download_date = models.DateField(verbose_name='Дата последней загрузки', null=True, blank=True)
	comment = models.CharField(verbose_name='Комментарий', max_length=255, blank=True)
	storage_path = models.CharField(verbose_name='Путь хранения', max_length=255, blank=True)
	file_url = models.URLField(verbose_name='URL файла', max_length=300, blank=True)

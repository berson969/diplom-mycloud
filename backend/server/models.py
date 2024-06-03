import os
from uuid import uuid4

from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import FileExtensionValidator
from django.utils.translation import gettext_lazy as _
from django.db import models

allowed_extensions = ['tiff', 'jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx', 'gif']


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

	def save(self, *args, **kwargs):
		if not self.user_folder:
			self.user_folder = f"{self.username}_folder"
		super(User, self).save(*args, **kwargs)

	def __str__(self):
		return self.username

	class Meta:
		verbose_name = 'Пользователь'
		verbose_name_plural = "Список пользователей"
		ordering = ('id', 'username',)


def _create_upload_path(instance, value):
	name = instance.file_name or value
	path, file_name = instance.create_path_and_file_name(instance.user.id, name)
	instance.path = path
	instance.file_name = file_name  # Устанавливаем путь в поле path и file_name
	return path


class File(models.Model):
	file_name = models.CharField(verbose_name='Название файла', max_length=255, blank=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	file = models.FileField(
		upload_to=_create_upload_path,
		validators=[
			FileExtensionValidator(allowed_extensions),
		],
		verbose_name=_('File'),
	)
	size = models.PositiveIntegerField(verbose_name='Размер файла', null=True, blank=True)
	upload_date = models.DateField(verbose_name='Дата загрузки', auto_now_add=True)
	last_download_date = models.DateField(verbose_name='Дата последнего скачивания', null=True, blank=True)
	comment = models.CharField(verbose_name='Комментарий', max_length=255, default='', blank=True)
	path = models.CharField(verbose_name='Путь хранения', max_length=255, blank=True)
	unique_id = models.CharField(verbose_name='Уникальный идентификатор', max_length=50, blank=True)

	def create_path_and_file_name(self, user_id, name):
		user = User.objects.get(id=user_id)
		_, file_name_only = os.path.split(name)
		base_name, extension = os.path.splitext(file_name_only)

		counter = 1
		unique_name = file_name_only

		while File.objects.filter(user=user_id, file_name=unique_name).exists():
			unique_name = f"{base_name}_{counter}{extension}"
			counter += 1

		path = f"{user.user_folder}/{unique_name}"
		file_name = unique_name
		return path, file_name

	def save(self, *args, **kwargs):
		if not self.unique_id:
			self.unique_id = uuid4().hex
		name = self.file_name or self.file.name
		if self.file:
			self.size = self.file.size
		super().save(*args, **kwargs)

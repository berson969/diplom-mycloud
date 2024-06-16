from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import File, User


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'id',
			'username',
			'email',
			# 'first_name',
			# 'last_name',
			'password',
			'folder_name',
			'is_staff',
		]

	def create(self, validated_data):
		validated_data['password'] = make_password(validated_data['password'])
		return super().create(validated_data)

	def update(self, instance, validated_data):
		if 'password' in validated_data:
			validated_data['password'] = make_password(validated_data['password'])
		return super().update(instance, validated_data)


class FileSerializer(serializers.ModelSerializer):

	class Meta:
		model = File
		fields = [
			'id',
			'file_name',
			'user',
			'file',
			'size',
			'upload_date',
			'last_download_date',
			'comment',
			'path',
			'unique_id',
		]

	def validate(self, attrs):
		# Проверка, существует ли файл с таким же именем у этого пользователя
		name = attrs.get('file_name')
		user_id = self.instance.user.id if self.instance else attrs['user'].id
		if File.objects.filter(user=user_id, file_name=name).exists():
			# Генерация уникального имени файла и пути
			final_file_name = name or attrs['file'].name
			path, file_name = File().create_path_and_file_name(user_id, final_file_name)

			attrs['path'] = path
			attrs['file_name'] = file_name
		return attrs

	def create(self, validated_data):
		# Дополнительная логика при создании новой записи
		instance = File(**validated_data)
		instance.save()
		return instance

	def update(self, instance, validated_data):
		# Дополнительная логика при обновлении записи
		for attr, value in validated_data.items():
			# проверяем, что загруженный файл не изменился
			if attr == 'file' and instance.file and instance.file.name != value.name:
				instance.file = value
				instance.size = value.size
			else:
				setattr(instance, attr, value)
		instance.save()
		return instance

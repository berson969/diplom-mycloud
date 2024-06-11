import os

from django.utils import timezone
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.http import JsonResponse, FileResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, File
from .serializers import UserSerializer, FileSerializer


class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	def get_permissions(self):
		if self.action == 'destroy':
			self.permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticated, ]
		elif self.action in ['update', 'partial_update']:
			self.permission_classes = [permissions.IsAuthenticated, ]
		else:
			self.permission_classes = [permissions.AllowAny]
		return super().get_permissions()

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		try:
			serializer.is_valid(raise_exception=True)
			user = serializer.save()
			if not isinstance(user, User):
				raise ValueError("Created object is not a user")

		except Exception as e:
			return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
		response_data = {
			'message': 'Успешная регистрация',
			'user': UserSerializer(user).data
		}
		return Response(response_data, status=status.HTTP_201_CREATED)


@csrf_exempt
def user_login(request):
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')
		user = authenticate(request, username=username, password=password)

		if user is not None:
			login(request, user)
			response_data = {
				'message': 'Успешная авторизация',
				'user': {
					'id': user.id,
					'username': user.username,
					'email': user.email,
					'is_superuser': user.is_superuser,
					'is_authenticated': user.is_authenticated,
					'is_staff': user.is_staff,
					'user_folder': user.user_folder,
				}
			}
			return JsonResponse(response_data, status=status.HTTP_200_OK)
		else:
			response_data = {
				'message': 'Неверный логин или пароль',
			}
			return JsonResponse(response_data, status=status.HTTP_401_UNAUTHORIZED)
	else:
		response_data = {
			'message': 'Метод не поддерживается'
		}
		return JsonResponse(response_data, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@csrf_exempt
def user_logout(request):
	try:
		logout(request)
		response_data = {
			'message': 'Выход из системы выполнен',
		}
		return JsonResponse(response_data, status=status.HTTP_200_OK)
	except User.DoesNotExist:
		response_data = {
			'message': 'Пользователь не залогинен',
		}
		return JsonResponse(response_data, status=status.HTTP_302_FOUND)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class FileViewSet(viewsets.ModelViewSet):
	queryset = File.objects.all()
	serializer_class = FileSerializer
	permission_classes = [permissions.IsAuthenticated]

	def list(self, request, user_folder=None, *args, **kwargs):
		if request.user.is_superuser:
			# Получаем параметр user_folder из запроса, если он есть
			if not user_folder:
				return Response({"message": "Не указан идентификатор хранилища"}, status=status.HTTP_400_BAD_REQUEST)
			# Проверяем, существует ли пользователь с указанным идентификатором хранилища
			try:
				user = User.objects.get(user_folder=user_folder)
			except User.DoesNotExist:
				return Response({"message": "Пользователь с указанным идентификатором хранилища не найден"},
								status=status.HTTP_404_NOT_FOUND)
			# Получаем список файлов для указанного пользователя
			queryset = File.objects.filter(user=user)
		else:
			# Если пользователь не администратор, получаем список файлов только для текущего пользователя
			queryset = File.objects.filter(user=request.user)

		serializer = self.serializer_class(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request, *args, **kwargs):
		serializer = FileSerializer(data=request.data)
		if serializer.is_valid():
			file_instance = serializer.save(user=request.user)
			return Response(FileSerializer(file_instance).data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def update(self, request, pk=None, *args, **kwargs):
		file_instance = self.queryset.filter(user=request.user, pk=pk).first()
		if not file_instance:
			return Response({"message": "Файл не найден"}, status=status.HTTP_404_NOT_FOUND)
		serializer = FileSerializer(file_instance, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def destroy(self, request, pk=None, *args, **kwargs):
		file_instance = self.queryset.filter(user=request.user, pk=pk).first()
		if not file_instance:
			return Response({"message": "Файл не найден"}, status=status.HTTP_404_NOT_FOUND)
		file_path = file_instance.path
		if file_path and os.path.isfile(f"storage/{file_path}"):
			try:
				os.remove(f"storage/{file_path}")
			except OSError as e:
				return Response({"message": f"Ошибка при удалении файла: {e}"},
								status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		file_instance.delete()
		return Response({"message": "Файл успешно удален"}, status=status.HTTP_204_NO_CONTENT)

	@action(detail=False, methods=['get'], url_path="api/download/(?P<unique_id>[^/]+)/\\Z")
	def download(self, request, unique_id=None, *args, **kwargs):
		file_instance = get_object_or_404(File, unique_id=unique_id)
		file_instance.last_download_date = timezone.now().date()
		file_instance.save(update_fields=['last_download_date'])
		response = FileResponse(open(file_instance.file.path, 'rb'))
		response['Content-Disposition'] = f'attachment; filename="{file_instance.file_name}"'
		return response

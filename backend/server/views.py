from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import User, File
from .serializers import UserSerializer


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


def user_login(request):
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(request, username=username, password=password)

		print(f'user {user}  / {username}  / {password}')
		if user is not None:
			login(request, user)
			response_data = {
				'message': 'Успешная авторизация',
				'user': {
					'id': user.id,
					'username': user.username,
					'email': user.email,
				}
			}
			return Response(response_data, status=200)
		else:
			response_data = {
				'message': 'Неверный логин или пароль',
			}
			return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
	else:
		response_data = {
			'message': 'Метод не поддерживается'
		}
		return Response(response_data, status=405)


@login_required
def user_logout(request):
	logout(request)
	response_data = {
		'message': 'Выход из системы выполнен',
	}
	return Response(response_data, status=200)

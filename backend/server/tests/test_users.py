from datetime import datetime
from uuid import uuid4

from django.urls import reverse
from django.test import TestCase, Client
from server.models import User, File

# URL для вашего API
url = 'http://localhost:8000/api'


class APITests(TestCase):
	def setUp(self):
		self.client = Client()

		# Создание superuser
		self.admin = User.objects.create_superuser(
			username='admin',
			email='admin@example.com',
			password='admin-password'
		)
		self.testuser = User.objects.create_user(
			username='testuser',
			email='d@d.com',
			password='testuserpassword'
		)

	# Создание нового пользователя
	def test_create_user(self):
		payload = {
			"username": "user1",
			"email": "d100@d.com",
			"password": "qwerty54321"
		}
		response = self.client.post(f"{url}/users/", data=payload)
		created_user = response.json()['user']
		expected_user = {
			'id': response.json()['user']['id'],
			'username': 'user1',
			'email': 'd100@d.com',
			'password': 'qwerty54321',
			'user_folder': 'user1_folder',
			'is_staff': False,
			'is_superuser': False,
			'is_authenticated': True,
		}
		self.assertEqual(created_user, expected_user)
		self.assertEqual(response.status_code, 201)  # Проверка создание нового пользователя

	# Получение всех пользователей
	def test_get_all_users(self):
		response = self.client.get(f"{url}/users/")
		self.assertEqual(response.status_code, 200)  # проверка получения всех пользователей

	# Удаление пользователя по ID
	def test_delete_user(self):
		user_to_delete = User.objects.create(username='deleteuser', email="s@s.com", password='deletepassword')
		self.client.force_login(self.admin)
		response = self.client.delete(f"{url}/users/{user_to_delete.id}/")
		self.assertEqual(response.status_code, 204)  # Проверка успешного удаления пользователя

	# Удаление пользователя без прав superuser
	def test_delete_user_without_permissions(self):
		user_to_delete = User.objects.create(username='deleteuser', email="s@s.com", password='deletepassword')
		self.client.force_login(self.testuser)
		response = self.client.delete(f"{url}/users/{user_to_delete.id}/")
		self.assertEqual(response.status_code, 403)
		self.assertEqual(response.json()['detail'],
						 'You do not have permission to perform this action.')

	def test_login(self):
		login_url = reverse('user-login')
		payload = {
			"username": "admin",
			"password": "admin-password"
		}
		response = self.client.post(login_url, data=payload)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()['message'], "Успешная авторизация")

	def test_logout(self):
		logout_url = reverse('user-logout')

		# print("self.admin", self.admin.is_authenticated)
		self.client.force_login(self.admin)
		response = self.client.post(logout_url)
		self.assertEqual(response.status_code, 200)

	def test_wrong_login(self):
		login_url = reverse('user-login')
		payload = {
			"username": "admin",
			"password": "password"
		}
		response = self.client.post(login_url, data=payload)
		self.assertEqual(response.status_code, 401)
		self.assertEqual(response.json()['message'], 'Неверный логин или пароль')

	def test_login_with_wrong_method(self):
		login_url = reverse('user-login')
		payload = {
			"username": "admin",
			"password": "admin-password"
		}
		response = self.client.get(login_url, data=payload)
		self.assertEqual(response.status_code, 405)
		self.assertEqual(response.json()['message'], 'Метод не поддерживается')

	def test_logout_without_login(self):
		logout_url = reverse('user-logout')
		response = self.client.post(logout_url)
		self.assertEqual(response.status_code, 200)


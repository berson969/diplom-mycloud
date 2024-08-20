from datetime import datetime
from json import dumps
from uuid import uuid4

from django.urls import reverse
from django.test import TestCase, Client
from django.contrib.auth.hashers import check_password
from server.models import User, File

# URL для тестового API
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
			'id': created_user['id'],
			'username': 'user1',
			'email': 'd100@d.com',
			'password': created_user['password'],
			'folder_name': 'user1_folder',
			'is_staff': False,
		}
		self.assertEqual(created_user, expected_user)
		just_now_create_user = User.objects.get(pk=created_user['id'])
		self.assertTrue(check_password(payload['password'], just_now_create_user.password))
		self.assertEqual(response.status_code, 201)  # Проверка создание нового пользователя

	# Получение всех пользователей
	def test_get_all_users(self):
		response = self.client.get(f"{url}/users/")
		self.assertEqual(response.status_code, 200)  # проверка получения всех пользователей

	# Изменение данных пользователя
	def test_update_user(self):
		user_to_update = User.objects.create(username='user_before_update', email="u@uu.com", password='update_password')
		self.client.force_login(user_to_update)
		payload = {
			"username": "after_update",
			"email": "u2@uu.com"
		}
		update_url = reverse('user-detail', kwargs={'pk': user_to_update.pk})
		response = self.client.patch(update_url, data=payload, content_type='application/json')
		# print('response update', response.json())
		self.assertEqual(response.status_code, 200)
		expected_data = {
			'email': 'u2@uu.com',
			'id': user_to_update.pk,
			'is_staff': False,
			'password': 'update_password',
			'folder_name': 'user_before_update_folder',
			'username': 'after_update'
		}
		self.assertEqual(response.json(),expected_data)
		updated_user = User.objects.get(pk=user_to_update.pk)
		self.assertEqual(updated_user.username, payload['username'])
		self.assertEqual(updated_user.email, payload['email'])

	# Изменение пароля пользователя
	def test_update_password(self):
		user_to_password_update = User.objects.create(username='pass_user', email="p@uu.com", password='pass_password')
		self.client.force_login(user_to_password_update)
		payload = {
			"password": "new_password"
		}
		update_url = reverse('user-detail', kwargs={'pk': user_to_password_update.pk})
		response = self.client.patch(update_url, data=payload, content_type='application/json')
		# print('response password update', response.json())
		self.assertEqual(response.status_code, 200)
		expected_data = {
			'email': 'p@uu.com',
			'id': user_to_password_update.pk,
			'is_staff': False,
			'password': response.json()['password'],
			'folder_name': 'pass_user_folder',
			'username': 'pass_user'
		}
		self.assertEqual(response.json(), expected_data)
		updated_user = User.objects.get(pk=user_to_password_update.pk)
		self.assertTrue(check_password(payload['password'], updated_user.password))

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
		response = self.client.post(
			login_url,
			data=payload,
			content_type='application/json'
		)
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
		response = self.client.post(
			login_url,
			data=payload,
			content_type='application/json'
		)
		self.assertEqual(response.status_code, 401)
		self.assertEqual(response.json()['message'], 'Неверный логин или пароль')

	def test_wrong_json(self):
		login_url = reverse('user-login')
		payload = {
			"username": "admin",
			"password": "password"
		}
		response = self.client.post(
			login_url,
			data=payload,
			content_type='application/www-form-urlencoded'
		)
		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()['message'], 'Invalid JSON')

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


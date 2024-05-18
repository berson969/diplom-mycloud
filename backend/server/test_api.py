from django.urls import reverse
from django.test import TestCase, Client
from .models import User

# URL для вашего API
url = 'http://localhost:8000/api'


class APITests(TestCase):
	def setUp(self):
		self.client = Client()

		# Создание superuser
		self.superuser = User.objects.create(username='admin', email='admin@example.com', password='adminpassword', is_superuser=True, is_staff=True)

	# Создание нового пользователя
	def test_create_user(self):
		payload = {
			"username": "user1",
			"email": "d100@d.com",
			"password": "qwerty54321"
		}
		response = self.client.post(f"{url}/users/", data=payload)
		self.assertEqual(response.status_code, 201)  # Проверка создание нового пользователя

	# Получение всех пользователей
	def test_get_all_users(self):
		response = self.client.get(f"{url}/users/")
		self.assertEqual(response.status_code, 200)  # проверка получения всех пользователей

# Удаление пользователя по ID
	def test_delete_user(self):
		user_to_delete = User.objects.create(username='testuser', email="s@s.com", password='testpassword')
		self.client.force_login(self.superuser)
		response = self.client.delete(f"{url}/users/{user_to_delete.id}/")
		self.assertEqual(response.status_code, 204)  # Проверка успешного удаления пользователя

	def test_login(self):
		# response = self.client.get(f"{url}/users/")
		# print(f"all users {response.json()}")
		login_url = reverse('user-login')
		payload = {
			"username": "admin",
			"password": "adminpassword"
		}
		response = self.client.post(login_url, data=payload)
		print(f"response {response.json()}")
		self.assertEqual(response.status_code, 200)

	def test_logout(self):
		logout_url = reverse('user-logout')
		self.client.force_login(self.superuser)
		response = self.client.post(logout_url)
		self.assertEqual(response.status_code, 200)

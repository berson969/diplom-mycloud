import os
import shutil
from datetime import datetime

from django.urls import reverse
from django.test import TestCase, Client
from server.models import User, File


class APITests(TestCase):
	def setUp(self):
		self.client = Client()

		# Создание users
		self.testsuperuser = User.objects.create_superuser(username='admin_user', email='s@s.com', password='admin-password')
		self.testuser = User.objects.create_user(username='testuser', email='d@d.com', password='testuserpassword')
		self.client.login(username='testuser', password='testuserpassword')
		self.url = reverse('file-list', kwargs={'user_folder': self.testuser.user_folder})
		with open('resources/1.jpg', 'rb') as file:
			self.file_instance = self.client.post(
				self.url,
				{
					'user': self.testuser.id,
					'file_name': 'test_file_instance.jpg',
					'file': file,
				})
		with open('resources/4.jpg', 'rb') as file:
			self.file_instance_2 = self.client.post(
				self.url,
				{
					'user': self.testuser.id,
					'file_name': 'test_file_instance_4.jpg',
					'file': file,
				})

	def tearDown(self):
		def remove_directory_if_exists(directory):
			if os.path.exists(directory):
				shutil.rmtree(directory)

		remove_directory_if_exists(f'storage/{self.testuser.user_folder}')
		remove_directory_if_exists(f'storage/{self.testsuperuser.user_folder}')

	def test_change_comment(self):
		self.client.login(username='testuser', password='testuserpassword')
		url = reverse('file-detail', kwargs={
			'user_folder': self.testuser.user_folder,
			'pk': self.file_instance.json()['id']
		})
		response = self.client.patch(
			url,
			{'comment': 'Updated comment'},
			content_type='application/json',
		)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()['comment'], 'Updated comment')

	def test_rename_file(self):
		self.client.login(username='testuser', password='testuserpassword')
		url = reverse('file-detail', kwargs={
			'user_folder': self.testuser.user_folder,
			'pk': self.file_instance.json()['id']
		})
		response = self.client.patch(
			url,
			{'file_name': 'test_file_instance_5.jpg'},
			content_type='application/json',
		)
		self.assertEqual(response.status_code, 200)
		expected_file_name = 'test_file_instance_5.jpg'
		self.assertEqual(response.json()['file_name'], expected_file_name)

	def test_rename_file_with_not_unique_name(self):
		self.client.login(username='testuser', password='testuserpassword')
		url = reverse('file-detail', kwargs={
			'user_folder': self.testuser.user_folder,
			'pk': self.file_instance.json()['id']
		})
		response = self.client.patch(
			url,
			{'file_name': 'test_file_instance_4.jpg'},
			content_type='application/json',
		)
		# print("response", response.json())
		self.assertEqual(response.status_code, 200)
		expected_file_name = 'test_file_instance_4_1.jpg'
		self.assertEqual(response.json()['file_name'], expected_file_name)

	def test_list_files(self):
		self.client.login(username='testuser', password='testuserpassword')
		# Генерируем URL для просмотра файлов того же пользователя
		url = reverse('file-list', kwargs={'user_folder': self.testuser.user_folder})
		response = self.client.get(url)
		# print("list", response.json())
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(response.json()), 2)

	def test_list_files_as_admin(self):
		self.client.login(username='admin_user', password='admin-password')
		with open('resources/5.jpg', 'rb') as file:
			self.file_instance_3 = self.client.post(
				reverse('file-list', kwargs={'user_folder': self.testsuperuser.user_folder}),
				{
					'user': self.testsuperuser,
					'file_name': 'test_fifth_file.jpg',
					'file': file,
				})
		# Генерируем URL для просмотра файлов другого пользователя
		url = reverse('file-list', kwargs={'user_folder': self.testuser.user_folder})
		response = self.client.get(url)
		# print("list_as_admin", response.json())
		self.assertEqual(response.status_code, 200)
		# Генерируем URL для просмотра файлов админа
		url = reverse('file-list', kwargs={'user_folder': self.testsuperuser.user_folder})
		response = self.client.get(url)
		# print("list_as_admin", response.json())
		self.assertEqual(response.status_code, 200)

	def test_list_files_as_not_admin(self):
		self.client.login(username='admin_user', password='admin-password')
		with open('resources/5.jpg', 'rb') as file:
			self.file_instance_3 = self.client.post(
				reverse('file-list', kwargs={'user_folder': self.testsuperuser.user_folder}),
				{
					'user': self.testsuperuser.id,
					'file_name': 'test_fifth_file.jpg',
					'file': file,
				})
		self.client.logout()
		self.client.login(username='testuser', password='testuserpassword')
		# Генерируем URL для просмотра файлов другого пользователя не под админом
		url = reverse('file-list', kwargs={'user_folder': self.testsuperuser.user_folder})
		response = self.client.get(url)
		# print("list_not_admin", response.json())
		self.assertEqual(response.status_code, 200)
		# Он получает только свои записи
		self.assertEqual(len(response.json()), 2)

	def test_download_file(self):
		self.client.login(username='testuser', password='testuserpassword')
		unique_id = self.file_instance.data['unique_id']
		url_download = reverse('file-download', args=[unique_id, ])
		response = self.client.get(url_download)
		# print("download", url_download, response)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response['Content-Disposition'], 'attachment; filename="test_file_instance.jpg"')
		file_instance = File.objects.get(unique_id=unique_id)
		file_instance.refresh_from_db()
		self.assertEqual(file_instance.last_download_date, datetime.today().date())

	def test_delete_file(self):
		self.client.login(username='testuser', password='testuserpassword')
		url = reverse('file-detail', kwargs={
			'user_folder': self.testuser.user_folder,
			'pk': self.file_instance_2.json()['id']
		})
		self.assertTrue(os.path.isfile(f"storage/{self.testuser.user_folder}/{self.file_instance_2.json()['file_name']}"))
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 204)
		self.assertFalse(os.path.isfile(f"storage/{self.testuser.user_folder}/{self.file_instance_2.json()['file_name']}"))

	def test_delete_not_exist_file(self):
		self.client.login(username='testuser', password='testuserpassword')
		url = reverse('file-detail', kwargs={
			'user_folder': self.testuser.user_folder,
			'pk': 999999
		})
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 404)

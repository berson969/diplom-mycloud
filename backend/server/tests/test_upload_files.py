import os
import shutil
from datetime import datetime

from django.core.files.uploadedfile import SimpleUploadedFile
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
		self.url = reverse('file-list', kwargs={'folder_name': self.testuser.folder_name})

	def tearDown(self):
		def remove_directory_if_exists(directory):
			if os.path.exists(directory):
				shutil.rmtree(directory)

		remove_directory_if_exists(f'storage/{self.testuser.folder_name}')
		remove_directory_if_exists(f'storage/{self.testsuperuser.folder_name}')

	# Загрузка файлов на сервер
	def test_upload_files(self):

		with open('resources/2.jpg', 'rb') as file:
			upload_file = SimpleUploadedFile('testfile2.jpg', file.read(), content_type='image/jpeg')
			data = {
				'user': self.testuser.id,
				'file': upload_file
				}
			response = self.client.post(
				self.url,
				data,
				format='multipart'
			)
		# print("response", response.json())
		self.assertEqual(response.status_code, 201)
		self.assertEqual(response.json(), {
			'id': response.json()['id'],
			'file_name': 'testfile2.jpg',
			'user': self.testuser.id,
			'file': f'/media/{self.testuser.folder_name}/testfile2.jpg',
			'size': 674769,
			'upload_date': datetime.today().strftime('%Y-%m-%d'),
			'last_download_date': None,
			'comment': '',
			'path': response.json()['path'],
			'unique_id': response.json()['unique_id']
		})

	def test_upload_files_4(self):
		# print('user', self.testuser.id)
		with open('resources/4.jpg', 'rb') as file:
			data = {
					'user': self.testuser.id,
					'file_name': 'testfile4.jpg',
					'file': file,
				}
			# print('data', data)
			response = self.client.post(
				self.url,
				data,
				format='multipart'
			)

		# print("response", response.json())
		self.assertEqual(response.status_code, 201)
		self.assertEqual(response.json(), {
			'id': response.json()['id'],
			'file_name': 'testfile4.jpg',
			'user': self.testuser.id,
			'file': f'/media/{self.testuser.folder_name}/testfile4.jpg',
			'size': 7701225,
			'upload_date': datetime.today().strftime('%Y-%m-%d'),
			'last_download_date': None,
			'comment': '',
			'path': response.json()['path'],
			'unique_id': response.json()['unique_id']
		})

	def test_upload_files_with_same_name(self):
		with open('resources/2.jpg', 'rb') as file:
			response = self.client.post(
				self.url,
				{
					'user': self.testuser.id,
					'file_name': 'testfile2.jpg',
					'file': file,
				},
				format='multipart'
			)
		# print("response", response.json())
		self.assertEqual(response.status_code, 201)
		self.assertEqual(response.json(), {
			'id': response.json()['id'],
			'file_name': 'testfile2.jpg',
			'user': self.testuser.id,
			'file': response.json()['file'],
			'size': 674769,
			'upload_date': datetime.today().strftime('%Y-%m-%d'),
			'last_download_date': None,
			'comment': '',
			'path': response.json()['path'],
			'unique_id': response.json()['unique_id']
		})
		with open('resources/2.jpg', 'rb') as file:
			response = self.client.post(
				self.url,
				{
					'user': self.testuser.id,
					'file_name': 'testfile2.jpg',
					'file': file,
				},
				format='multipart'
			)
		self.assertEqual(response.status_code, 201)
		self.assertEqual(response.json(), {
			'id': response.json()['id'],
			'file_name': 'testfile2_1.jpg',
			'user': self.testuser.id,
			'file': f'/media/{self.testuser.folder_name}/testfile2_1.jpg',
			'size': 674769,
			'upload_date': datetime.today().strftime('%Y-%m-%d'),
			'last_download_date': None,
			'comment': '',
			'path': response.json()['path'],
			'unique_id': response.json()['unique_id']
		})

	def test_load_file_without_extension(self):
		with open('resources/2.jpg', 'rb') as file:
			response = self.client.post(
				self.url,
				{
					'user': self.testuser.id,
					'file_name': 'testfile',
					'file': file,
				},
				format='multipart'
			)
		self.assertEqual(response.status_code, 201)
		self.assertEqual(response.json(), {
			'id': response.json()['id'],
			'file_name': 'testfile.jpg',
			'user': self.testuser.id,
			'file': f'/media/{self.testuser.folder_name}/testfile.jpg',
			'size': 674769,
			'upload_date': datetime.today().strftime('%Y-%m-%d'),
			'last_download_date': None,
			'comment': '',
			'path': response.json()['path'],
			'unique_id': response.json()['unique_id']
		})

	def test_upload_files_without_correct_extension(self):
		with open('resources/camera.svg', 'rb') as file:
			response = self.client.post(
				self.url,
				{
					'user': self.testuser.id,
					'file_name': 'camera.svg',
					'file': file,
				},
				format='multipart'
			)
		# print("response", response.json())
		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()['file'],
						 ['File extension “svg” is not allowed. Allowed extensions are: tiff, jpg, png, jpeg, pdf, doc, docx, gif.'])

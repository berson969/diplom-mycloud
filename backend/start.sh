#!/bin/sh

#python -m venv venv
#source venv/bin/activate
#pip install --upgrade pip
#pip install --no-cache-dir -r requirements.txt

python manage.py migrate
#python manage.py test

python manage.py createsuperuser --noinput --username=admin --email=admin@example.com
echo "adminadmin" | sudo python manage.py changepassword admin

# Правка прав доступа
sudo chown -R www-data:www-data /home/user/backend/storage/
sudo chown www-data:www-data /home/user/backend/mycloud/mycloud.sock

# Запуск сервера в режиме разработчика
#python manage.py runserver 0.0.0.0:8000
# Запуск сервера в через gunicorn
cd /home/user/backend
gunicorn -c gunicorn_config.py mycloud.wsgi:application

#!/bin/sh

#python -m venv venv
#source venv/bin/activate
#pip install --upgrade pip
#pip install --no-cache-dir -r requirements.txt

python manage.py migrate
python manage.py test

#python manage.py createsuperuser --noinput --username=admin --email=admin@example.com
#echo "adminqwe" | sudo python manage.py changepassword admin
# Запуск сервера в режиме разработчика
python manage.py runserver 0.0.0.0:8000

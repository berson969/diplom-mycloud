#!/bin/sh

python manage.py collectstatic --no-input
python manage.py migrate

flake8 .
python manage.py test

#python manage.py createsuperuser --noinput --username=admin --email=admin@example.com
#echo "adminadmin" | python manage.py changepassword admin

# Запуск сервера в через gunicorn
gunicorn -b 0.0.0.0:8000 mycloud.wsgi:application

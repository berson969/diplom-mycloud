#!/bin/sh

python manage.py collectstatic --no-input
python manage.py migrate
python manage.py create_superuser
#flake8 .
#python manage.py test --noinput --keepdb

# Запуск сервера в через gunicorn
gunicorn -b 0.0.0.0:8000 mycloud.wsgi:application

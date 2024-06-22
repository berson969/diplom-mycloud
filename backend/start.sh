#!/bin/sh

python manage.py migrate
python manage.py collectstatic --no-input
#python manage.py test

#python manage.py createsuperuser --noinput --username=admin --email=admin@example.com
#echo "adminadmin" | python manage.py changepassword admin

# Правка прав доступа
#chown -R www-data:www-data /app/storage/
#chown www-data:www-data /app/mycloud/mycloud.sock

# Запуск сервера в через gunicorn
gunicorn -b 0.0.0.0:8000 mycloud.wsgi:application

#!/bin/sh
set -e

# Wait for the database to be ready
echo "Connect $DB_HOST:$DB_PORT from user $DB_USER..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "Waiting for database..."
  sleep 2
done

python manage.py collectstatic --no-input

python manage.py migrate

python manage.py create_superuser

#flake8 .

#python manage.py test --noinput --keepdb

# Запуск сервера в через gunicorn
gunicorn -b 127.0.0.1:8000 mycloud.wsgi:application

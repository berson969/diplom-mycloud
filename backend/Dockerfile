FROM python:3.10-alpine

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . /app/

COPY gunicorn.service /etc/systemd/system/gunicorn.service

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

# Настройка прав доступа для start.sh
#RUN chmod +x /app/start.sh

RUN chmod +x /etc/systemd/system/gunicorn.service

RUN python manage.py collectstatic --no-input
#RUN python manage.py migrate

#RUN flake8 .
#RUN python manage.py test --noinput --keepdb


#ENTRYPOINT ["/app/start.sh"]
CMD gunicorn mycloud.wsgi:application  -b 0.0.0.0:8000

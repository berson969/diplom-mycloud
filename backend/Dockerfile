FROM python:3.10-alpine

WORKDIR /app/

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . /app/

COPY gunicorn.service /etc/systemd/system/gunicorn.service

# install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

# Настройка прав доступа для start.sh
RUN chmod +x /app/start.sh
# RUN chmod +x /app/gunicorn_config.py
RUN chmod +x /etc/systemd/system/gunicorn.service


ENTRYPOINT ["/app/start.sh"]

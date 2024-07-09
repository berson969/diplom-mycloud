FROM python:3.10-slim

ARG DB_HOST
ARG DB_PORT
ARG DB_BASE
ARG DB_USER
ARG DB_PASS
ARG APP_DEBUG
ARG SECRET_KEY
ARG ALLOWED_HOSTS
ARG FRONTEND_URL
ARG SERVER_NAME
ARG ADMIN_PASSWORD

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    curl \
    nano \
    postgresql-client \
    && apt-get clean


ENV APP_HOME=/app
# Установка переменной окружения для предотвращения создания .pyc файлов
ENV PYTHONDONTWRITEBYTECODE 1
# Установка переменной окружения для вывода вывода Python в стандартный поток вывода без буферизации
ENV PYTHONUNBUFFERED 1

ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_BASE=${DB_BASE}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DEBUG=${APP_DEBUG}
ENV SECRET_KEY=${SECRET_KEY}
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}
ENV FRONTEND_URL=${FRONTEND_URL}
ENV SERVER_NAME=${SERVER_NAME}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

WORKDIR ${APP_HOME}

# update pip, install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt $APP_HOME
RUN pip install -r requirements.txt

COPY . ${APP_HOME}

# Настройка прав доступа для gunicorn.service
COPY gunicorn.service /etc/systemd/system/gunicorn.service
RUN chmod +x /etc/systemd/system/gunicorn.service

EXPOSE 8000

RUN chmod +x ${APP_HOME}/start.sh
ENTRYPOINT ["sh", "start.sh"]

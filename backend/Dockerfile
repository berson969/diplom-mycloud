FROM python:3.10-slim

WORKDIR /app

# Установка переменной окружения для предотвращения создания .pyc файлов
ENV PYTHONDONTWRITEBYTECODE 1
# Установка переменной окружения для вывода вывода Python в стандартный поток вывода без буферизации
ENV PYTHONUNBUFFERED 1

COPY . /app/

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    curl \
    nano \
    && apt-get clean

RUN pip install --no-cache-dir -r requirements.txt

# Настройка прав доступа для gunicorn.service
COPY gunicorn.service /etc/systemd/system/gunicorn.service
RUN chmod +x /etc/systemd/system/gunicorn.service

EXPOSE 8000

RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]

FROM python:3.10-alpine

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update  \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

COPY ./backend /app

COPY gunicorn.service /etc/systemd/system/gunicorn.service

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

# Настройка прав доступа для start.sh
RUN chmod +x /app/start.sh

RUN chmod +x /etc/systemd/system/gunicorn.service


ENTRYPOINT ["/app/start.sh"]

FROM python:3.10-alpine

WORKDIR .

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .

COPY gunicorn.service /etc/systemd/system/gunicorn.service

# install dependencies
RUN python -m venv venv
RUN source venv/bin/activate

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

# Настройка прав доступа для start.sh
RUN chmod +x start.sh
# RUN chmod +x /app/gunicorn_config.py
RUN chmod +x /etc/systemd/system/gunicorn.service


ENTRYPOINT ["start.sh"]

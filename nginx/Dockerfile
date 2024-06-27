FROM nginx:latest


# Установка OpenSSL
RUN apt-get update && apt-get install -y openssl
# Создание директории для SSL
RUN mkdir -p /etc/nginx/ssl


# Генерация SSL сертификата и ключа
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/cert.key -out /etc/nginx/ssl/cert.crt \
    -subj '/CN=185.10.45.10/O=MyCloud/C=US'

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

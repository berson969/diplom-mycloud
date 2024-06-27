FROM nginx:latest


# Установка OpenSSL
RUN apt-get update && apt-get install -y openssl
# Создание директории для SSL
RUN mkdir -p /etc/nginx/ssl
# Копирование SSL сертификатов из монтированной директории
COPY /etc/nginx/ssl /etc/nginx/ssl

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

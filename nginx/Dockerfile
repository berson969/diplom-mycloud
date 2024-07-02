FROM nginx:latest

# Установка OpenSSL и копирование SSL сертификатов
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

# Создание директории для SSL
RUN  mkdir -p /etc/nginx/ssl
# Копирование SSL сертификатов из монтированной директории
COPY ssl /etc/nginx/ssl
COPY --from=backend /app/staticfiles /usr/share/nginx/html/static

RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d


EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

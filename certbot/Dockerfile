FROM certbot/certbot

RUN apt-get update && apt-get install -y nginx-common

COPY nginx/certbot /etc/letsencrypt
COPY nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["certbot", "certonly", "--dns-cloudflare", "--agree-tos", "-d", "${SERVER_NAME}", "-d", "www.${SERVER_NAME}"]

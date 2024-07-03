FROM certbot/certbot

RUN apk add --no-cache nginx

#COPY nginx/certbot /etc/letsencrypt
ENV SERVER_NAME=${SERVER_NAME:-localhost}

COPY nginx.conf.template /etc/nginx/nginx.conf
#COPY nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["certbot", "certonly", "--dns-cloudflare", "--agree-tos", "-d", "${SERVER_NAME}", "-d", "www.${SERVER_NAME}"]

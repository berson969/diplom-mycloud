FROM certbot/certbot

RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.18/community x86_64 nginx-common

COPY nginx/certbot /etc/letsencrypt
ENV SERVER_NAME=${SERVER_NAME:-localhost}

COPY nginx.conf.template /etc/nginx/nginx.conf
#COPY nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["certbot", "certonly", "--dns-cloudflare", "--agree-tos", "-d", "${SERVER_NAME}", "-d", "www.${SERVER_NAME}"]

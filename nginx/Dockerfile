FROM nginx:latest

RUN apt-get update && apt-get install -y  \
    curl \
    nano \
    && apt-get clean

ENV SERVER_NAME=${SERVER_NAME:-localhost}

COPY nginx.conf.template /etc/nginx/nginx.conf
COPY ssl /etc/nginx/ssl

CMD nginx -g 'daemon off;'

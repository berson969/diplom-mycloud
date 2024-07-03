FROM nginx:latest

RUN apt update \
    && apt install -y \
    snapd  \
    curl \
    nano \
    && apt clean

ENV SERVER_NAME=${SERVER_NAME:-localhost}
RUN echo SERVER_NAME

COPY nginx.conf.template /etc/nginx/nginx.conf
COPY ssl /etc/nginx/ssl

CMD nginx -g 'daemon off;'

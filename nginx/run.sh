#!/bin/sh

envsubst '$SERVER_NAME' < /home/nginx.conf.template > /etc/nginx/nginx.conf

echo "Generated Nginx configuration:"
cat /etc/nginx/nginx.conf

nginx -g "daemon off;"

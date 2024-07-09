#!/bin/sh

envsubst '${SERVER_NAME}, ${FRONTEND_URL}'  </home/nginx.conf.template > /etc/nginx/nginx.conf
nginx -g 'daemon off;'

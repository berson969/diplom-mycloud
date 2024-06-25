FROM nginx:latest


RUN mkdir -p /etc/nginx/ssl
COPY ./ssl/cert.crt /etc/nginx/ssl/
COPY ./ssl/cert.key /etc/nginx/ssl/

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

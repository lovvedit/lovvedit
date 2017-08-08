FROM nginx:1.13.3

LABEL name="lovvedit_nginx"
LABEL version="1.0.0"
LABEL maintainer="strattadb@gmail.com"

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

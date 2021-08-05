#FROM nginx:1.21-alpine
FROM nginx:latest

# RUN apk add --no-cache curl
RUN apt-get update && apt-get upgrade && apt-get install -y curl lsof

COPY ./docker/common/nginx/snippets /etc/nginx/snippets
COPY ./docker/development/nginx/conf.d /etc/nginx/conf.d
COPY ./docker/common/nginx/nginx.conf /etc/nginx/

WORKDIR /app

HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1/health || exit 1

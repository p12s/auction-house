#FROM nginx:1.21-alpine
FROM nginx:latest

LABEL "project"="auction-house"
LABEL "part"="frontend"

#RUN apk add --no-cache curl
RUN apt-get update && apt-get upgrade -y && apt-get install -y curl lsof

COPY ./frontend/docker/development/nginx/conf.d /etc/nginx/conf.d

WORKDIR /app

# проверка самого себя
HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1/health || exit 1

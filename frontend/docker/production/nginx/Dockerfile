FROM node:16-alpine as builder

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install && yarn cache clean

COPY ./ ./
#RUN yarn build

#FROM nginx:1.21-alpine
FROM nginx:latest

#RUN apk add --no-cache curl
RUN apt-get update && apt-get upgrade -y && apt-get install -y curl lsof

COPY docker/production/nginx/conf.d /etc/nginx/conf.d

WORKDIR /app

#TODO ярн не билдит пустую папку, поэтому пока просто копируем что есть изначально
#COPY --from=builder /app/build ./public
COPY ./public ./public

HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1/health || exit 1


# example
# https://tiangolo.medium.com/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305
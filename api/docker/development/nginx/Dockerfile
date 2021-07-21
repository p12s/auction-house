FROM golang:1.16.5-buster AS build

RUN go version
ENV GOPATH=/

WORKDIR /app/

# Get dependancies - will also be cached if we won't change mod/sum
COPY ./api/go.mod ./api/go.sum /app/
RUN go mod download

COPY ./api/ /app/
COPY ./.env /app/
# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -tags netgo -a -v -o /auction-house-api-app ./main.go


#FROM nginx:1.21-alpine
FROM nginx:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl lsof

WORKDIR /
RUN mkdir logs
COPY ./api/docker/development/nginx/conf.d /etc/nginx/conf.d

# copy go app, config and wait-for-postgres.sh
COPY --from=build /auction-house-api-app /auction-house-api-app
COPY ./api/configs /configs
#COPY ./wait-for-api.sh ./

RUN chmod +x auction-house-api-app

CMD ["service nginx restart && ./auction-house-api-app"]

# проверка самого себя
HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1/health || exit 1


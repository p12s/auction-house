FROM golang:1.16.5-buster AS build

#RUN go version
ENV GOPATH=/

WORKDIR /app/

# Get dependancies - will also be cached if we won't change mod/sum
COPY ./go.mod ./go.sum /app/
RUN go mod download

COPY ./ /app/
# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -tags netgo -a -v -o /auction-house-api-app ./main.go


#FROM nginx:1.21-alpine
#FROM nginx:latest
FROM amd64/alpine:3

# RUN apk add --no-cache curl
# RUN apt-get update && apt-get upgrade -y && apt-get install -y curl lsof  # && apk add ca-certificates wget && update-ca-certificates
RUN apk update && apk upgrade && apk add bash && apk add --no-cache curl && apk add lsof

COPY --from=build /auction-house-api-app /auction-house-api-app
COPY ./configs /configs
COPY ./wait-for-postgres.sh ./

WORKDIR /

# install psql and make wait-for-postgres.sh executable
RUN apk add --no-cache libc6-compat postgresql-client && chmod +x wait-for-postgres.sh auction-house-api-app

CMD ["./auction-house-api-app"]

HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1:8081/health || exit 1

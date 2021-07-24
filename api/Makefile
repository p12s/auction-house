.PHONY:
.SILENT:
.DEFAULT_GOAL := test

# Go - директивы работы с папкой API
go-build:
	go mod download && go build main.go

test:
	go test --short -coverprofile=cover.out -v ./...
	make test.coverage

create-migration:
	migrate create -ext sql -dir ./schema -seq init

test.coverage:
	go tool cover -func=cover.out

swag:
	swag init -g cmd/api/main.go

lint:
	golangci-lint run


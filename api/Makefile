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


dc-init: dc-clear dc-pull dc-build dc-up # команда для первоначального запуска в системе
dc-up:
	docker-compose --env-file ./.env up -d
dc-down:
	docker-compose --env-file ./.env down --remove-orphans # будет останавливать все контейнеры с префиксом (default - название папки, .env - COMPOSE_PROJECT_NAME), даже если что-то по-ошибке удалено из docker-compose
dc-clear:
	docker-compose --env-file ./.env down -v --remove-orphans # полная очистка с удалением volumes
dc-pull:
	docker-compose --env-file ./.env pull
dc-build:
	docker-compose --env-file ./.env build


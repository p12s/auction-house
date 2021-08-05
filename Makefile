.PHONY:
.SILENT:
.DEFAULT_GOAL := test

# Go - директивы работы с папкой API
go-build:
	go mod download && go build api/main.go

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
dc-reup: dc-down dc-build dc-up
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

api-clear:
	docker run --rm -v ${PWD}/api:/app -w /app alpine sh -c 'rm -rf var/cache/* var/log/* var/test/*'

api-init: api-permissions api-composer-install api-wait-db api-migrations api-fixtures

api-permissions:
	docker run --rm -v ${PWD}/api:/app -w /app alpine chmod 777 var/cache var/log var/test

#api-wait-db:
#	docker-compose run --rm api-php-cli wait-for-it api-postgres:5432 -t 30
#api-migrations:
#	docker-compose run --rm api-php-cli composer app migrations:migrate -- --no-interaction
#api-fixtures:
#	docker-compose run --rm api-php-cli composer app fixtures:load
#api-check: api-validate-schema api-lint api-analyze api-test
#api-validate-schema:
#	docker-compose run --rm api-php-cli composer app orm:validate-schema
#api-lint:
#	docker-compose run --rm api-php-cli composer lint
#	docker-compose run --rm api-php-cli composer php-cs-fixer fix -- --dry-run --diff
#api-cs-fix:
#	docker-compose run --rm api-php-cli composer php-cs-fixer fix
#api-analyze:
#	docker-compose run --rm api-php-cli composer psalm -- --no-diff
#api-analyze-diff:
#	docker-compose run --rm api-php-cli composer psalm

api-test:
	docker-compose run --rm api-php-cli composer test

api-test-coverage:
	docker-compose run --rm api-php-cli composer test-coverage

api-test-unit:
	docker-compose run --rm api-php-cli composer test -- --testsuite=unit

api-test-unit-coverage:
	docker-compose run --rm api-php-cli composer test-coverage -- --testsuite=unit

api-test-functional:
	docker-compose run --rm api-php-cli composer test -- --testsuite=functional

api-test-functional-coverage:
	docker-compose run --rm api-php-cli composer test-coverage -- --testsuite=functional

frontend-clear:
	docker run --rm -v ${PWD}/frontend:/app -w /app alpine sh -c 'rm -rf .ready build'

frontend-init: frontend-yarn-install

frontend-yarn-install:
	docker-compose run --rm frontend-node-cli yarn install

frontend-yarn-upgrade:
	docker-compose run --rm frontend-node-cli yarn upgrade

frontend-ready:
	docker run --rm -v ${PWD}/frontend:/app -w /app alpine touch .ready

frontend-check: frontend-lint frontend-test

frontend-lint:
	docker-compose run --rm frontend-node-cli yarn eslint
	docker-compose run --rm frontend-node-cli yarn stylelint

frontend-eslint-fix:
	docker-compose run --rm frontend-node-cli yarn eslint-fix

frontend-pretty:
	docker-compose run --rm frontend-node-cli yarn prettier

frontend-test:
	docker-compose run --rm frontend-node-cli yarn test --watchAll=false

frontend-test-watch:
	docker-compose run --rm frontend-node-cli yarn test


# ========================== BUILD DEVELOPMENT DOCKER IMAGES 
dev-build-gateway:
	docker --log-level=debug build --pull --file=gateway/docker/development/nginx/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-gateway:${IMAGE_TAG} gateway

dev-build-frontend:
	docker --log-level=debug build --pull --file=frontend/docker/development/nginx/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-frontend:${IMAGE_TAG} frontend

dev-build-api:
	docker --log-level=debug build --pull --file=api/docker/development/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-api:${IMAGE_TAG} api

dev-build-db:
	docker --log-level=debug build --pull --file=db/docker/development/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-db:${IMAGE_TAG} db

try-dev-build: dev-build-gateway dev-build-frontend dev-build-api dev-build-db

try-dev-deploy:
	docker stack deploy --compose-file docker-compose-swarm.yml auction --with-registry-auth --prune


# ========================== BUILD PROD DOCKER IMAGES 
build-prod-gateway:
	docker --log-level=debug build --pull --file=gateway/docker/production/nginx/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-gateway:${IMAGE_TAG} gateway
	docker --log-level=debug build --pull --file=gateway/docker/production/nginx/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-gateway:latest gateway

build-prod-frontend:
	docker --log-level=debug build --pull --file=frontend/docker/production/nginx/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-frontend:${IMAGE_TAG} frontend
	docker --log-level=debug build --pull --file=frontend/docker/production/nginx/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-frontend:latest frontend

build-prod-api:
	docker --log-level=debug build --pull --file=api/docker/production/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-api:${IMAGE_TAG} api
	docker --log-level=debug build --pull --file=api/docker/production/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-api:latest api

build-prod-db:
	docker --log-level=debug build --pull --file=db/docker/production/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-db:${IMAGE_TAG} db
	docker --log-level=debug build --pull --file=db/docker/production/Dockerfile --tag=${REGISTRY}/${LOGIN}/auction-db:latest db

build-prod: build-prod-gateway build-prod-frontend build-prod-api  build-prod-db

try-build-prod:
	make build-prod


# ========================== DOCKER IMAGES PUSH
push-prod-gateway:
	docker push ${REGISTRY}/${LOGIN}/auction-gateway:${IMAGE_TAG}
	docker push ${REGISTRY}/${LOGIN}/auction-gateway:latest

push-prod-frontend:
	docker push ${REGISTRY}/${LOGIN}/auction-frontend:${IMAGE_TAG}
	docker push ${REGISTRY}/${LOGIN}/auction-frontend:latest

push-prod-api:
	docker push ${REGISTRY}/${LOGIN}/auction-api:${IMAGE_TAG}
	docker push ${REGISTRY}/${LOGIN}/auction-api:latest

push-prod-db:
	docker push ${REGISTRY}/${LOGIN}/auction-db:${IMAGE_TAG}
	docker push ${REGISTRY}/${LOGIN}/auction-db:latest

push-prod: push-prod-gateway push-prod-frontend push-prod-api push-prod-db

try-push-prod:
	make push-prod


# ========================== DEPLOY PROD
deploy-prod:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -rf site_${VERSION}'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'mkdir site_${VERSION}'

	envsubst < docker-compose-production.yml > docker-compose-production-env.yml
	scp -o StrictHostKeyChecking=no -P ${PORT} docker-compose-production-env.yml deploy@${HOST}:site_${VERSION}/docker-compose.yml
	rm -f docker-compose-production-env.yml

	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'mkdir site_${VERSION}/secrets'
#	scp -o StrictHostKeyChecking=no -P ${PORT} ${JWT_PUBLIC_KEY} deploy@${HOST}:site_${VERSION}/secrets/jwt_public.key
#	scp -o StrictHostKeyChecking=no -P ${PORT} ${JWT_PRIVATE_KEY} deploy@${HOST}:site_${VERSION}/secrets/jwt_private.key

	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_${VERSION} && docker stack deploy --compose-file docker-compose.yml auction --with-registry-auth --prune'

deploy-prod-clean:
	rm -f docker-compose-production-env.yml

rollback-prod:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_${IMAGE_TAG} && docker stack deploy --compose-file docker-compose.yml auction --with-registry-auth --prune'

# ==========================

docker-rmi:
	docker rmi ${REGISTRY}/${LOGIN}/auction-api:${IMAGE_TAG} ${REGISTRY}/${LOGIN}/auction-gateway:${IMAGE_TAG} ${REGISTRY}/${LOGIN}/auction-frontend:${IMAGE_TAG}

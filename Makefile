# Go - директивы работы с папкой API
go-build:
	cd api && go mod download && go build main.go && rm main && cd ..

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

recompose:
	docker-compose down --remove-orphans
	docker rmi auction-house_api:latest
	docker-compose up -d

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

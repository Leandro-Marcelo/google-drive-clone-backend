# APP

start-dev:
	npx nodemon --files ./src/infrastructure/driving-adapters/rest-api/start.ts

test:
	npx jest --coverage

# UUID: NodeJS package crypto
generatorUuid := node -e "console.log(require('crypto').randomUUID().replace(/-/g, ''))"

# PRISMA

prisma-update-schemas:
	npx dotenv -e .env.dev -- npx prisma migrate dev --name migration-$(shell $(generatorUuid)) --schema=./src/infrastructure/driven-adapters/prisma/schema.prisma
	sleep 3
	npx prisma generate --schema=./src/infrastructure/driven-adapters/prisma/schema.prisma

prisma-studio:
	npx dotenv -e .env.dev -- npx prisma studio --schema=./src/infrastructure/driven-adapters/prisma/schema.prisma

# DOCKER

# Makefile for starting a MySQL server in development

# Variables
MYSQL_CONTAINER_NAME =
MYSQL_DATABASE_NAME =
MYSQL_ROOT_PASSWORD=
MYSQL_PORT=
MYSQL_IMAGE_NAME=

# Commands
docker-mysql-run:
	@echo "Starting MySQL server..."
	docker run -d -p $(MYSQL_PORT):3306 -e MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD) -e MYSQL_DATABASE=$(MYSQL_DATABASE_NAME) --name $(MYSQL_CONTAINER_NAME) $(MYSQL_IMAGE_NAME)

docker-mysql-migrate-dev: docker-mysql-run
	sleep 5
	@echo "Migrating database..."
	npx dotenv -e .env.dev -- npx prisma migrate dev --name initial-mysql \
	--schema=./src/infrastructure/driven-adapters/prisma/schema.prisma

docker-mysql-up: docker-mysql-migrate-dev
	sleep 5
	@echo "Generating Prisma Client..."
	npx prisma generate --schema=./src/infrastructure/driven-adapters/prisma/schema.prisma

# Set default command to run
.DEFAULT_GOAL := docker-mysql-run
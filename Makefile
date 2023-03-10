.PHONY = default deps build test start-cms-backend clean start-database

# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := motorbike-shop-api-ddd
SERVICE_NAME := app

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

# Run tests
test: deps start_database
	npm test

# Clean container
clean:
	docker-compose down --rmi local --volumes

# Start database container in background
start_database:
	docker-compose up -d mongo

# Start
start: deps start_database
	npm run dev:cms:backend

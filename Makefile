.PHONY: \
		test \
		e2e \
		dev \
		stop \

SHELL := /bin/bash

# Run unit tests
test:
	docker-compose --file docker-compose.test.yml up --build --force-recreate

stop-test:
	docker-compose --file docker-compose.test.yml down

# Run e2e tests
e2e: 
	docker-compose --file docker-compose.e2e.yml up --build --force-recreate && make stop-e2e

stop-e2e:
	docker-compose --file docker-compose.e2e.yml down

# Setups development environment
dev:
	docker-compose --file docker-compose.local.yml up --build --force-recreate 

# Stops development environment
stop:
	docker-compose --file docker-compose.local.yml down
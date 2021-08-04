.PHONY: \
		test \
		test-e2e \
		stop \
		stop-e2e \
		dev \

SHELL := /bin/bash

# Run unit tests
test:
	docker-compose --file docker-compose.test.yml up --build && make stop-test

stop-test:
	docker-compose --file docker-compose.test.yml down

# Run e2e tests
test-e2e: 
	docker-compose --file docker-compose.e2e.yml up --build --exit-code-from e2e && make stop-e2e

stop-e2e:
	docker-compose --file docker-compose.e2e.yml down

# Setups development environment
dev:
	docker-compose --file docker-compose.local.yml up --build 

# Stops development environment
stop:
	docker-compose --file docker-compose.local.yml down
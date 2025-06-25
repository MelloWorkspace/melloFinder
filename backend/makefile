run:
	go run ./src/main.go
install:
	go install ./src/main.go
test:
	go test ./src/... -v
lint:
	golangci-lint run ./src/...
format:
	gofmt -w ./src/
migrate:
	migrate -path ./migrations -database "postgres://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable" up
.PHONY: run install test lint format migrate
# Ensure that the environment variables are set before running the make commands
check-env:
ifndef DB_USER
	$(error DB_USER is not set)
endif
ifndef DB_PASSWORD
	$(error DB_PASSWORD is not set)
endif	
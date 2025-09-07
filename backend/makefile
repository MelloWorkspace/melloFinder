.PHONY: build run test clean docker-build docker-run migrate-up migrate-down swag

# Application name
APP_NAME=project

# Build the application
build:
	go build -o bin/$(APP_NAME) ./main.go

# Run the application
run:
	go run ./main.go

# Development с полным логированием
dev:
    ENV=development go run ./main.go

# Production режим
prod:
    ENV=production go run ./main.go

# Run no migrations
run-no-migrate:
    DISABLE_AUTO_MIGRATION=true go run ./main.go

# Check scheme
migrate-check:
	@echo "🔍 Checking what migrations would be applied..."
	@echo "This will show you what GORM would change:"
	go run src/helpers/migrate-check.go

# Backup database
backup:
	@echo "💾 Creating database backup...";
	pg_dump $(DATABASE_URL) > backup_$(shell date +%Y%m%d_%H%M%S).sql

# Run with air for hot reload
dev:
	air

# Test the application
test:
	go test -v ./...

# Clean build artifacts
clean:
	rm -rf bin/

# swag-install:
# 	go install github.com/swaggo/swag/cmd/swag@latest

# Generate swagger docs
swag:
	go run github.com/swaggo/swag/cmd/swag@latest init -g ./main.go -o docs

# Database migrations
migrate-up:
	migrate -path migrations -database "postgres://postgres:password@localhost:5432/project_db?sslmode=disable" up

migrate-down:
	migrate -path migrations -database "postgres://postgres:password@localhost:5432/project_db?sslmode=disable" down

migrate-create:
	migrate create -ext sql -dir migrations $(name)

# Docker commands
docker-build:
	docker build -t $(APP_NAME) .

docker-run:
	docker run -p 8080:8080 --env-file .env $(APP_NAME)

# Docker Compose
compose-up:
	docker-compose up -d

compose-down:
	docker-compose down

# Install dependencies
deps:
	go mod download
	go mod tidy

# Format code
fmt:
	go fmt ./...

# Lint code
lint:
	golangci-lint run

# Security check
security:
	gosec ./...

# Full setup for development
setup: deps swag migrate-up

# Production build
build-prod:
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w -s' -o bin/$(APP_NAME) cmd/server/main.go

# GORM миграции
migrate-up-gorm:
	go run cmd/migrate/main.go up

migrate-down-gorm:
	go run cmd/migrate/main.go down

migrate-create-gorm:
	go run cmd/migrate/main.go create $(name)

migrate-status:
	go run cmd/migrate/main.go status

# Atlas миграции
atlas-diff:
	atlas migrate diff --env dev

atlas-apply:
	atlas migrate apply --env dev

atlas-status:
	atlas migrate status --env dev

# Автоматическая миграция (только для разработки)
migrate-auto:
	@echo "Running auto migrations (development only)..."
	go run -tags migrate cmd/server/main.go --migrate-only
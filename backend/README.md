# Project API

A full-featured REST API built with Go using MVC architecture, invite system, and JWT authentication.

## 🚀 Tech Stack

- **Framework**: Echo v4
- **ORM**: GORM
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose

## 📋 Features

- ✅ Invite-based registration system
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ User CRUD operations
- ✅ Auto-generated API documentation (Swagger)
- ✅ Ready-to-use Docker configuration
- ✅ Automatic database migrations
- ✅ CORS and authentication middleware
- ✅ Structured logging

## 🏗️ Project Architecture

```
project/
├── src/
│   ├── config/          # Application configuration
│   ├── controllers/     # HTTP handlers (MVC Controllers)
│   ├── dto/            # Data Transfer Objects
│   ├── helpers/        # Helper functions
│   ├── middlewares/    # HTTP middleware
│   ├── models/         # Data models (MVC Models)
│   ├── routes/         # Route definitions
│   └── services/       # Business logic (MVC Services)
│   └── database/       # DB operations
├── main.go.            # Application entry point
├── migrations/         # SQL migrations
├── docs/               # Swagger documentation
├── Dockerfile
├── Makefile
└── README.md
```

## 🛠️ Installation and Setup

### Requirements

- Go 1.21+
- PostgreSQL 15+
- Docker (optional)
- Make (optional)

### 1. Clone Repository

```bash
git clone <repository-url>
cd project
```

### 2. Install Dependencies

```bash
go mod download
# or
make deps
```

### 3. Environment Setup

Copy environment variables file:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# Server
PORT=8080
HOST=localhost

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=project_db
DB_SSLMODE=disable

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
JWT_EXPIRES_IN=24h

# Invite
INVITE_EXPIRES_IN=72h
```

### 4. Database Setup

#### Option A: Local PostgreSQL

Create database:

```sql
CREATE DATABASE project_db;
```

Apply migrations:

```bash
make migrate-up
```

#### Option B: Docker

```bash
# Run PostgreSQL in Docker
docker run --name project-postgres \
  -e POSTGRES_DB=project_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Apply migrations
make migrate-up
```

### Create new migrations

Change or add model в src/models/
increment CURRENT_SCHEMA_VERSION in migrator.go
make run

### 5. Generate Swagger Documentation

First, install swag if not already installed:

```bash
# Install swag
go install github.com/swaggo/swag/cmd/swag@latest

# Generate documentation
make swag
```

The Swagger documentation will be generated in the `docs/` folder.

## 🚀 Running the Application

### Local Run

```bash
# Simple run
go run cmd/server/main.go

# Or via Makefile
make run

# For development with hot reload (requires air)
make dev
```

```
- API: http://localhost:8080/api/v1/
- Swagger UI: http://localhost:8080/swagger/index.html
- Health Check: http://localhost:8080/health
```

### Docker Run

```bash
# Build image
make docker-build

# Run container
make docker-run

# Or full stack with DB
make compose-up
```

Application will be available at: `http://localhost:8080`

## 📚 API Documentation

### Swagger UI

After starting the application, documentation is available at:
`http://localhost:8080/swagger/index.html`

### Main Endpoints

#### Authentication

```http
# Send invite
POST /api/v1/auth/invite
Content-Type: application/json

{
  "email": "user@example.com"
}
```

```http
# Accept invite and create account
POST /api/v1/auth/accept-invite
Content-Type: application/json

{
  "token": "invite_token_here",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe"
}
```

```http
# Login
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Users (require authentication)

```http
# Get profile
GET /api/v1/users/profile
Authorization: Bearer <jwt_token>
```

```http
# Get all users
GET /api/v1/users
Authorization: Bearer <jwt_token>
```

#### Service Endpoints

```http
# Health check
GET /health
```

## 🔧 Development Commands

### Makefile Commands

```bash
# Build application
make build

# Run in development mode
make run

# Run with hot reload
make dev

# Run tests
make test

# Lint code
make lint

# Format code
make fmt

# Security check
make security

# Generate Swagger documentation
make swag

# Migrations
make migrate-up          # Apply migrations
make migrate-down        # Rollback migrations
make migrate-create name=migration_name  # Create new migration

# Docker commands
make docker-build        # Build Docker image
make docker-run          # Run in Docker
make compose-up          # Start full stack
make compose-down        # Stop stack

# Full development setup
make setup
```

### Manual Commands

```bash
# Install additional tools
go install github.com/cosmtrek/air@latest          # Hot reload
go install github.com/swaggo/swag/cmd/swag@latest  # Swagger
go install github.com/golang-migrate/migrate/v4/cmd/migrate@latest  # Migrations

# Working with migrations
migrate create -ext sql -dir migrations create_users_table
migrate -path migrations -database "postgres://user:pass@localhost:5432/db?sslmode=disable" up

# Generate mocks for testing
go generate ./...
```

## 📝 Swagger Documentation Generation

The project uses Swagger annotations in the code to generate API documentation automatically.

### Adding Swagger Annotations

Example controller with Swagger annotations:

```go
// Login godoc
// @Summary Login user
// @Description Authenticate user with email and password
// @Tags auth
// @Accept json
// @Produce json
// @Param request body dto.LoginRequest true "Login credentials"
// @Success 200 {object} helpers.Response{data=dto.AuthResponse}
// @Failure 400 {object} helpers.Response
// @Failure 401 {object} helpers.Response
// @Router /auth/login [post]
func (ctrl *AuthController) Login(c echo.Context) error {
    // implementation
}
```

### Swagger Configuration

Main configuration is in `cmd/server/main.go`:

```go
// @title Project API
// @version 1.0
// @description This is a sample REST API server with invite system
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.
```

### Generating Documentation

```bash
# Generate Swagger docs
swag init -g cmd/server/main.go -o docs

# Or use Makefile
make swag
```

This will create:

- `docs/docs.go`
- `docs/swagger.json`
- `docs/swagger.yaml`

### Swagger UI Access

After running the application, access Swagger UI at:

- `http://localhost:8080/swagger/index.html`

## 🧪 Testing

### Running Tests

```bash
# All tests
make test

# Tests with coverage
go test -v -cover ./...

# Integration tests
go test -tags=integration ./...
```

### API Testing Examples

```bash
# Send invite
curl -X POST http://localhost:8080/api/v1/auth/invite \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Accept invite
curl -X POST http://localhost:8080/api/v1/auth/accept-invite \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_invite_token",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Get profile (with token)
curl -X GET http://localhost:8080/api/v1/users/profile \
  -H "Authorization: Bearer your_jwt_token"
```

## 🔒 Security

### Environment Variables

Never commit `.env` file to repository. Use:

- Different secret keys for different environments
- Strong database passwords
- Long random strings for JWT_SECRET

### Recommendations

- Use HTTPS in production
- Configure proper CORS policies
- Regularly update dependencies
- Implement rate limiting for API

## 📊 Monitoring and Logging

### Logs

Application uses structured logging via Echo middleware:

```bash
# View logs in Docker
docker logs project-app

# Follow logs in real-time
docker logs -f project-app
```

### Metrics

Health check endpoint:

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

## 🚀 Deployment

### Docker in Production

```bash
# Build production image
make build-prod

# Run with external DB
docker run -d \
  --name project-app \
  -p 8080:8080 \
  -e DB_HOST=your-db-host \
  -e DB_PASSWORD=your-secure-password \
  -e JWT_SECRET=your-super-secret-key \
  project:latest
```

### Docker Compose for Production

Create `docker-compose.prod.yml`:

```yaml
version: "3.8"

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres.conf:/etc/postgresql/postgresql.conf
    restart: unless-stopped

  app:
    build: .
    ports:
      - "80:8080"
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_PORT: 5432
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    restart: unless-stopped

volumes:
  postgres_data:
```

## 🐛 Troubleshooting

### Common Issues

1. **Database connection error**

   ```bash
   # Check if PostgreSQL is running
   ps aux | grep postgres

   # Test connection
   psql -h localhost -U postgres -d project_db
   ```

2. **Migration errors**

   ```bash
   # Reset migrations
   make migrate-down
   make migrate-up
   ```

3. **Swagger errors**
   ```bash
   # Reinstall swag
   go install github.com/swaggo/swag/cmd/swag@latest
   make swag
   ```

### Debug Mode

```bash
# Run with debug logs
export LOG_LEVEL=debug
make run

# Check environment variables
env | grep -E "(DB_|JWT_|PORT)"
```

## 🤝 Contributing

### Commit Structure

```
feat: add new functionality
fix: fix bug
docs: update documentation
style: code formatting
refactor: refactor without functionality changes
test: add tests
chore: update dependencies
```

### Development Process

1. Create branch: `git checkout -b feature/new-feature`
2. Make changes
3. Run tests: `make test`
4. Run linter: `make lint`
5. Create Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 📞 Support

- Create GitHub Issue for bugs
- Use Discussions for questions
- Check existing Issues before creating new ones

---

**Happy coding! 🚀**

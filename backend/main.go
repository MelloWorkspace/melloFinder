package main

import (
	"backend/src/config"
	"backend/src/controllers"
	"backend/src/database"
	"backend/src/routes"
	"backend/src/services"
	"log"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func main() {
	cfg := config.Load()

	// Инициализация БД
	db, err := initDB(cfg)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Автоматические миграции
	migrator := database.NewAutoMigrator(db)
	// TODO: В production можно добавить флаг для отключения
	if !isProductionMigrationDisabled() {
		if err := migrator.ValidateSchemaCompatibility(); err != nil {
			log.Fatal("Schema compatibility check failed:", err)
		}
		if err := migrator.RunAutoMigrations(); err != nil {
			log.Fatal("Auto-migration failed:", err)
		}
	}

	// Инициализация сервисов (dependency injection)
	// Фабрика крч
	emailService := services.NewEmailService(cfg)
	userService := services.NewUserService(db)
	inviteService := services.NewInviteService(db, cfg)
	authService := services.NewAuthService(db, cfg, userService, inviteService, emailService)

	// Инициализация контроллеров
	authController := controllers.NewAuthController(authService)
	userController := controllers.NewUserController(userService)

	ctrls := routes.RouteControllers{
		Auth: authController,
		User: userController,
	}

	// Настройка Echo
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Настройка роутов
	routes.Setup(e, cfg, &ctrls)

	log.Printf("🚀 Server starting on :%s", cfg.Server.Port)
	log.Printf(`- API: http://localhost:%s/api/v1/
	- Swagger UI: http://localhost:%s/swagger/index.html
	- Health Check: http://localhost:%s/health`, cfg.Server.Port, cfg.Server.Port, cfg.Server.Port)

	log.Fatal(e.Start(":" + cfg.Server.Port))
}

func initDB(cfg *config.Config) (*gorm.DB, error) {
	dsn := cfg.Database.GetDSN()

	// Логируем информацию о подключении (без пароля)
	log.Printf("Connecting to database: %s", cfg.Database.GetConnectionInfo())

	config := &gorm.Config{}
	if os.Getenv("ENV") == "production" {
		config.Logger = logger.Default.LogMode(logger.Error)
	} else {
		config.Logger = logger.Default.LogMode(logger.Info)
	}

	db, err := gorm.Open(postgres.Open(dsn), config)
	if err != nil {
		return nil, err
	}

	// Настройки пула подключений
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	log.Println("✅ Database connection established")
	return db, nil
}

func isProductionMigrationDisabled() bool {
	return os.Getenv("DISABLE_AUTO_MIGRATION") == "true"
}

package main

import (
	"fmt"
	"log"
	"melloFinder/src/auth"
	"melloFinder/src/models"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/volatiletech/authboss-clientstate"
	"github.com/volatiletech/authboss/v3"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Загрузка .env
	if err := godotenv.Load(); err != nil {
		log.Println("Cannot load .env file, using environment variables directly:", err)
	}

	// Конфигурация БД
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	secret := os.Getenv("SECRET_KEY")
	appPort := os.Getenv("APP_PORT")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Cannot load from db(", err)
	}

	db.AutoMigrate(&models.User{})

	ab := authboss.New()

	ab.Config.Paths.RootURL = fmt.Sprintf("http://localhost:%s", appPort)
	ab.Config.Storage.Server = auth.UserStorer{DB: db}
	ab.Config.Storage.SessionState = abclientstate.NewSessionStorer("ab_session", []byte(secret), nil)
	ab.Config.Storage.CookieState = abclientstate.NewCookieStorer([]byte(secret), nil)

	ab.Config.Modules.RegisterPreserveFields = []string{"email", "password"}
	ab.Config.Modules.LogoutMethod = "GET"

	if err := ab.Init(); err != nil {
		log.Fatal("Authboss init error:", err)
	}

	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Request = ab.LoadClientState(c.Request)
		c.Next()
	})

	router.Any("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Welcome to Authboss + Gin + Postgres!")
	})

	router.Any("/auth/:module", gin.WrapF(ab.Config.Core.Router))

	router.Run(":" + appPort)
}

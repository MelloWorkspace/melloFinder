// config/config.go
package config

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	JWT      JWTConfig
	Invite   InviteConfig
	SMTP     SMTPConfig
	App      AppConfig
}

type ServerConfig struct {
	Port string
}

type DatabaseConfig struct {
	// Приоритет: если URL задан, используем его
	URL string

	// Fallback: если URL не задан, собираем из частей
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
}

type JWTConfig struct {
	Secret    string
	ExpiresIn time.Duration
}

type InviteConfig struct {
	ExpiresIn time.Duration
}

type SMTPConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	From     string
	UseTLS   bool
}

type AppConfig struct {
	Name        string
	FrontendURL string
}

func Load() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	jwtExpiresIn, _ := time.ParseDuration(getEnv("JWT_EXPIRES_IN", "24h"))
	inviteExpiresIn, _ := time.ParseDuration(getEnv("INVITE_EXPIRES_IN", "72h"))

	return &Config{
		Server: ServerConfig{
			Port: getEnv("PORT", "8080"),
		},
		Database: DatabaseConfig{
			// Сначала пробуем DATABASE_URL
			URL: getEnv("DATABASE_URL", ""),

			// Затем отдельные параметры (для совместимости)
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "password"),
			Name:     getEnv("DB_NAME", "project_db"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},
		JWT: JWTConfig{
			Secret:    getEnv("JWT_SECRET", "your_secret_key"),
			ExpiresIn: jwtExpiresIn,
		},
		Invite: InviteConfig{
			ExpiresIn: inviteExpiresIn,
		},
		SMTP: SMTPConfig{
			Host:     getEnv("SMTP_HOST", "smtp.gmail.com"),
			Port:     getEnvInt("SMTP_PORT", 587),
			Username: getEnv("SMTP_USERNAME", ""),
			Password: getEnv("SMTP_PASSWORD", ""),
			From:     getEnv("SMTP_FROM", "noreply@yourapp.com"),
			UseTLS:   getEnvBool("SMTP_USE_TLS", true),
		},
		App: AppConfig{
			Name:        getEnv("APP_NAME", "MelloFinder"),
			FrontendURL: getEnv("FRONTEND_URL", "http://localhost:3000"),
		},
	}
}

// GetDSN возвращает строку подключения к БД
func (d *DatabaseConfig) GetDSN() string {
	// Если URL задан, используем его
	if d.URL != "" {
		return d.URL
	}

	// Иначе собираем из отдельных параметров
	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		d.Host, d.User, d.Password, d.Name, d.Port, d.SSLMode)
}

// IsDatabaseURLSet проверяет, задана ли DATABASE_URL
func (d *DatabaseConfig) IsDatabaseURLSet() bool {
	return d.URL != ""
}

// GetConnectionInfo возвращает информацию о подключении (без пароля)
func (d *DatabaseConfig) GetConnectionInfo() string {
	if d.URL != "" {
		// Маскируем пароль в URL для логирования
		return maskPasswordInURL(d.URL)
	}

	return fmt.Sprintf("host=%s port=%s dbname=%s user=%s",
		d.Host, d.Port, d.Name, d.User)
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvBool(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		if boolValue, err := strconv.ParseBool(value); err == nil {
			return boolValue
		}
	}
	return defaultValue
}

func getEnvDuration(key string, defaultValue string) time.Duration {
	if value := os.Getenv(key); value != "" {
		if duration, err := time.ParseDuration(value); err == nil {
			return duration
		}
	}
	duration, _ := time.ParseDuration(defaultValue)
	return duration
}

// maskPasswordInURL маскирует пароль в URL для безопасного логирования
func maskPasswordInURL(url string) string {
	// Простая маскировка для логирования
	// В реальном проекте можно использовать более сложную логику
	if len(url) > 20 {
		return url[:20] + "***masked***"
	}
	return "***masked***"
}

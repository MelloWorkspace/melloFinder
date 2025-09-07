package routes

import (
	"backend/src/config"
	"backend/src/controllers"
	"backend/src/middlewares"

	"github.com/labstack/echo/v4"
	"github.com/swaggo/echo-swagger"
)

func Setup(e *echo.Echo, config *config.Config, authController *controllers.AuthController, userController *controllers.UserController) {
	// Middlewares
	e.Use(middlewares.CORS())

	// Swagger
	e.GET("/swagger/*", echoSwagger.WrapHandler)

	// Health check
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"status": "ok"})
	})

	// API routes
	api := e.Group("/api/v1")

	// Auth routes
	auth := api.Group("/auth")
	auth.POST("/invite", authController.SendInvite)
	auth.POST("/accept-invite", authController.AcceptInvite)
	auth.POST("/login", authController.Login)

	// Protected routes
	protected := api.Group("")
	protected.Use(middlewares.JWTMiddleware(config))

	// User routes
	users := protected.Group("/users")
	users.GET("/profile", userController.GetProfile)
	users.GET("", userController.GetAllUsers)
}
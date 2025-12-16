package routes

import (
	"backend/src/config"
	"backend/src/controllers"
	"backend/src/middlewares"

	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
)

type RouteControllers struct {
	Auth *controllers.AuthController
	User *controllers.UserController
}

func Setup(e *echo.Echo, config *config.Config, ctrls *RouteControllers) {
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
	auth.POST("/invite", ctrls.Auth.SendInvite)
	auth.POST("/accept-invite", ctrls.Auth.AcceptInvite)
	auth.POST("/login", ctrls.Auth.Login)

	// Protected routes
	protected := api.Group("")
	protected.Use(middlewares.JWTMiddleware(config))

	// User routes
	users := protected.Group("/users")
	users.GET("/profile", ctrls.User.GetProfile)
	users.GET("", ctrls.User.GetAllUsers)
}

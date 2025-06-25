package routes

import (
	"melloFinder/src/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.GET("/", handlers.HelloHandler)
}

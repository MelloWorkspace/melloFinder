package routes

import (
	"github.com/gin-gonic/gin"
	"melloFinder/src/handlers"
)

func SetupRoutes(router *gin.Engine) {
	router.GET("/", handlers.HelloHandler)
}

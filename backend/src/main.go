package main

import (
	"github.com/gin-gonic/gin"
	"my-go-app/src/helpers"
	"my-go-app/src/routes"
	"os"
)

func main() {
	helpers.LoadEnv()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // fallback
	}

	router := gin.Default()
	routes.SetupRoutes(router)

	router.Run(":" + port)
}

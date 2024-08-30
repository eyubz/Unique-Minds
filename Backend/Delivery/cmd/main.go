package main

import (
	"fmt"
	"time"
	infrastructure "unique-minds/Infrastructure"

	"github.com/gin-gonic/gin"
)
func main() {
    config, err := infrastructure.LoadEnv()
    if err != nil {
        fmt.Println(err.Error())
    }
    timeout := time.Duration(config.ContextTimeout) * time.Second

    corsMiddleware := infrastructure.NewCorsMiddleware()

    server := gin.Default()
    server.Use(corsMiddleware.CORSMiddleware())
    serverGroup := server.Group("/api")
    router.Routers(serverGroup, config, timeout)
    server.Run(fmt.Sprintf(":%d", config.Port))
}

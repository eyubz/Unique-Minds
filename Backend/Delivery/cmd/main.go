package main

import (
	infrastructure "e-learning/Infrastructure"
	router "e-learning/Routers"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func main(){
	config , err := infrastructure.LoadEnv()
	if err != nil{
		fmt.Println(err.Error())
	}
	timeout := time.Duration(config.ContextTimeout) * time.Second
	
	server := gin.Default()
	serverGroup := server.Group("/api")
	router.Router(serverGroup, config, timeout)
	server.Run(fmt.Sprintf(":%d", config.Port))
}
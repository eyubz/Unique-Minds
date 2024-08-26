package routers

import  (
	infrastructure "e-learning/infrastructure"
)

func SetUpRouter(config *domain.Config){
	db := infrastructure.CreateDB(config.DatabaseUrl, config.ContextTimeout, config.DBName, config.UserCollection)
}

func Router(server *gin.Engine, config *domain.Config){ 
	userRoute := server.Group("user")
	NewUserRouter(userRoute, config)
}
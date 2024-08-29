package routers

import (
	controllers "unique-minds/Delivery/Controllers"
	infrastructure "unique-minds/Infrastructure"
	repository "unique-minds/Repository"
	useCase "unique-minds/Usecase"

	"github.com/gin-gonic/gin"
)


func Routers(serverGroup *gin.RouterGroup, db *infrastructure.Db, config *infrastructure.Config) {
	user_collection := db.CreateDb(config.DatabaseUrl, config.DbName, config.UserCollection)
	active_user_collection := db.CreateDb(config.DatabaseUrl, config.DbName, config.ActiveUserCollection)

	user_repository := repository.NewUserRepository(user_collection, active_user_collection, config)
	//admin_repository := repository.NewAdminRepository(user_collection, config)

	password_service := infrastructure.NewPasswordService()
	user_useCase := useCase.NewUserUseCase(user_repository, *password_service, config)
	//admin_useCase := useCase.NewAdminUseCase(admin_repository, *password_service, config, user_repository)

	userControllers := controllers.NewUserControllers(user_useCase)

	///adminControllers := controllers.NewAdminControllers(admin_useCase)

	// oauth := infrastructure.NewOauthConfig(config)

	// repo := repositories.NewSignupRepository(DB, config.UserCollection)

	// userrepo := repositories.NewUserRepository(DB, config.UserCollection)
	// aur := repositories.NewActiveUserRepository(DB, config.ActiveUserCollection)
	// usecase := usecases.NewOauthUsecase(repo, time.Duration(config.ContextTimeout)*time.Second, oauth)
	// loginusecase := usecases.NewLoginUsecase(userrepo, aur, time.Duration(config.ContextTimeout)*time.Second)

	// oauthcontroller := controllers.OauthController{
	// 	OauthUsecase: usecase,
	// 	Login:        loginusecase,
	// 	Config:       config,
	// }

	// OauthRoute.GET("/auth/google", oauthcontroller.GoogleAuth)
	// OauthRoute.GET("/auth/callback", oauthcontroller.GoogleCallback)


	corsMiddleware := infrastructure.NewCorsMiddleware().CORSMiddleware()

	authMiddleWare := infrastructure.NewAuthMiddleware(*config).AuthenticationMiddleware()

	serverGroup.Use(corsMiddleware)
	nonAuth := serverGroup.Group("auth")
	nonAuth.POST("/signup", userControllers.RegisterUser)
	nonAuth.GET("/verify-email", userControllers.VerifyEmail)
	nonAuth.POST("/login", userControllers.Login)

	


	// adminRoute := server.Group("admin")
	// adminRoute.GET("/users", authMiddleWare, adminControllers.GetAllUsers)
	// adminRoute.DELETE("/users/:id", authMiddleWare, adminControllers.DeleteUser)
	
	
	auth := serverGroup.Group("auth")
	auth.Use(authMiddleWare)
	auth.POST("/forgot-password", userControllers.ResetPassword)
	auth.POST("/reset-password", userControllers.ResetPasswordVerify)
	auth.GET("/logout", userControllers.Logout)
	auth.GET("users/:id", userControllers.GetUserProfile)

	tokenGroup := serverGroup.Group("token")
	tokenGroup.POST("/refresh", authMiddleWare, userControllers.RefreshToken)

}

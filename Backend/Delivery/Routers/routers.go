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
    course_collection := db.CreateDb(config.DatabaseUrl, config.DbName, config.CourseCollection)

    user_repository := repository.NewUserRepository(user_collection, active_user_collection, config)
    course_repository := repository.NewCourseRepository(course_collection, config)
    password_service := infrastructure.NewPasswordService()

    course_useCase := useCase.NewCourseUseCase(course_repository)
    user_useCase := useCase.NewUserUseCase(user_repository, *password_service, config)

    userControllers := controllers.NewUserControllers(user_useCase)
    courseController := controllers.NewCourseController(course_useCase)

    authMiddleWare := infrastructure.NewAuthMiddleware(*config).AuthenticationMiddleware()

    nonAuth := serverGroup.Group("auth")
    nonAuth.POST("/signup", userControllers.RegisterUser)
    nonAuth.GET("/verify-email", userControllers.VerifyEmail)
    nonAuth.POST("/login", userControllers.Login)

    auth := serverGroup.Group("auth")
    auth.Use(authMiddleWare)
    auth.POST("/forgot-password", userControllers.ResetPassword)
    auth.POST("/reset-password", userControllers.ResetPasswordVerify)
    auth.GET("logout", userControllers.Logout)
    auth.GET("users/:id", userControllers.GetUserProfile)

    tokenGroup := serverGroup.Group("token")
    tokenGroup.POST("/refresh", authMiddleWare, userControllers.RefreshToken)

    courseGroup := serverGroup.Group("courses")
    //courseGroup.Use(authMiddleWare)
    courseGroup.POST("/", courseController.UploadCourse)
    courseGroup.POST("/upload", courseController.UploadFile)

    serverGroup.GET("/api/featured-courses", courseController.GetFeaturedCourses)
    serverGroup.GET("/api/courses", courseController.GetCourses)


}

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
    student_profile_collection := db.CreateDb(config.DatabaseUrl, config.DbName, config.StudentProfileCollection)
    educator_profile_collection := db.CreateDb(config.DatabaseUrl, config.DbName, config.EducatorProfileCollection)

    user_repository := repository.NewUserRepository(user_collection, active_user_collection, student_profile_collection, educator_profile_collection, course_collection, config)
    course_repository := repository.NewCourseRepository(course_collection, educator_profile_collection, student_profile_collection, config)
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
    auth.GET("/user-profile", userControllers.GetUserProfile)


    tokenGroup := serverGroup.Group("token")
    tokenGroup.POST("/refresh", authMiddleWare, userControllers.RefreshToken)

    courseGroup := serverGroup.Group("courses")
    courseGroup.POST("/", authMiddleWare, authMiddleWare, courseController.UploadCourse)
    
    serverGroup.GET("/featured-courses", courseController.GetFeaturedCourses)
    
    serverGroup.GET("/courses", authMiddleWare, courseController.GetCourses)

    serverGroup.POST("/courses/reviews", authMiddleWare, userControllers.SaveReview)

    serverGroup.GET("/courses/my", authMiddleWare, courseController.GetMyCourse)

    serverGroup.GET("/courses/:id", authMiddleWare, courseController.GetCourseById)
    serverGroup.POST("/:id/progress", authMiddleWare, courseController.UpdateProgress)
    serverGroup.POST("/courses/:id", authMiddleWare, courseController.SaveCourse)

    serverGroup.GET("/top-educators", userControllers.GetTopEducators)    

    serverGroup.GET("/educators", userControllers.GetEducators)
    serverGroup.GET("/educators/:id", userControllers.GetEducatorById)

    serverGroup.GET("/educator/courses", authMiddleWare, courseController.GetEducatorCourses)
    serverGroup.DELETE("/educator/courses/:id", authMiddleWare, courseController.DeleteCourse)
    
    serverGroup.GET("/educator/schedules", authMiddleWare, userControllers.GetSchedules)
    serverGroup.DELETE("educators/schedules/:id", authMiddleWare, userControllers.CancelSchedule)
    serverGroup.GET("/educator/students", authMiddleWare, userControllers.GetStudentsByCourses)

    serverGroup.GET("/profile", authMiddleWare, userControllers.GetProfile)
    serverGroup.POST("/upload", authMiddleWare, courseController.UploadFile)
    serverGroup.PUT("/profile", authMiddleWare, userControllers.UpdateProfile)
    serverGroup.PUT("/availability", authMiddleWare, userControllers.SetAvailability)


    studentServer := serverGroup.Group("student")
    studentServer.Use(authMiddleWare)
    //studentServer.GET("/profile", userControllers.GetStudentProfile)
    //studentServer.PUT("/profile", userControllers.UpdateStudentProfile)
    studentServer.POST("/upload", userControllers.UploadProfileImage)


}

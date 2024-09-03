package Controllers

import (
	"net/http"
	domain "unique-minds/Domain"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/jinzhu/copier"
)

type UserControllers struct{
	userUserCase domain.UserUseCaseInterface
}

func NewUserControllers(userUseCase domain.UserUseCaseInterface) *UserControllers {
	return &UserControllers{
		userUserCase: userUseCase,
	}
}

func (uc *UserControllers) RegisterUser(c *gin.Context){
	var signUp domain.SignUpRequest
	var user domain.User

	err := c.BindJSON(&signUp)
	//fmt.Println(err.Error())
	if err != nil {
		c.JSON(400, domain.ErrorResponse{
			Message: "Invalid request",
			Status:  400,
		})
		return
	}
	validate := validator.New()

	if err := validate.Struct(signUp); err != nil {
		c.JSON(400, domain.ErrorResponse{
			Message: "Invalid request",
			Status:  400,
		})
		return
	}
	copier.Copy(&user, &signUp)

	err = uc.userUserCase.RegisterUser(user)
	if err != nil{
		c.JSON(400, domain.ErrorResponse{
			Message: err.Error(),
			Status:  400,
		})
		return
	}

	c.JSON(200, domain.SuccessResponse{
		Message: "User registered successfully. Please verify your email",
		Status:  200,
	})

}

func (uc *UserControllers)VerifyEmail(c *gin.Context){
	token := c.Query("token")
	email := c.Query("email")

	if token == "" || email == "" {
		c.JSON(400, domain.ErrorResponse{
			Message: "Both token and email required",
			Status:  400,
		})
		return
	}

	err := uc.userUserCase.VerifyEmail(email, token)
	if err != nil{
		c.JSON(400, domain.ErrorResponse{
			Message: err.Error(),
			Status:  400,
		})
		return
	}
	c.Redirect(http.StatusFound, "http://localhost:3000/verification")
}

func (uc *UserControllers)Login(c *gin.Context){
	var loginRequest domain.LoginRequest
	var user domain.User

	err := c.BindJSON(&loginRequest)
	if err != nil {
		c.JSON(400, domain.ErrorResponse{
			Message: "Invalid request",
			Status:  400,
		})
		return
	}
	validate := validator.New()

	if err := validate.Struct(loginRequest); err != nil {
		c.JSON(400, domain.ErrorResponse{
			Message: "Invalid request",
			Status:  400,
		})
		return
	}
	copier.Copy(&user, &loginRequest)
	response, err := uc.userUserCase.Login(user, c.Request.UserAgent())
	if err != nil{
		c.JSON(400, domain.ErrorResponse{
			Message: err.Error(),
			Status:  400,
		})
		return
	}

	c.JSON(200, domain.SuccessResponse{
		Message: "User Logged in successfully",
		Data: response,
		Status:  200,
	})
}


func (uc *UserControllers)RefreshToken(c *gin.Context){
	var request domain.RefreshTokenRequest
	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(400, domain.ErrorResponse{
			Message: "Invalid request",
			Status:  400,
		})
		return
	}
	user_id := c.GetString("user_id")
	if user_id == "" {
		c.JSON(500, domain.ErrorResponse{
			Message: "Unauthorized: Authorization header required",
			Status:  500,
		})
	}
	response , err := uc.userUserCase.RefreshToken(request, user_id)
	if err != nil{
		c.JSON(400, domain.ErrorResponse{
			Message: err.Error(),
			Status:  400,
		})
		return
	}
	c.JSON(
		200, domain.SuccessResponse{
			Message: "Token refreshed successfully",
			Data: response,
			Status:  200,
		},
	)

}

func (uc *UserControllers)GetUserProfile(c *gin.Context){
	user_id := c.GetString("user_id")
	if user_id == "" {
		c.JSON(500, domain.ErrorResponse{
			Message: "Unauthorized: Authorization header required",
			Status:  500,
		})
	}
	user, err := uc.userUserCase.GetUserProfile(user_id)
	if err != nil{
		c.JSON(400, domain.ErrorResponse{
			Message: err.Error(),
			Status:  400,
		})
		return
	}
	c.JSON(200, domain.SuccessResponse{
		Message: "User profile retrieved successfully",
		Data: user,
		Status:  200,
	})
}

func (uc *UserControllers)ResetPassword(c *gin.Context){
	var request domain.ResetPasswordRequest
	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(400, domain.ErrorResponse{
			Message: "Invalid request",
			Status:  400,
		})
		return
	}
	user_id := c.GetString("user_id")
	if user_id == "" {
		c.JSON(500, domain.ErrorResponse{
			Message: "Unauthorized: Authorization header required",
			Status:  500,
		})
	}
	err = uc.userUserCase.ResetPassword(request.Email, user_id)
	if err != nil{
		c.JSON(400, domain.ErrorResponse{
			Message: err.Error(),
			Status:  400,
		})
		return
	}
	c.JSON(200, domain.SuccessResponse{
		Message: "Password reset link sent successfully",
		Status:  200,
	})
}


func (uc *UserControllers) ResetPasswordVerify(c *gin.Context){
	var newPassword domain.ResetPassword
	token := c.Query("token")
	email := c.Query("email")

	if token == "" || email == "" {
		c.JSON(400, domain.ErrorResponse{
			Message: "Both token and email required",
			Status:  400,
		})
		return
	}
	err := c.BindJSON(&newPassword)
	if err != nil {
		c.JSON(400, domain.ErrorResponse{
			Message: "Invalid request",
			Status:  400,
		})
		return 
	}

	user_id := c.GetString("user_id")
	if user_id == "" {
		c.JSON(500, domain.ErrorResponse{
			Message: "Unauthorized: Authorization header required",
			Status:  500,
		})
	}
	err = uc.userUserCase.ResetPasswordVerify(email, token, user_id, newPassword.NewPassword)
	if err != nil{
		c.JSON(400, domain.ErrorResponse{
			Message: err.Error(),
			Status:  400,
		})
		return
	}
	c.JSON(200, domain.SuccessResponse{
		Message: "Password updated successfully",
		Status:  200,})
}

func (uc *UserControllers) Logout(c *gin.Context) {
	user_id := c.GetString("user_id")
	user_agent := c.Request.UserAgent()
	err := uc.userUserCase.Logout(user_id, user_agent)
	if err != nil {
		c.JSON(500, domain.ErrorResponse{
			Message: "Internal server error",
			Status:  500,
		})
		return
	}
	c.JSON(200, domain.SuccessResponse{
		Message: "Logout success",
		Status:  200,
	})
}

func (uc *UserControllers) UpdateUser(c *gin.Context) {
	var user domain.UserProfile
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")
	err := uc.userUserCase.UpdateUser(id, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

package Controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
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
		c.JSON(500, domain.ErrorResponse{
			Message: err.Error(),
			Status:  500,
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

// func (uc *UserControllers)GetUserProfile(c *gin.Context){
// 	user_id := c.GetString("user_id")
// 	if user_id == "" {
// 		c.JSON(500, domain.ErrorResponse{
// 			Message: "Unauthorized: Authorization header required",
// 			Status:  500,
// 		})
// 	}
// 	user, err := uc.userUserCase.GetUserProfile(user_id)
// 	if err != nil{
// 		c.JSON(400, domain.ErrorResponse{
// 			Message: err.Error(),
// 			Status:  400,
// 		})
// 		return
// 	}
// 	c.JSON(200, domain.SuccessResponse{
// 		Message: "User profile retrieved successfully",
// 		Data: user,
// 		Status:  200,
// 	})
// }

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

// func (uc *UserControllers) UpdateUser(c *gin.Context) {
// 	var user domain.UserProfile
// 	if err := c.BindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	id := c.Param("id")
// 	err := uc.userUserCase.UpdateUser(id, user)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
// }


// func (uc *UserControllers) GetStudentProfile(c *gin.Context) {
//     userId := c.GetString("userId")
//     if userId == "" {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
//         return
//     }

//     profile, err := uc.userUserCase.GetUserProfile(userId)
//     if err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, profile)
// }

// func (uc *UserControllers) UpdateStudentProfile(c *gin.Context) {
//     userId := c.GetString("userId")
//     if userId == "" {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
//         return
//     }

//     var profileData domain.StudentProfile

//     if err := c.ShouldBind(&profileData); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
//         return
//     }

//     updatedProfile, err := uc.userUserCase.UpdateStudentProfile(userId, &profileData)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, updatedProfile)
// }

func (uc *UserControllers) UploadProfileImage (ctx *gin.Context) {
    file, err := ctx.FormFile("file")
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
        return
    }

    filename := filepath.Base(file.Filename)
    savePath := fmt.Sprintf("./uploads/%s", filename)

    if err := ctx.SaveUploadedFile(file, savePath); err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save file"})
        fmt.Println(err)
        return
    }

    fileURL := fmt.Sprintf("http://localhost:8080/uploads/%s", filename)

    ctx.JSON(http.StatusOK, gin.H{"fileUrl": fileURL})
}

func (uc *UserControllers) GetEducators(ctx *gin.Context) {
	pageNo := ctx.Query("page")
	pageSize := ctx.Query("limit")
    search := ctx.Query("search")

	if pageNo == "" {
		pageNo = "1"
	}
	if pageSize == "" {
		pageSize = "10"
	}

	educators, pagination, err := uc.userUserCase.GetEducators(pageNo, pageSize, search)
	if err != nil {
		ctx.JSON(500, domain.ErrorResponse{
			Message: err.Error(),
			Status: 500,

		})
		ctx.Abort()
	} else {
		ctx.JSON(http.StatusOK, domain.SuccessResponse{
			Status: http.StatusOK,
			Data: map[string]interface{}{
				"educators" : educators, 
				"pagination" : pagination,
			},
			Message: "educators fetched successfully.",
		})
	}
}

func (uc *UserControllers) GetEducatorById(ctx *gin.Context) {
    id := ctx.Param("id")
    course, err := uc.userUserCase.GetEducatorById(id)

    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, course)
}

func (uc *UserControllers) SaveReview(ctx *gin.Context) {
	var review domain.Review

	err := ctx.ShouldBind(&review)
	if err != nil{
		ctx.JSON(400, domain.ErrorResponse{
            Message: "Bad request",
            Status: 500,
        })
	}
	
	err = uc.userUserCase.SaveReview(review)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Review Saved successfully"})
}
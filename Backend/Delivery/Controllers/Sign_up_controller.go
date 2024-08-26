type Controllers

type struct SignUpController{
	UserUseCase *domain.UserUseCase
}


func NewUserCOntroller(userUseCase *domain.UserUseCaseInterface)*SignUpController{
	return &{
		SignUpController{
			UserUseCase: userUseCase,
		}
	}
}


func (c *SignUpController) SignUpHandler(c *gin.context){
	var signUp *domain.SignUpRequest
}


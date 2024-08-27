package controllers

import (
	infrastructure "blogs/Infrastructure"
	"net/http"
	domain "unique-minds/Domain"

	"github.com/gin-gonic/gin"
)

type OauthController struct {
	OauthUseCase domain.OauthUsecase
	userUseCase        domain.UserUseCaseInterface
	Config       *infrastructure.Config
}

func (s *OauthController) GoogleAuth(c *gin.Context) {

	response := s.OauthUseCase.OauthService()
	url := response
	c.Redirect(http.StatusTemporaryRedirect, url.(domain.URL).URL)
}

func (s *OauthController) GoogleCallback(c *gin.Context) {
	state := c.Query("state")
	if state != s.Config.OauthSecret {
		c.JSON(400, gin.H{"error": "invalid oauth state"})
		return

	}
	code := c.Query("code")

	user := s.OauthUseCase.OauthCallback(c, code)

	switch data := user.(type) {
	case *domain.UserResponse:
		acessToken, err := s.Login.CreateAccessToken(&data.User, s.Config.AccessTokenSecret, s.Config.AccessTokenExpiryHour)
		if err != nil {
			c.JSON(500, gin.H{"error": "error creating access token"})
			return
		}

		refreshToken, err := s.Login.CreateRefreshToken(&data.User, s.Config.RefreshTokenSecret, s.Config.RefreshTokenExpiryHour)

		if err != nil {
			c.JSON(500, gin.H{"error": "error creating refresh token"})
			return
		}
		activeUser := domain.ActiveUser{
			ID:           data.User.ID,
			RefreshToken: refreshToken,
			UserAgent:    c.Request.UserAgent(),
		}
		err = s.Login.SaveAsActiveUser(activeUser, refreshToken, c)

		if err != nil {
			c.JSON(500, gin.H{"error": "error saving active user"})
			return
		}

		loginResponse := &domain.LoginResponse{
			Message:      "Login Successful",
			AccessToken:  acessToken,
			RefreshToken: refreshToken,
		}

		HandleResponse(c, loginResponse)
		return
	case *domain.ErrorResponse:
		HandleResponse(c, data)
		return
	default:
		c.JSON(500, gin.H{"error": "unexpected response from OauthCallback"})
	}

}
package domain

import (
	"github.com/golang-jwt/jwt/v4"
)

type JwtCustomClaims struct {
	ID string `json:"id"`
	UserType string `json:"user_type"`
	jwt.RegisteredClaims
}
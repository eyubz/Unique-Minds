package domain

import (
	"errors"
	"regexp"
	"strings"
)

type SignUpRequest struct {
	UserName        string `bson:"username" json:"username" validate:"required,min=5,max=255`
	Email           string `bson:"email" json:"email" validate:"required`
	Password        string `bson:"password" json:"password" validate:"required`
	ConfirmPassword string `bson:"confirm_password" json:"confirm_password" validate:"required`
	UserType        string `bson:"user_type" json:"user_type" validate:"required`
}

func (s *SignUpRequest) ValidateEmail() error {
	regex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	if !regex.MatchString(s.Email) {
		return errors.New("invalid email format")
	}
	return nil
}

func (s *SignUpRequest) ValidatePassword() error {
	if len(s.Password) < 8 || len(password) > 30 {
		return errors.New("password must be between 8 and 30 characters long")
	}

	var (
		hasUpper   = regexp.MustCompile(`[A-Z]`).MatchString
		hasLower   = regexp.MustCompile(`[a-z]`).MatchString
		hasNumber  = regexp.MustCompile(`[0-9]`).MatchString
		hasSpecial = regexp.MustCompile(`[!@#~$%^&*()_+|<>?:{}]`).MatchString
	)
	if !hasUpper(password) {
		return errors.New("password must contain at least one uppercase letter")
	}
	if !hasLower(password) {
		return errors.New("password must contain at least one lowercase letter")
	}
	if !hasNumber(password) {
		return errors.New("password must contain at least one number")
	}
	if !hasSpecial(password) {
		return errors.New("password must contain at least one special character")
	}

	return nil
}

func (s *SignUpRequest) ValidateUserType() error {
	if strings.ToLower(s.UserType) != "student" || strings.ToLower(s.UserType) != "educator" {
		return errors.New("User type should be student or educator")
	}
	return nil
}
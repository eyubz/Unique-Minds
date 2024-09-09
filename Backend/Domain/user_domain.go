package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                   primitive.ObjectID   `bson:"_id,omitempity" json:"id" `
	UserName            string                `bson:"username"  json:"username"`
	Email 				 string 			  `bson:"email" validate:"required,email" json:"email"`
    Password             string               `bson:"password" json:"password" validate:"required"`
	IsVerified			 bool 				  `bson:"is_verified" json:"is_verified"`
	Created_At		     time.Time			  `bson:"created_at" json:"created_at"`
    ResetPasswordToken   string               `bson:"reset_password_token" json:"reset_password_token"`
    ResetPasswordExpires time.Time            `bson:"reset_password_expires" json:"reset_password_expires"`
	VerificationToken    string               `bson:"verification_token" json:"verification_token"`
	VerificationExpires  time.Time            `bson:"verification_expires" json:"verification_expires"`
	Role 			   	 string               `bson:"role" json:"role"`
	UserType        	 string 			  `bson:"user_type" json:"user_type" validate:"required"`
}

type StudentProfile struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FullName      string             `bson:"name" json:"name"`
	UserName      string       	     `bson:"username"  json:"username"`
	Email 		  string      		 `bson:"email" validate:"required,email" json:"email"`
    Password      string             `bson:"password" json:"password" validate:"required"`
	Age           int                `json:"age" bson:"age"`
	Bio           string             `json:"bio" bson:"bio"`
	GuardianEmail string             `json:"guardianEmail" bson:"guardianEmail"`
	GuardianPhone string             `json:"guardianPhone" bson:"guardianPhone"`
	Location      string             `json:"location" bson:"location"`
	ProfileImage  string             `json:"profileImage" bson:"profileImage"`
	UserID        primitive.ObjectID `json:"userId" bson:"userId"`
	UpdateAt      time.Time			 `json:"updateAt" bson:"updateAt"`
	Created_At	  time.Time			  `bson:"created_at" json:"created_at"`
	Dob           string             `bson:"dob" json:"dob"`
	Phone         string             `bson:"phone" json:"phone"`
	Address       Address            `bson:"address" json:"address"`
	CourseIds     []primitive.ObjectID `bson:"course_id" json:"course_id"`
	EnrolledCourses []primitive.ObjectID `bson:"courses" json:"courses"`
}


type EducatorProfile struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FullName      string       		 `bson:"name" json:"name"`
	UserName      string             `bson:"username"  json:"username"`
	Email 		  string 			 `bson:"email" validate:"required,email" json:"email"`
    Password      string             `bson:"password" json:"password" validate:"required"`
	Age           int                `json:"age" bson:"age"`
	Bio           string             `json:"bio" bson:"bio"`
	GuardianEmail string             `json:"guardianEmail" bson:"guardianEmail"`
	GuardianPhone string             `json:"guardianPhone" bson:"guardianPhone"`
	Location      string             `json:"location" bson:"location"`
	ProfileImage  string             `json:"profileImage" bson:"profileImage"`
	UserID        primitive.ObjectID `json:"userId" bson:"userId"`
	Created_At	  time.Time			  `bson:"created_at" json:"created_at"`
	UpdateAt      time.Time			 `json:"updateAt" bson:"updateAt"`
	Contact       string      		 `bson:"contact" json:"contact"`
	Dob           string             `bson:"dob" json:"dob"`
	Phone         string             `bson:"phone" json:"phone"`
	Address       Address            `bson:"address" json:"address"`
	Reviews 	 []Review            `bson:"reviews" json:"reviews"`
}

type Address struct {
	Street     string `bson:"street" json:"street"`
	City       string `bson:"city" json:"city"`
	PostalCode string `bson:"postalCode" json:"postalCode"`
}


type Review struct {
    Name        string  `bson:"name" json:"name"`
    Text        string  `bson:"text" json:"text"`
    Rating      float64 `bson:"rating" json:"rating"`
    EducatorID  uint    `bson:"educator_id" json:"educator_id"`
}

type UserUseCaseInterface interface {
	RegisterUser(user User) error
	VerifyEmail(email string, token string) error
	Login(user User, user_agent string)(LoginResponse, error)
	CreateAccessToken(user *User, secret string, expiry int) (accessToken string, err error)
	CreateRefreshToken(user *User, secret string, expiry int) (refreshToken string, err error)
	RefreshToken(request RefreshTokenRequest, user_id string) (RefreshTokenResponse, error)
	//GetUserProfile(id string)(UserProfile, error)
	ResetPassword(email string, user_id string)error
	ResetPasswordVerify(email string, token string, user_id string, password string) error
	Logout(user_id string, user_agent string) error	
	GetEducators(pageNo string, pageSize string, search string) ([]EducatorProfile, Pagination, error)
	GetEducatorById(id string) (EducatorProfile, error)
	SaveReview(review Review) error
	//UpdateUser(id string, user UserProfile) error
	//UpdateStudentProfile(userId string, updatedProfile *StudentProfile) (*StudentProfile, error)
	
}

type UserRepositoryInterface interface {
	RegisterUser(user User) error
	FindUserByEmail(email string) (User, error)
	FindUserByUserName(username string) (User, error)
	FindUserByID(id string)(User, error)
	SaveAsActiveUser(user ActiveUser, refreshToken string) error
	CreateActiveUser(au ActiveUser) error
	DeleteActiveUser(ids string, user_agent string) error
	FindActiveUser(ids string, user_agent string) (ActiveUser, error)
	UpdateUser(id string, user User) error
	GetEducators(pageNo int64, pageSize int64, search string) ([]EducatorProfile, Pagination, error)
	GetEducatorsById(id string) (EducatorProfile, error)
	SaveReview(review Review) error
	
	//GetStudentProfile(userId string) (*StudentProfile, error)
	//UpdateStudentProfile(userId string, updatedProfile *StudentProfile) (*StudentProfile, error)
}

type AdminUseCaseInterface interface {
	GetAllUsers(pageNo, pageSize string, user_id string) ([]User, error)
	DeleteUser(id string, user_id string) (bool, error)
}

type AdminRepositoryInterface interface {
	GetAllUsers(pageNo, pageSize int64) ([]User, error)
	DeleteUser(id string) error
}
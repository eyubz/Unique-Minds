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

type UserData struct {
    ProfileImage string
    Role         string
}


type StudentProfile struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FullName      string             `bson:"name" json:"name"`
	Age           int                `json:"age" bson:"age"`
	Bio           string             `json:"bio" bson:"bio"`
	GuardianEmail string             `json:"guardianEmail" bson:"guardianEmail"`
	GuardianPhone string             `json:"guardianPhone" bson:"guardianPhone"`
	Location      string             `json:"location" bson:"location"`
	ProfileImage  string             `json:"profileImage" bson:"profileImage"`
	UpdateAt      time.Time			 `json:"updateAt" bson:"updateAt"`
	Created_At	  time.Time			  `bson:"created_at" json:"created_at"`
	CourseIds     []primitive.ObjectID `bson:"course_id" json:"course_id"`
	EnrolledCourses []CourseProgress 		`bson:"courses" json:"courses"`
	Schedule 	   []Schedule         `bson:"schedules" json:"schedules"`
	Courses     []Course           `bson:"course_s" json:"course_s"`
	Condition	 string             `bson:"condition" json:"condition"`

}

type CourseProgress struct{
	CourseID     primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Progress	 int64      `json:"progress" bson:"progress"`
	CompletedParts []primitive.ObjectID  `json:"completed_parts" bson:"completed_parts"`
	IsCompleted    bool  `json:"is_completed" bson:"is_completed"`

}

type CourseDetailResponse struct{
	Course  Course `json:"course"`
	Progress CourseProgress `json:"progress"`
}

type ProgressRequest struct {
    CompletedParts []string `json:"completed_parts"`
}

type EducatorProfile struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FullName      string       		 `bson:"name" json:"name"`
	Title 	   	  string             `bson:"title" json:"title"`
	ProfileImage  string             `json:"profileImage" bson:"profileImage"`
	Phone 		  string 			 `bson:"phone" json:"phone"`
	Bio 		  string             `json:"bio" bson:"bio"`
	Rating        float32		     `json:"rating" bson:"rating"`
	Reviews       []Review           `bson:"reviews" json:"reviews"`
	Availability  []string             `bson:"availability" json:"availability"`
	Email 		  string 			 `bson:"email" validate:"required,email" json:"email"`
	Created_At	  time.Time			  `bson:"created_at" json:"created_at"`
	UpdateAt      time.Time			 `json:"updateAt" bson:"updateAt"`
	Address       string            `bson:"address" json:"address"`
	Schedules     []Schedule         `bson:"schedules" json:"schedules"`
	Students 	  []Student          `bson:"students" json:"students"`
	
}

type Student struct{
	Student_id primitive.ObjectID `json:"student_id" bson:"student_id"`
	Course_id  primitive.ObjectID `json:"course_id" bson:"course_id"`
}

type Schedule struct {
	ID 		  primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	StudentID primitive.ObjectID `json:"student_id" bson:"student_id"`
	EducatorId primitive.ObjectID `json:"educator_id" bson:"educator_id"`
	Date 	  time.Time          `json:"date" bson:"date"`
	GoogleMeetLink string       `json:"googleMeetLink" bson:"googleMeetLink"`
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
type Profile struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Name        string             `bson:"name"`
	Description string             `bson:"description"`
}
type CourseWithStudents struct {
	CourseName string           `json:"courseName"`
	Students   []StudentProfile `json:"students"`
}

type Avail struct {
    Start time.Time `json:"start" bson:"start"`
    End   time.Time `json:"end" bson:"end"`
}

type UserUseCaseInterface interface {
	RegisterUser(user User) error
	VerifyEmail(email string, token string) error
	Login(user User, user_agent string)(LoginResponse, error)
	CreateAccessToken(user *User, secret string, expiry int) (accessToken string, err error)
	CreateRefreshToken(user *User, secret string, expiry int) (refreshToken string, err error)
	RefreshToken(request RefreshTokenRequest, user_id string) (RefreshTokenResponse, error)
	ResetPassword(email string, user_id string)error
	ResetPasswordVerify(email string, token string, user_id string, password string) error
	Logout(user_id string, user_agent string) error	
	GetEducators(pageNo string, pageSize string, search string) ([]EducatorProfile, Pagination, error)
	GetEducatorById(id string) (EducatorProfile, error)
	SaveReview(review Review) error
	UpdateStudentProfile(user_id string, updatedProfile StudentProfile) (StudentProfile, error)
	GetStudentProfile(user_id string) (StudentProfile, error)
	UpdateEducatorProfile(user_id string, updatedProfile EducatorProfile) (EducatorProfile, error)
	GetEducatorProfile(user_id string) (EducatorProfile, error)
	SetAvailability(userID string, availability string) error
	GetEducatorSchedules(educatorId string) (interface{}, error)
	CancelEducatorSchedule(scheduleId string, user_id string) error
	FetchStudentsByCourses(educatorID string) ([]CourseWithStudents, error)
	GetUserProfile(userID string) (*UserData, error)
	GetTopEducatorsUseCase() ([]EducatorProfile, error)
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
	GetStudentById(id string) (StudentProfile, error)
	UpdateEducatorProfile(user_id string, educator EducatorProfile)EducatorProfile
	UpdateStudentProfile(user_id string, student StudentProfile)StudentProfile
	SetAvailability(userID, availability string) error 
	FindEducatorSchedules(educatorId string) (interface{}, error)
	DeleteSchedule(scheduleId string, userId string) error
	GetStudentsFromEducatorProfile(educatorID string) ([]CourseWithStudents, error)
	FindById(userID string) (*UserData, error)
	GetTopEducators() ([]EducatorProfile, error)
}

type AdminUseCaseInterface interface {
	GetAllUsers(pageNo, pageSize string, user_id string) ([]User, error)
	DeleteUser(id string, user_id string) (bool, error)
}

type AdminRepositoryInterface interface {
	GetAllUsers(pageNo, pageSize int64) ([]User, error)
	DeleteUser(id string) error
}

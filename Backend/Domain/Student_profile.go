package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type StudentProfile struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name          string             `json:"name" bson:"name"`
	Age           int                `json:"age" bson:"age"`
	Bio           string             `json:"bio" bson:"bio"`
	GuardianEmail string             `json:"guardianEmail" bson:"guardianEmail"`
	GuardianPhone string             `json:"guardianPhone" bson:"guardianPhone"`
	Location      string             `json:"location" bson:"location"`
	ProfileImage  string             `json:"profileImage" bson:"profileImage"`
	UserID        primitive.ObjectID `json:"userId" bson:"userId"`
	UpdateAt      time.Time			 `json:"updateAt" bson:"updateAt"`
}

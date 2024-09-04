package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Course struct {
    ID          primitive.ObjectID    `json:"_id" bson:"_id"`
    Name        string    `json:"name" bson:"name"`
    Description string    `json:"description" bson:"description"`
    Image       string    `json:"image" bson:"image"`
    Parts       []Part    `json:"parts" bson:"parts"`
    CreatedDate time.Time `json:"created_date" bson:"created_date"`
    LastUpdated time.Time `json:"last_updated" bson:"last_updated"`
	IsFeatured  bool      `json:"is_featured" bson:"is_featured"`
}

type Part struct {
    ID          primitive.ObjectID    `json:"_id" bson:"_id"`
    Name        string    `json:"name" bson:"name"`
    Description string    `json:"description" bson:"description"`
    Materials   []Material `json:"materials" bson:"materials"`
    Sequence    int    `json:"sequence" bson:"sequence"`
    CreatedDate time.Time `json:"created_date" bson:"created_date"`
    LastUpdated time.Time `json:"last_updated" bson:"last_updated"`
}

type Material struct {
    ID          primitive.ObjectID    `json:"_id" bson:"_id"`
    Name        string    `json:"name" bson:"name"`
    Type        string    `json:"type" bson:"type"`
    Content     string    `json:"content" bson:"content"`
    Description string    `json:"description" bson:"description"`
    CreatedDate time.Time `json:"created_date" bson:"created_date"`
    LastUpdated time.Time `json:"last_updated" bson:"last_updated"`
}

type CourseRepository interface {
    Save(course *Course) error
    FetchRecentCourses() ([]Course, error)
}
type CourseUseCaseInterface interface {
    UploadCourse(course *Course) error
    GetRecentCourses() ([]Course, error)
}
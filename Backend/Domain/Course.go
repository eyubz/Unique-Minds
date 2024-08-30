package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Course struct {
    ID          primitive.ObjectID    `json:"_id"`
    Name        string    `json:"name"`
    Description string    `json:"description"`
    Image       string    `json:"image"`
    Parts       []Part    `json:"parts"`
    CreatedDate time.Time `json:"created_date"`
    LastUpdated time.Time `json:"last_updated"`
	IsFeatured  bool      `bson:"is_featured"`
}

type Part struct {
    ID          string    `json:"id"`
    Name        string    `json:"name"`
    Description string    `json:"description"`
    Materials   []Material `json:"materials"`
    Sequence    int       `json:"sequence"`
    CreatedDate time.Time `json:"created_date"`
    LastUpdated time.Time `json:"last_updated"`
}

type Material struct {
    ID          string    `json:"id"`
    Name        string    `json:"name"`
    Type        string    `json:"type"`
    Content     string    `json:"content"`
    Description string    `json:"description"`
    CreatedDate time.Time `json:"created_date"`
    LastUpdated time.Time `json:"last_updated"`
}

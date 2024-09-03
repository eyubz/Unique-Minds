package repository

import (
	"context"
	"time"
	domain "unique-minds/Domain"
	infrastructure "unique-minds/Infrastructure"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CourseRepository struct {
    collection *mongo.Collection
	config   *infrastructure.Config
}

func NewCourseRepository(collection *mongo.Collection, config *infrastructure.Config) *CourseRepository{
    return &CourseRepository{
		collection: collection,
		config: config,
    }
}

func (r *CourseRepository) Save(course *domain.Course) error {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

	course.ID = primitive.NewObjectID()
	course.CreatedDate = time.Now()
	course.LastUpdated = time.Now()

    filter := bson.M{"_id": course.ID}
    update := bson.M{"$set": course}
    opts := options.Update().SetUpsert(true)

    _, err := r.collection.UpdateOne(ctx, filter, update, opts)
    if err != nil {
        return err
    }

    return nil
}

// func (r *CourseRepositoryImpl) FindByID(id uint) (*domain.Course, error) {
//     ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
//     defer cancel()

//     var course domain.Course
//     filter := bson.M{"_id": id}

//     err := r.collection.FindOne(ctx, filter).Decode(&course)
//     if err != nil {
//         if errors.Is(err, mongo.ErrNoDocuments) {
//             return nil, errors.New("course not found")
//         }
//         return nil, err
//     }

//     return &course, nil
// }

package repository

import (
	"context"
	"errors"
	"math"
	"time"
	domain "unique-minds/Domain"
	infrastructure "unique-minds/Infrastructure"
	utils "unique-minds/Utils"

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

func (r *CourseRepository) FetchRecentCourses() ([]domain.Course, error) {
    var courses []domain.Course

    cur, err := r.collection.Find(context.TODO(), bson.D{}, options.Find().SetSort(bson.D{{Key: "created_at", Value: -1}}).SetLimit(3))
    if err != nil {
        return nil, err
    }
    defer cur.Close(context.TODO())

    for cur.Next(context.TODO()) {
        var course domain.Course
        if err := cur.Decode(&course); err != nil {
            return nil, err
        }
        courses = append(courses, course)
    }

    if err := cur.Err(); err != nil {
        return nil, err
    }
	return courses, nil
}

func (r *CourseRepository) GetCourses(pageNo int64, pageSize int64, search string, tag string) ([]domain.Course, domain.Pagination, error) {
	pagination := utils.PaginationByPage(pageNo, pageSize)

	totalResults, err := r.collection.CountDocuments(context.TODO(), bson.M{})
	if err != nil {
		return []domain.Course{}, domain.Pagination{}, err
	}
    filter := bson.M{}
    if search != "" {
        filter["name"] = bson.M{"$regex": search, "$options": "i"}
    }
    if tag != "" {
        filter["tags"] = bson.M{"$regex": tag, "$options": "i"}
    }

	totalPages := int64(math.Ceil(float64(totalResults) / float64(pageSize)))

	cursor, err := r.collection.Find(context.TODO(), filter, pagination)
    
	if err != nil {
		return []domain.Course{}, domain.Pagination{}, err
	}
	var courses []domain.Course
	for cursor.Next(context.TODO()) {
		var course domain.Course
		if err := cursor.Decode(&course); err != nil {
			return []domain.Course{}, domain.Pagination{}, err
		}
		courses = append(courses, course)
	}
	paginationInfo := domain.Pagination{
		CurrentPage: pageNo,
		PageSize:    pageSize,
		TotalPages:  totalPages,
		TotatRecord: totalResults,
	}

	return courses, paginationInfo, nil
}

func (r *CourseRepository) GerCourseById(id string) (domain.Course, error) {
	var course domain.Course

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.Course{}, err
	}

	filter := bson.M{"_id": objID}
	err = r.collection.FindOne(context.TODO(), filter).Decode(&course)
	if err != nil { 
		return domain.Course{}, err
	}

	return course, nil
}

func (r *CourseRepository) SaveCourse(userID string, courseID string) error {
	studentObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid student ID")
	}
	courseObjID, err := primitive.ObjectIDFromHex(courseID)
	if err != nil {
		return errors.New("invalid course ID")
	}
	filter := bson.M{"_id": studentObjID}
	update := bson.M{"$push": bson.M{"course_id": courseObjID}}

	_, err = r.collection.UpdateOne(context.TODO(), filter, update)
	return err
}
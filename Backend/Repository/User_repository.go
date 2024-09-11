package repository

import (
	"context"
	"errors"
	"fmt"
	"math"
	"strings"
	"time"
	domain "unique-minds/Domain"
	infrastructure "unique-minds/Infrastructure"
	utils "unique-minds/Utils"

	// Add this line to import the package that defines the StudentProfile struct
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository struct {
	collection *mongo.Collection
	activeUserCollection *mongo.Collection
	studentProfileCollection *mongo.Collection
	educatorProfileCollection *mongo.Collection
	courseCollection *mongo.Collection
	config   *infrastructure.Config
}

func NewUserRepository(collection *mongo.Collection, activeUserColl *mongo.Collection, studentProfile *mongo.Collection, educatorProfile *mongo.Collection, courseColl *mongo.Collection, config *infrastructure.Config) *UserRepository {
	return &UserRepository{
		collection: collection,
		activeUserCollection: activeUserColl,
		config: config,
		studentProfileCollection: studentProfile,
		educatorProfileCollection: educatorProfile,
		courseCollection: courseColl,
	}
}

func (ur *UserRepository) FindUserByEmail(email string) (domain.User, error) {
	var user domain.User
	context, _ := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	filter := bson.M{"email": email}
	err := ur.collection.FindOne(context, filter).Decode(&user)
	if err != nil {
		return user, err
	}
	return user, nil
}

func (ur *UserRepository) FindUserByUserName(username string) (domain.User, error) {
	var user domain.User
	context, _ := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	filter := bson.M{"user_name": username}
	err := ur.collection.FindOne(context, filter).Decode(&user)
	if err != nil {
		return user, err
	}
	return user, nil
}

func (ur *UserRepository) RegisterUser(user domain.User) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	defer cancel()
	user.ID = primitive.NewObjectID()
	_, err := ur.collection.InsertOne(context, user)
	if err != nil {
		return err
	}
	if strings.ToLower(user.UserType) == "student"{
		var student = domain.StudentProfile{
			ID: user.ID,
			UserName: user.UserName,
			Email: user.Email,
			Password: user.Password,
			Created_At: user.Created_At,
			UpdateAt: user.Created_At,
		}
		_, err = ur.studentProfileCollection.InsertOne(context, student)

	}else{
		fmt.Println(user.UserType)
		var educator = domain.EducatorProfile{
			ID: user.ID,
			UserName: user.UserName,
			Email: user.Email,
			Password: user.Password,
			Created_At: user.Created_At,
			UpdateAt: user.Created_At,
		}
		_, err = ur.educatorProfileCollection.InsertOne(context, educator)
	}
	if err != nil {
		return err
	}
	return nil
}

func (ur *UserRepository) UpdateUser(id string, user domain.User) error {
	context, _ := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	user_id, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": user_id}
	_, err := ur.collection.UpdateOne(context, filter, bson.M{"$set": user})
	if err != nil {
		return err
	}
	return nil
}

func (ur *UserRepository) FindUserByID(id string)(domain.User, error){
	var user domain.User
	context, _ := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	objectId, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": objectId}
	err := ur.collection.FindOne(context, filter).Decode(&user)
	if err != nil {
		return user, err
	}
	return user, nil
}

func (ur *UserRepository) SaveAsActiveUser(user domain.ActiveUser, refreshToken string) error {
	_, err := ur.FindActiveUser(user.ID.Hex(), user.UserAgent)
	if err == nil {
		return errors.New("user already logged in")
	}
	return ur.CreateActiveUser(user)
}

func (ur *UserRepository) CreateActiveUser(au domain.ActiveUser) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	defer cancel()
	_, err := ur.activeUserCollection.InsertOne(context, au)

	return err
}

func (ur *UserRepository) DeleteActiveUser(ids string, user_agent string) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	defer cancel()
	id, err := primitive.ObjectIDFromHex(ids)
	if err != nil {
		return err
	}
	_, err = ur.activeUserCollection.DeleteOne(context, bson.M{"id": id, "user_agent": user_agent})
	return err
}

func (ur *UserRepository) FindActiveUser(ids string, user_agent string) (domain.ActiveUser, error) {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	defer cancel()
	id, err := primitive.ObjectIDFromHex(ids)
	if err != nil {
		return domain.ActiveUser{}, err
	}
	var au domain.ActiveUser
	err = ur.activeUserCollection.FindOne(context, bson.M{"id": id, "user_agent": user_agent}).Decode(&au)
	return au, err
}

// func (ur *UserRepository) GetStudentProfile(userId string) (*domain.StudentProfile, error) {
// 	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
// 	defer cancel()
//     var profile domain.StudentProfile

//     filter := bson.M{"user_id": userId}
//     err := ur.profileCollection.FindOne(context, filter).Decode(&profile)

//     if err != nil {
//         if err == mongo.ErrNoDocuments {
//             return nil, errors.New("profile not found")
//         }
//         return nil, err
//     }

//     return &profile, nil
// }

// func  (ur *UserRepository) UpdateStudentProfile(userId string, updatedProfile *domain.StudentProfile) (*domain.StudentProfile, error) {
// 	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
// 	defer cancel()
//     filter := bson.M{"user_id": updatedProfile.UserID}

//     update := bson.M{
//         "$set": bson.M{
//             "name":           updatedProfile.Name,
//             "age":            updatedProfile.Age,
//             "bio":            updatedProfile.Bio,
//             "guardianEmail":  updatedProfile.GuardianEmail,
//             "guardianPhone":  updatedProfile.GuardianPhone,
//             "location":       updatedProfile.Location,
//             "profileImage":   updatedProfile.ProfileImage,
//             "updatedAt":      time.Now(),
//         },
//     }

	
//     opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
//     err := ur.profileCollection.FindOneAndUpdate(context, filter, update, opts).Decode(&updatedProfile)
//     if err != nil {
//         return nil, err
//     }

//     return updatedProfile, nil
// }



func (ur *UserRepository) GetEducators(pageNo int64, pageSize int64, search string) ([]domain.EducatorProfile, domain.Pagination, error) {
	pagination := utils.PaginationByPage(pageNo, pageSize)

	totalResults, err := ur.educatorProfileCollection.CountDocuments(context.TODO(), bson.M{})
	if err != nil {
		return []domain.EducatorProfile{}, domain.Pagination{}, err
	}
    filter := bson.M{}
    if search != "" {
        filter["name"] = bson.M{"$regex": search, "$options": "i"}
    }
   
	totalPages := int64(math.Ceil(float64(totalResults) / float64(pageSize)))

	cursor, err := ur.educatorProfileCollection.Find(context.TODO(), filter, pagination)
    
	if err != nil {
		return []domain.EducatorProfile{}, domain.Pagination{}, err
	}
	var educators []domain.EducatorProfile
	for cursor.Next(context.TODO()) {
		var educator domain.EducatorProfile
		if err := cursor.Decode(&educator); err != nil {
			return []domain.EducatorProfile{}, domain.Pagination{}, err
		}
		educators = append(educators, educator)
	}
	paginationInfo := domain.Pagination{
		CurrentPage: pageNo,
		PageSize:    pageSize,
		TotalPages:  totalPages,
		TotatRecord: totalResults,
	}

	return educators, paginationInfo, nil
}

func (ur *UserRepository) GetEducatorsById(id string) (domain.EducatorProfile, error) {
	var educator domain.EducatorProfile

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.EducatorProfile{}, err
	}

	filter := bson.M{"_id": objID}
	err = ur.educatorProfileCollection.FindOne(context.TODO(), filter).Decode(&educator)
	if err != nil { 
		return domain.EducatorProfile{}, err
	}

	return educator, nil
}

func (ur *UserRepository) SaveReview(review domain.Review) error {
	filter := bson.M{"_id": review.EducatorID}
	update := bson.M{"$push": bson.M{"reviews": review}}

	_, err := ur.educatorProfileCollection.UpdateOne(context.TODO(), filter, update)
	return err
}


func (ur *UserRepository) GetStudentById(id string) (domain.StudentProfile, error){
	var student domain.StudentProfile
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.StudentProfile{}, err
	}
	filter := bson.M{"_id": objID}
	err = ur.studentProfileCollection.FindOne(context.TODO(), filter).Decode(&student)
	if err != nil {
		return domain.StudentProfile{}, err
	}
	return student, nil
}

func (ur *UserRepository) UpdateEducatorProfile(user_id string, educator domain.EducatorProfile) domain.EducatorProfile{
	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	defer cancel()
	filter := bson.M{"_id": user_id}
	_, err := ur.educatorProfileCollection.UpdateOne(context, filter, bson.M{"$set": educator})
	if err != nil {
		return domain.EducatorProfile{}
	}
	return educator
}

func (ur *UserRepository)  UpdateStudentProfile(user_id string, student domain.StudentProfile) domain.StudentProfile{
	context, cancel := context.WithTimeout(context.Background(), time.Duration(ur.config.ContextTimeout) * time.Second)
	defer cancel()
	filter := bson.M{"_id": user_id}
	_, err := ur.studentProfileCollection.UpdateOne(context, filter, bson.M{"$set": student})
	if err != nil {
		return domain.StudentProfile{}
	}
	return student
}

func (ur *UserRepository) SetAvailability(userID, availability string) error {
	filter := bson.M{"user_id": userID}
    update := bson.M{
        "$push": bson.M{
            "availability": availability,
        },
    }

    _, err := ur.educatorProfileCollection.UpdateOne(context.TODO(), filter, update)
    if err != nil {
        return errors.New("unable to set availability")
    }

    return nil
}

func (ur *UserRepository) FindEducatorSchedules(educatorId string) (interface{}, error) {
    user_id, err := primitive.ObjectIDFromHex(educatorId)
    if err != nil {
        return nil, err
    }
    var educator struct {
        Schedules []domain.Schedule `bson:"schedules"`
    }
    err = ur.educatorProfileCollection.FindOne(context.TODO(), bson.M{"_id": user_id}).Decode(&educator)
    if err != nil {
        return nil, err
    }

	type ScheduleWithStudent struct {
		ID             primitive.ObjectID `json:"id" bson:"_id"`
		Date           string             `json:"date"`
		GoogleMeetLink string             `json:"googleMeetLink"`
		StudentName    string             `json:"studentName"`
	}
    var schedulesWithStudent []ScheduleWithStudent

    for _, schedule := range educator.Schedules {
        var student struct {
            Name  string `bson:"name"`
        }

        err = ur.studentProfileCollection.FindOne(context.TODO(), bson.M{"_id": schedule.StudentID}).Decode(&student)
        if err != nil {
            return nil, err
        }

        scheduleWithStudent := ScheduleWithStudent{
            ID:             schedule.ID,
            Date:           schedule.Date.Format("2006-01-02 15:04"),
            GoogleMeetLink: schedule.GoogleMeetLink,
            StudentName:    student.Name,
        }
        schedulesWithStudent = append(schedulesWithStudent, scheduleWithStudent)
    }
    return schedulesWithStudent, nil
}

func (ur *UserRepository) DeleteSchedule(scheduleId string, userId string) error {
    scheduleObjID, _ := primitive.ObjectIDFromHex(scheduleId)
    userObjID, _ := primitive.ObjectIDFromHex(userId)

    educatorFilter := bson.M{
        "_id":           userObjID,
        "schedules._id": scheduleObjID,
    }
    update := bson.M{
        "$pull": bson.M{
            "schedules": bson.M{"_id": scheduleObjID},
        },
    }

    _, err := ur.educatorProfileCollection.UpdateOne(context.TODO(), educatorFilter, update)
    if err != nil {
        return err
    }

    studentFilter := bson.M{
        "_id":           userObjID,
        "schedules._id": scheduleObjID,
    }

    _, err = ur.studentProfileCollection.UpdateOne(context.TODO(), studentFilter, update)
    if err != nil {
        return err
    }

    return nil
}

func (ur *UserRepository) GetStudentsFromEducatorProfile(educatorID string) ([]domain.CourseWithStudents, error) {
    educatorObjID, err := primitive.ObjectIDFromHex(educatorID)
    if err != nil {
        return nil, err
    }

    var educatorProfile domain.EducatorProfile
    err = ur.educatorProfileCollection.FindOne(context.TODO(), bson.M{"_id": educatorObjID}).Decode(&educatorProfile)
    if err != nil {
        return nil, err
    }

    var result []domain.CourseWithStudents

    for _, studentEntry := range educatorProfile.Students {
        var student domain.StudentProfile
        studentObjID := studentEntry.Student_id

        err := ur.studentProfileCollection.FindOne(context.TODO(), bson.M{"_id": studentObjID}).Decode(&student)
        if err != nil {
            continue
        }

        var course domain.Course
        courseObjID := studentEntry.Course_id

        err = ur.courseCollection.FindOne(context.TODO(), bson.M{"_id": courseObjID}).Decode(&course)
        if err != nil {
            continue
        }

        found := false
        for i, courseWithStudents := range result {
            if courseWithStudents.CourseName == course.Name {
                result[i].Students = append(result[i].Students, student)
                found = true
                break
            }
        }

        if !found {
            result = append(result, domain.CourseWithStudents{
                CourseName: course.Name,
                Students:   []domain.StudentProfile{student},
            })
        }
    }

    return result, nil
}
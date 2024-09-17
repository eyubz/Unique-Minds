package Controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	domain "unique-minds/Domain"

	"github.com/gin-gonic/gin"
)

type CourseController struct {
    courseUsecase domain.CourseUseCaseInterface
}

func NewCourseController(u domain.CourseUseCaseInterface) *CourseController {
    return &CourseController{courseUsecase: u}
}

func (c *CourseController) UploadFile(ctx *gin.Context) {
    file, err := ctx.FormFile("file")
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
        fmt.Println(err.Error())
        return
    }

    filename := filepath.Base(file.Filename)
    savePath := fmt.Sprintf("./uploads/%s", filename)

    if err := ctx.SaveUploadedFile(file, savePath); err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save file"})
        fmt.Println(err)
        return
    }

    fileURL := fmt.Sprintf("http://localhost:8080/uploads/%s", filename)

    ctx.JSON(http.StatusOK, gin.H{"fileUrl": fileURL})
}

func (c *CourseController) UploadCourse(ctx *gin.Context) {
    var course domain.Course
    user_id := ctx.GetString("user_id")
    if user_id == ""{
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }

    if err := ctx.ShouldBindJSON(&course); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
        return
    }

    if err := c.courseUsecase.UploadCourse(&course, user_id); err != nil {
        ctx.JSON(http.StatusInternalServerError,
            domain.ErrorResponse{
                Message: "Error uploading course",
                Data:    err.Error(),
                Status:  http.StatusInternalServerError,
            })
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "Course uploaded successfully"})
}

func (c *CourseController) GetFeaturedCourses(ctx *gin.Context) {
    courses, err := c.courseUsecase.GetRecentCourses()
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, courses)
}

func (c *CourseController) GetCourses(ctx *gin.Context) {
	pageNo := ctx.Query("page")
	pageSize := ctx.Query("limit")
    search := ctx.Query("search")
    tag := ctx.Query("tag")

	if pageNo == "" {
		pageNo = "1"
	}
	if pageSize == "" {
		pageSize = "10"
	}

	courses, pagination, err := c.courseUsecase.GetCourses(pageNo, pageSize, search, tag)
	if err != nil {
		ctx.JSON(500, domain.ErrorResponse{
			Message: err.Error(),
			Status: 500,

		})
		ctx.Abort()
	} else {
		ctx.JSON(http.StatusOK, domain.SuccessResponse{
			Status: http.StatusOK,
			Data: map[string]interface{}{
				"course" : courses, 
				"pagination" : pagination,
			},
			Message: "courses fetched successfully.",
		})
	}
}

func (c *CourseController) GetMyCourse(ctx *gin.Context) {
    user_id := ctx.GetString("user_id")
    if user_id == ""{
        ctx.JSON(400, gin.H{
            "Error" : "Unauthorized",
        })
    }
    course, err := c.courseUsecase.GetMyCourses(user_id)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, course)
}

func (uc *CourseController) GetEducatorCourses(c *gin.Context) {
    user_id := c.GetString("user_id")
    if user_id == "" {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }
    courses, err := uc.courseUsecase.GetEducatorCourses(user_id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch courses"})
        return
    }
    c.JSON(http.StatusOK, courses)
}

func (uc *CourseController) DeleteCourse(c *gin.Context) {
    courseID := c.Param("id")
	user_id := c.GetString("user_id")
    if user_id == "" {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }
    err := uc.courseUsecase.DeleteCourse(courseID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Course deleted successfully"})
}

func (c *CourseController) GetCourseById(ctx *gin.Context) {
    id := ctx.Param("id")
    user_id := ctx.GetString("user_id")
    if user_id == ""{
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }

    course, err := c.courseUsecase.GetCourseByID(id, user_id)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, course)
}

func (c *CourseController) UpdateProgress(ctx *gin.Context) {
    var progressRequest []string
    if err := ctx.ShouldBindJSON(&progressRequest); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    courseID := ctx.Param("id")
    userID := ctx.GetString("user_id")

    progress, err := c.courseUsecase.UpdateProgress(courseID, userID, progressRequest)
      
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, progress)
}

func (c *CourseController) SaveCourse(ctx *gin.Context) {
	studentID := ctx.GetString("user_id")
	courseID := ctx.Param("id")

    if studentID == ""{
        ctx.JSON(500, domain.ErrorResponse{
            Message: "Unauthorized",
            Status: 500,
        })
    }
	err := c.courseUsecase.SaveCourse(studentID, courseID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Course ID appended successfully"})
}

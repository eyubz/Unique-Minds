package Controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"time"
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

    if err := ctx.ShouldBindJSON(&course); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
        fmt.Println(err.Error())
        return
    }

    course.CreatedDate = time.Now().UTC()
    course.LastUpdated = time.Now().UTC()

    if err := c.courseUsecase.UploadCourse(&course); err != nil {
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

	blogs, pagination, err := c.courseUsecase.GetCourses(pageNo, pageSize, search, tag)
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
				"course" : blogs, 
				"pagination" : pagination,
			},
			Message: "courses fetched successfully.",
		})
	}
}

func (c *CourseController) GetCourseById(ctx *gin.Context) {
    id := ctx.Param("id")
    course, err := c.courseUsecase.GetCourseById(id)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, course)
}
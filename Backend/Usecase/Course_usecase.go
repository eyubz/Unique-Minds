package usecases

import (
	"errors"
	"strconv"
	domain "unique-minds/Domain"
)

type courseUseCase struct {
    courseRepo domain.CourseRepository
}

func NewCourseUseCase(cr domain.CourseRepository) *courseUseCase  {
    return &courseUseCase {
        courseRepo: cr,
    }
}

func (u *courseUseCase) UploadCourse(course *domain.Course) error {
    // Add any business logic here
    return u.courseRepo.Save(course)
}

func (u *courseUseCase) GetRecentCourses() ([]domain.Course, error) {
    result, err := u.courseRepo.FetchRecentCourses()
    if err != nil{
        return nil, err
    }
    return result, nil
}


func (u *courseUseCase) GetCourses(pageNo string, pageSize string, search string, filter string) ([]domain.Course, domain.Pagination, error) {
	PageNo, err := strconv.ParseInt(pageNo, 10, 64)
	if err != nil {
		return []domain.Course{}, domain.Pagination{}, err
	}
	PageSize, err := strconv.ParseInt(pageSize, 10, 64)
	if err != nil {
		return []domain.Course{}, domain.Pagination{}, err
	}
	if PageNo <= 0 || PageSize <= 0 {
		return []domain.Course{}, domain.Pagination{}, errors.New("invalid page number or page size")
	}

	blogs, pagination, err := u.courseRepo.GetCourses(PageNo, PageSize, search, filter)
	if err != nil {
		return nil, domain.Pagination{}, err
	} else {
		return blogs, pagination, nil
	}
}

func (u *courseUseCase) GetCourseById(id string) (domain.Course, error) {
	result, err := u.courseRepo.GerCourseById(id)
	if err != nil {
		return domain.Course{}, err
	}
	return result, nil
}
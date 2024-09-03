package usecases

import (
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

func (u *courseUseCase ) UploadCourse(course *domain.Course) error {
    // Add any business logic here
    return u.courseRepo.Save(course)
}

// func (u *courseUseCase ) GetCourseByID(id uint) (*domain.Course, error) {
//     return u.courseRepo.FindByID(id)
// }

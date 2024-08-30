import React, { useEffect, useState } from "react";
import CourseCard from "../Components/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to AI" },
    { id: 2, title: "Web Development Bootcamp" },
    { id: 3, title: "Data Science Fundamentals" },
    { id: 1, title: "Introduction to AI" },
    { id: 2, title: "Web Development Bootcamp" },
    { id: 3, title: "Data Science Fundamentals" },
    { id: 1, title: "Introduction to AI" },
    { id: 2, title: "Web Development Bootcamp" },
    { id: 3, title: "Data Science Fundamentals" },
  ]);

  // useEffect(() => {
  //   fetch("/api/courses")
  //     .then((res) => res.json())
  //     .then((data) => setCourses(data));
  // }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;

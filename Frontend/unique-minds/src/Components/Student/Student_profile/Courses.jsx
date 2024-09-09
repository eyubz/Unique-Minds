import React from "react";
import CourseCard from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "Introduction to AI",
    description: "Learn the basics of artificial intelligence.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    description: "A comprehensive guide to modern web development.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Understand the core concepts of data science.",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Courses = () => {
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;

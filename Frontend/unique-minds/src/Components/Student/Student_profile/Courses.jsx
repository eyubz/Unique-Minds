import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState();
  //   [
  //   {
  //     id: 1,
  //     title: "Introduction to AI",
  //     description: "Learn the basics of artificial intelligence.",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 2,
  //     title: "Web Development Bootcamp",
  //     description: "A comprehensive guide to modern web development.",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 3,
  //     title: "Data Science Fundamentals",
  //     description: "Understand the core concepts of data science.",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  // ]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        console.log(data);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-customBlue">Your Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses !== undefined &&
          courses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.name}
              description={course.description}
              imageUrl={course.image}
              courseId={course._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Courses;

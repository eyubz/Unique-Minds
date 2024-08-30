import React from "react";
import img2 from "../Assets/image0_0.jpg";
import { useState, useEffect } from "react";

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error fetching courses: {error.message}</p>;

  return (
    <div className="p-8 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">Featured Courses</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden w-80 transition-transform transform hover:scale-105"
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-700">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination will be added later */}
    </div>
  );
};

export default CoursesSection;

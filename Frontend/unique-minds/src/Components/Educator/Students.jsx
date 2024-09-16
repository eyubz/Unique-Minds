import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const sampleCoursesWithStudents = [];

const Students = () => {
  const [coursesWithStudents, setCoursesWithStudents] = useState(
    sampleCoursesWithStudents
  );

  useEffect(() => {
    const fetchCoursesWithStudents = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "http://localhost:8080/api/educator/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses and students");
        }
        const data = await response.json();
        setCoursesWithStudents(data);
      } catch (error) {
        console.error("Error fetching courses and students:", error);
      }
    };

    fetchCoursesWithStudents();
  }, []);

  return (
    <div className="bg-customBlue p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-white">Students Overview</h2>
      <div className="space-y-8">
        {coursesWithStudents != null && coursesWithStudents.length > 0 ? (
          coursesWithStudents.map((course) => (
            <div
              key={course.courseName}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-customBlue mb-4">
                {course.courseName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {course.students.length > 0 ? (
                  course.students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center space-y-4 transition-transform transform hover:scale-105"
                    >
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <FaUser className="text-customBlue text-3xl" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {student.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {student.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No students for this course.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Students;

import React, { useState, useEffect } from "react";

const sampleCoursesWithStudents = [
  {
    courseName: "Mathematics",
    students: [
      {
        id: "1",
        name: "John Doe",
        description: "Down Syndrome",
      },
      {
        id: "2",
        name: "Jane Smith",
        description: "Down Syndrome",
      },
    ],
  },
  {
    courseName: "History",
    students: [
      {
        id: "3",
        name: "Alice Johnson",
        description: "Down Syndrome",
      },
      {
        id: "4",
        name: "Bob Lee",
        description: "Down Syndrome",
      },
    ],
  },
];

const Students = () => {
  const [coursesWithStudents, setCoursesWithStudents] = useState(
    sampleCoursesWithStudents
  );

  useEffect(() => {
    const fetchCoursesWithStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/educator/students"
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
    <div className="bg-light-gray p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Students</h2>

      <div className="space-y-6">
        {coursesWithStudents.length > 0 ? (
          coursesWithStudents.map((course) => (
            <div key={course.courseName} className="mb-8">
              <h3 className="text-xl font-semibold text-customBlue mb-4">
                {course.courseName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {course.students.length > 0 ? (
                  course.students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-customBlue p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    >
                      <h4 className="text-lg font-semibold text-white">
                        {student.name}
                      </h4>
                      <p className="text-lg text-white">
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
          <p className="text-black">No courses or students found.</p>
        )}
      </div>
    </div>
  );
};

export default Students;

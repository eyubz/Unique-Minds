import React, { useState, useEffect } from "react";
import img from "../../Assets/herosecrtion.jpg";

const Courses = () => {
  const [courses, setCourses] = useState([
    // {
    //   id: "1",
    //   name: "Introduction to Special Education",
    //   description:
    //     "Basics of special education including strategies and methodologies.",
    //   createdDate: "2023-01-15",
    //   imageUrl: img,
    // },
    // {
    //   id: "2",
    //   name: "Advanced Down Syndrome Education",
    //   description:
    //     "In-depth look at educational practices specific to Down Syndrome.",
    //   createdDate: "2023-03-22",
    //   imageUrl: img,
    // },
    // {
    //   id: "1",
    //   name: "Introduction to Special Education",
    //   description:
    //     "Basics of special education including strategies and methodologies.",
    //   createdDate: "2023-01-15",
    //   imageUrl: img,
    // },
    // {
    //   id: "2",
    //   name: "Advanced Down Syndrome Education",
    //   description:
    //     "In-depth look at educational practices specific to Down Syndrome.",
    //   createdDate: "2023-03-22",
    //   imageUrl: img,
    // },
  ]);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "http://localhost:8080/api/educator/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEditChange = (id, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const handleSaveClick = () => {
    setEditingCourseId(null);
  };

  const handleCancelClick = () => {
    setEditingCourseId(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8080/api/educator/courses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete course");
      }
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-light-gray p-6 rounded shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-customBlue p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            {editingCourseId === course.id ? (
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={(e) =>
                    handleEditChange(course.id, "name", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded"
                />
                <textarea
                  name="description"
                  value={course.description}
                  onChange={(e) =>
                    handleEditChange(course.id, "description", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded h-24"
                />
                <input
                  type="date"
                  name="createdDate"
                  value={course.createdDate}
                  onChange={(e) =>
                    handleEditChange(course.id, "createdDate", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleSaveClick}
                    className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={course.imageUrl || img}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-semibold text-white">
                  {course.name}
                </h3>
                <p className="text-white mb-2">{course.description}</p>
                <p className="text-white mb-4">
                  Created on:{" "}
                  {new Date(course.createdDate).toLocaleDateString()}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleDeleteClick(course.id)}
                    className="py-2 px-4 bg-white text-customBlue rounded hover:bg-gray-100 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

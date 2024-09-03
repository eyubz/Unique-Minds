import React, { useState } from "react";

// Sample course data
const sampleCourses = [
  {
    id: "1",
    name: "Introduction to Special Education",
    description:
      "Basics of special education including strategies and methodologies.",
    createdDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Advanced Down Syndrome Education",
    description:
      "In-depth look at educational practices specific to Down Syndrome.",
    createdDate: "2023-03-22",
  },
  // Add more sample courses as needed
];

const Courses = () => {
  const [courses, setCourses] = useState(sampleCourses);
  const [editingCourseId, setEditingCourseId] = useState(null);
  // Helper function to handle course field changes
  const handleEditChange = (id, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    createdDate: "",
  });

  const handleEditClick = (id) => {
    setEditingCourseId(id);
  };

  const handleSaveClick = () => {
    // Handle save logic here (e.g., update state or make API call)
    setEditingCourseId(null);
  };

  const handleCancelClick = () => {
    setEditingCourseId(null);
  };

  const handleDeleteClick = (id) => {
    // Handle delete logic here (e.g., remove from state or make API call)
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleAddCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourseClick = () => {
    // Handle add course logic here (e.g., add to state or make API call)
    setCourses([...courses, { id: `${courses.length + 1}`, ...newCourse }]);
    setNewCourse({ name: "", description: "", createdDate: "" });
  };

  return (
    <div className="bg-light-gray p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Courses</h2>

      {/* Add New Course */}
      <div className="mb-6 p-4 bg-white rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Add New Course
        </h3>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            value={newCourse.name}
            onChange={handleAddCourseChange}
            placeholder="Course Name"
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={newCourse.description}
            onChange={handleAddCourseChange}
            placeholder="Course Description"
            className="p-2 border border-gray-300 rounded h-24"
          />
          <input
            type="date"
            name="createdDate"
            value={newCourse.createdDate}
            onChange={handleAddCourseChange}
            placeholder="Created Date"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddCourseClick}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* List of Courses */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded shadow-md">
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
                <h3 className="text-xl font-semibold text-black">
                  {course.name}
                </h3>
                <p className="text-gray-800">{course.description}</p>
                <p className="text-gray-600">
                  Created on:{" "}
                  {new Date(course.createdDate).toLocaleDateString()}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEditClick(course.id)}
                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course.id)}
                    className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
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

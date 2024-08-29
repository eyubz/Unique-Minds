import React from "react";

const courses = [
  { id: 1, title: "Introduction to AI" },
  { id: 2, title: "Web Development Bootcamp" },
  { id: 3, title: "Data Science Fundamentals" },
];

function Courses() {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      {courses.map((course) => (
        <div key={course.id} className="p-4 mb-4 bg-gray-200 rounded shadow-sm">
          <h3 className="text-lg">{course.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Courses;

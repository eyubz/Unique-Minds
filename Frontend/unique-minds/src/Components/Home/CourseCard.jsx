import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 max-w-sm mx-auto">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 bg-customBlue">
        <h3 className="text-2xl font-bold mb-2 text-white">{course.title}</h3>
        <p className="text-white mb-4">{course.description}</p>
        <Link
          to={`/courses/${course.id}`}
          className="inline-block bg-white text-customBlue py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

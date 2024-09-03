import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-semibold">{course.title}</h3>
      <p className="mt-2">{course.description}</p>
      <Link
        to={`/courses/${course.id}`}
        className="text-blue-500 mt-4 inline-block"
      >
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;

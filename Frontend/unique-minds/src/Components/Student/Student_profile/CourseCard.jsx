import React from "react";

const CourseCard = ({ title }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-bold">{title}</h3>
      <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md">
        View
      </button>
    </div>
  );
};

export default CourseCard;

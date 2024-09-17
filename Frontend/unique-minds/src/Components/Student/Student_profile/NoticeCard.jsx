import React from "react";

const NoticeCard = ({ title }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <button className="mt-4 text-blue-500">See more</button>
    </div>
  );
};

export default NoticeCard;

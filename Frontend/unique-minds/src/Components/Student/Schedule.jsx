import React from "react";

const schedule = [
  { date: "2024-09-01", task: "Complete AI Assignment" },
  { date: "2024-09-05", task: "Attend Web Development Workshop" },
  { date: "2024-09-10", task: "Submit Data Science Project" },
];

function Schedule() {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Schedule</h2>
      <ul>
        {schedule.map((item, index) => (
          <li key={index} className="mb-3 p-3 bg-gray-200 rounded shadow-sm">
            <span className="block font-semibold">{item.task}</span>
            <span className="text-sm text-gray-600">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;

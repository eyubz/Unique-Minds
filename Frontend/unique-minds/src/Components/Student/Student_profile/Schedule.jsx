import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parseISO,
} from "date-fns";

const schedule = [
  { date: "2024-09-01", task: "Complete AI Assignment", educator: "Dr. Smith" },
  {
    date: "2024-09-05",
    task: "Attend Web Development Workshop",
    educator: "Prof. Johnson",
  },
  {
    date: "2024-09-10",
    task: "Submit Data Science Project",
    educator: "Dr. Adams",
  },
];

function Schedule() {
  const currentMonth = new Date(2024, 8); // September 2024

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Your Schedule for September 2024
      </h2>
      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {daysInMonth.map((day, index) => {
          const scheduledTasks = schedule.filter((item) =>
            isSameDay(parseISO(item.date), day)
          );
          return (
            <div
              key={index}
              className={`p-2 h-24 border rounded-lg ${
                scheduledTasks.length > 0 ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="text-sm font-bold">{format(day, "d")}</div>
              {scheduledTasks.map((task, idx) => (
                <div key={idx} className="text-xs mt-2 text-green-700">
                  {task.task} with {task.educator}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Schedule;

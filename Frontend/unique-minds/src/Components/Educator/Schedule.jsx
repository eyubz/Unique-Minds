import React, { useState, useEffect } from "react";

const sampleSchedules = [
  {
    id: "1",
    date: "2024-01-15T10:00:00",
    studentName: "John Doe",
    googleMeetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    date: "2024-02-20T14:00:00",
    studentName: "Jane Smith",
    googleMeetLink: "https://meet.google.com/xyz-uvwz-klm",
  },
  {
    id: "2",
    date: "2024-02-20T14:00:00",
    studentName: "Jane Smith",
    googleMeetLink: "https://meet.google.com/xyz-uvwz-klm",
  },
];

const Schedule = () => {
  const [schedules, setSchedules] = useState(sampleSchedules);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/educator/schedules"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schedules");
        }
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  const handleCancelSchedule = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/educator/schedules/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel schedule");
      }
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    } catch (error) {
      console.error("Error canceling schedule:", error);
    }
  };

  return (
    <div className="bg-light-gray p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Schedule</h2>

      <div className="space-y-4">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-customBlue p-4 rounded-lg shadow-lg flex justify-between items-center hover:shadow-xl transition duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {schedule.studentName}
                </h3>
                <p className="text-white">
                  {new Date(schedule.date).toLocaleString()}
                </p>
                <a
                  href={schedule.googleMeetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 hover:underline mt-2 block"
                >
                  Join via Google Meet
                </a>
              </div>

              <button
                onClick={() => handleCancelSchedule(schedule.id)}
                className="py-2 px-4 bg-white text-customBlue rounded hover:bg-gray-200 transition duration-300"
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="text-black">No schedules available.</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;

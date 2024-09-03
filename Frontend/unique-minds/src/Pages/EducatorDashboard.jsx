import React, { useState } from "react";
import Profile from "../Components/Educator/Profile";
import Courses from "../Components/Educator/Courses";
import UploadCourse from "../Components/Educator/UploadCourses";
import Schedule from "../Components/Educator/Schedule";
import Students from "../Components/Educator/Students";

const EducatorDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="min-h-screen flex flex-col bg-light-gray">
      {/* Navigation */}
      <div className="bg-blue-600 text-white p-4 flex justify-around">
        <button
          className={`py-2 px-4 rounded ${
            activeSection === "profile"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("profile")}
        >
          Profile
        </button>
        <button
          className={`py-2 px-4 rounded ${
            activeSection === "courses"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("courses")}
        >
          Courses
        </button>
        <button
          className={`py-2 px-4 rounded ${
            activeSection === "upload"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("upload")}
        >
          Upload Course
        </button>
        <button
          className={`py-2 px-4 rounded ${
            activeSection === "schedule"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("schedule")}
        >
          Schedule
        </button>
        <button
          className={`py-2 px-4 rounded ${
            activeSection === "students"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("students")}
        >
          Students
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-white text-black">
        {activeSection === "profile" && <Profile />}
        {activeSection === "courses" && <Courses />}
        {activeSection === "upload" && <UploadCourse />}
        {activeSection === "schedule" && <Schedule />}
        {activeSection === "students" && <Students />}
      </div>
    </div>
  );
};

export default EducatorDashboard;

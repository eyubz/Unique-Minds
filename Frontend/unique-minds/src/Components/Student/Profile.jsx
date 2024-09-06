import React, { useState } from "react";

import Profile from "./StudentProfile";

import Courses from "..//Educator/Courses";
import UploadCourse from "../Educator/UploadCourses";
import Schedule from "../Educator/Schedule";
import Students from "../Educator/Students";

const EducatorDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="min-h-screen flex flex-col bg-light-gray">
      {/* Navigation */}
      <div className="bg-customBlue text-white p-4 flex justify-around">
        <button
          className={`py-2 px-4 rounded text-customBlue ${
            activeSection === "profile"
              ? "bg-blue-700"
              : "bg-white hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("profile")}
        >
          Profile
        </button>
        <button
          className={`py-2 px-4 rounded text-customBlue ${
            activeSection === "courses"
              ? "bg-blue-700"
              : "bg-white hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("courses")}
        >
          Courses
        </button>
        <button
          className={`py-2 px-4 rounded text-customBlue ${
            activeSection === "upload"
              ? "bg-blue-700"
              : "bg-white hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("upload")}
        >
          Upload Course
        </button>
        <button
          className={`py-2 px-4 rounded text-customBlue ${
            activeSection === "schedule"
              ? "bg-blue-700"
              : "bg-white hover:bg-blue-700"
          } transition duration-300`}
          onClick={() => setActiveSection("schedule")}
        >
          Schedule
        </button>
        <button
          className={`py-2 px-4 rounded text-customBlue ${
            activeSection === "students"
              ? "bg-blue-700"
              : "bg-white hover:bg-blue-700"
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

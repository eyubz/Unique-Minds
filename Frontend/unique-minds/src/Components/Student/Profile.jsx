import React from "react";
import ProfileDetail from "./Student_profile/ProfileDetail";

const StudentDashboard = () => {
  return (
    <main className="p-6 bg-gray-100 flex-1">
      <div className="bg-customBlue p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-white">Welcome back, John!</h1>
        <p className="mt-2 text-white">
          Always stay updated in your student portal
        </p>
      </div>
      <ProfileDetail />
    </main>
  );
};

export default StudentDashboard;

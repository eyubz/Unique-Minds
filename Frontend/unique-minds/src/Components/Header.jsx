import React from "react";
import { Link } from "react-router-dom";
import img1 from "../Assets/image1_0.jpg";

const Header = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500 text-white">
      <div className="flex-1 flex justify-center">
        <img
          src={img1}
          alt="E-Learning"
          className="w-3/4 max-w-md rounded-lg shadow-lg"
        />
      </div>

      <div className="flex-1 text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Unique Minds.</h1>
        <p className="text-lg mb-8">Your gateway to quality education.</p>
        <Link
          to="/courses"
          className="bg-white text-blue-500 px-6 py-3 rounded-lg"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );
};

export default Header;

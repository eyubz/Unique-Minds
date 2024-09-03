import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-500 text-lg font-bold">
          UniqueMinds
        </Link>
        <div className="flex items-center">
          <Link to="/courses" className="text-blue-500 mr-4">
            Courses
          </Link>
          <Link to="/about" className="text-blue-500 mr-4">
            About Us
          </Link>
          <Link to="/contact" className="text-blue-500 mr-4">
            Contact
          </Link>
          <Link to="/login" className="text-blue-500 mr-4">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Signup
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-blue-500 focus:outline-none"
            >
              Profile
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                {/* <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-blue-500 hover:bg-blue-100"
                > */}
                <Link
                  to="/educator_dashboard"
                  className="block px-4 py-2 text-blue-500 hover:bg-blue-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-blue-500 hover:bg-blue-100"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  const [accountType, setAccountType] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountType = (type) => {
    setAccountType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      user_type: accountType,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        // Redirect to verification page
        navigate("/verification");
      } else {
        const errorData = await response.json();
        alert(`SignUp failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Signup
          </h2>
          <p className="mt-2 text-center text-gray-600">Create Your Account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center border-b border-blue-500 py-2">
              <FaUser className="text-blue-500 mr-3" />
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full py-2 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="flex items-center border-b border-blue-500 py-2">
              <FaEnvelope className="text-blue-500 mr-3" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="flex items-center border-b border-blue-500 py-2">
              <FaLock className="text-blue-500 mr-3" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="flex items-center border-b border-blue-500 py-2">
              <FaLock className="text-blue-500 mr-3" />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-2 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className={`px-4 py-2 font-semibold text-sm border rounded-md ${
                accountType === "educator"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500 border-blue-500"
              }`}
              onClick={() => handleAccountType("educator")}
            >
              Educator
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-semibold text-sm border rounded-md ${
                accountType === "student"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500 border-blue-500"
              }`}
              onClick={() => handleAccountType("student")}
            >
              Student
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Signup
            </button>
          </div>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

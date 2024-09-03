import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `accessToken=${data.accessToken}; path=/;`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/;`;
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Login
          </h2>
          <p className="mt-2 text-center text-gray-600">Welcome Back!</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center border-b border-blue-500 py-2">
              <FaEnvelope className="text-blue-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="flex items-center border-b border-blue-500 py-2">
              <FaLock className="text-blue-500 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>

          <div className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Signup
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Courses from "./Pages/Course";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
//import Dashboard from "./Pages/Dashboard";
import Footer from "./Components/Footer";
import EducatorDashboard from "./Pages/EducatorDashboard";
// import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOTP from "./Components/VerifyAccount";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/educator_dashboard" element={<EducatorDashboard />} />
        <Route path="/forgot-password" element={<VerifyOTP />} />
        <Route path="/verification" element={<VerifyOTP />} />

        {/* to="/courses" */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

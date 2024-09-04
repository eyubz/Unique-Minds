import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../Assets/img3.jpg";

const Header = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-customBlue text-white">
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={img1}
          alt="E-Learning"
          className="w-3/4 max-w-md rounded-lg shadow-lg"
        />
      </motion.div>

      <motion.div
        className="flex-1 text-center p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to Unique Minds.</h1>
        <p className="text-lg mb-8">Serving the uniques.</p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            to="/courses"
            className="bg-white text-blue-500 px-6 py-3 rounded-lg"
          >
            Browse Courses
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;

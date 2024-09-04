import React from "react";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaBookOpen,
  FaPlayCircle,
  FaCertificate,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create an account to get started with our platform.",
    icon: <FaUserPlus className="h-12 w-12 text-blue-500" />,
  },
  {
    id: 2,
    title: "Choose a Course",
    description:
      "Browse and select from a variety of courses that suit your needs.",
    icon: <FaBookOpen className="h-12 w-12 text-blue-500" />,
  },
  {
    id: 3,
    title: "Start Learning",
    description: "Access course materials and start your learning journey.",
    icon: <FaPlayCircle className="h-12 w-12 text-blue-500" />,
  },
  {
    id: 4,
    title: "Earn Certificates",
    description:
      "Complete courses and earn certificates to showcase your achievements.",
    icon: <FaCertificate className="h-12 w-12 text-blue-500" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.5, delay: step.id * 0.2 }}
            >
              <div className="flex-shrink-0 mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

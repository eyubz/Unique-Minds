import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline"; // Updated path for v2

const benefits = [
  {
    id: 1,
    title: "Personalized Learning",
    description:
      "Tailored lessons to fit each student's unique learning style and pace.",
    icon: <CheckCircleIcon className="h-12 w-12 text-white" />,
  },
  {
    id: 2,
    title: "Expert Instructors",
    description:
      "Learn from qualified professionals with extensive experience in their fields.",
    icon: <UserGroupIcon className="h-12 w-12 text-white" />,
  },
  {
    id: 3,
    title: "Flexible Schedules",
    description:
      "Access courses anytime and anywhere to fit your busy schedule.",
    icon: <ClockIcon className="h-12 w-12 text-white" />,
  },
  {
    id: 4,
    title: "Quality Content",
    description:
      "High-quality, engaging content that makes learning enjoyable and effective.",
    icon: <StarIcon className="h-12 w-12 text-white" />,
  },
];

const BenefitsSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Benefits of Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              className=" bg-customBlue rounded-lg p-6 shadow-lg flex items-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: benefit.id * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex-shrink-0 mr-4">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;

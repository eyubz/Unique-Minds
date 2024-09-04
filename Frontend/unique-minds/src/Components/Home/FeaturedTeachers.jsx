import React from "react";
import { motion } from "framer-motion";
import imgEducator1 from "../../Assets/teacher1.jpg";

const educators = [
  {
    id: 1,
    name: "Jane Doe",
    image: imgEducator1,
    rank: 1,
  },
  {
    id: 2,
    name: "John Smith",
    image: imgEducator1,
    rank: 2,
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: imgEducator1,
    rank: 3,
  },
];

const TopEducators = () => {
  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md mt-10 mb-10">
      <h2 className="text-center text-3xl font-bold mb-8">
        Top Teachers of the Week
      </h2>
      <div className="flex justify-center items-end gap-8">
        {educators.map((educator) => (
          <motion.div
            key={educator.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              educator.rank === 1 ? "scale-110 z-10" : "scale-100"
            }`}
            style={{
              marginTop: educator.rank === 1 ? "-20px" : "0",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: educator.rank * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={educator.image}
              alt={educator.name}
              className="w-48 h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {educator.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopEducators;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../../Assets/image0_0.jpg";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([
    // {
    //   id: 1,
    //   name: "Introduction to Programming",
    //   description: "Learn the basics of programming with hands-on examples.",
    //   image: img,
    // },
    // {
    //   id: 2,
    //   title: "Advanced Mathematics",
    //   description:
    //     "Deep dive into advanced mathematical concepts and techniques.",
    //   image: img,
    // },
    // {
    //   id: 3,
    //   title: "Creative Writing Workshop",
    //   description:
    //     "Enhance your writing skills through creative exercises and feedback.",
    //   image: img,
    // },
  ]);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await fetch("https://localhost:8080/api/featured-courses");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }
  //       const data = await response.json();
  //       setCourses(data);
  //     } catch (err) {
  //       setError("Failed to load courses.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  // if (loading) return <p className="text-center py-16">Loading...</p>;
  // if (error) return <p className="text-center py-16 text-red-500">{error}</p>;

  // Staggered animation effect for the course grid
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const courseVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-16 bg-gray-100">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-customBlue"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Featured Courses
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              variants={courseVariants}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={course.image || img}
                alt={course.title}
                className="w-full h-40 object-cover"
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="p-6">
                <motion.h3
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {course.title}
                </motion.h3>
                <motion.p
                  className="text-gray-700 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {course.description}
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/courses/${course.id}`}
                    className="bg-customBlue text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturedCourses;

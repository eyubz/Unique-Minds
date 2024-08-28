import React from "react";
import img2 from "../Assets/image0_0.jpg";

const courses = [
  {
    id: 1,
    name: "Introduction to Technology",
    description: "A basic course on technology fundamentals.",
    image: img2,
  },
  {
    id: 2,
    name: "Exploring Science",
    description: "An exciting journey through scientific principles.",
    image: img2,
  },
  {
    id: 3,
    name: "Mathematics Basics",
    description: "A foundational course in mathematics.",
    image: img2,
  },
  {
    id: 4,
    name: "Art and Creativity",
    description: "Unleash your creativity with this art course.",
    image: img2,
  },
  {
    id: 5,
    name: "Introduction to Technology",
    description: "A basic course on technology fundamentals.",
    image: img2,
  },
  {
    id: 6,
    name: "Exploring Science",
    description: "An exciting journey through scientific principles.",
    image: img2,
  },
  {
    id: 7,
    name: "Mathematics Basics",
    description: "A foundational course in mathematics.",
    image: img2,
  },
  {
    id: 8,
    name: "Art and Creativity",
    description: "Unleash your creativity with this art course.",
    image: img2,
  },
  {
    id: 5,
    name: "Introduction to Technology",
    description: "A basic course on technology fundamentals.",
    image: img2,
  },
  {
    id: 6,
    name: "Exploring Science",
    description: "An exciting journey through scientific principles.",
    image: img2,
  },
  {
    id: 7,
    name: "Mathematics Basics",
    description: "A foundational course in mathematics.",
    image: img2,
  },
  {
    id: 8,
    name: "Art and Creativity",
    description: "Unleash your creativity with this art course.",
    image: img2,
  },
];

const CoursesSection = () => {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">Available Courses</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden w-80 transition-transform transform hover:scale-105"
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-700">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination will be added later */}
    </div>
  );
};

export default CoursesSection;

// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Make sure to install axios with `npm install axios` or `yarn add axios`

// const CoursesSection = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Replace with your backend API endpoint
//     axios.get("https://your-api-endpoint.com/courses")
//       .then((response) => {
//         setCourses(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center">Loading courses...</p>;
//   if (error) return <p className="text-center text-red-500">Error loading courses</p>;

//   return (
//     <div className="p-8 bg-gray-100">
//       <h2 className="text-center text-3xl font-bold mb-8">Available Courses</h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {courses.map((course) => (
//           <div
//             key={course.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden w-80"
//           >
//             <img
//               src={course.image || "https://via.placeholder.com/300x200?text=No+Image"} // Fallback image if not available
//               alt={course.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
//               <p className="text-gray-700">{course.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursesSection;

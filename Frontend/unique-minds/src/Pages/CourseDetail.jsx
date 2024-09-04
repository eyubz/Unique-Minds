import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    parts: [],
  });

  //   useEffect(() => {
  //     const fetchCourse = async () => {
  //       try {
  //         const response = await fetch(`https://localhost:8080/api/courses/${id}`);
  //         const data = await response.json();

  //         if (response.ok) {
  //           setCourse(data.course);
  //         } else {
  //           console.error("Failed to fetch course");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching course:", error);
  //       }
  //     };

  //     fetchCourse();
  //   }, [id]);
  // Fetch the course data later, for now it's a placeholder
  useEffect(() => {
    // Simulate fetching the data
    setCourse({
      id: "66d74926dc95cf36ee67fa5f",
      name: "Introduction to AI",
      description:
        "Learn the basics of Artificial Intelligence, including key concepts and practical applications.",
      image: "http://localhost:8080/uploads/image0_0.jpg",
      parts: [
        {
          id: "000000000000000000000000",
          name: "Eyerusalem",
          description: "Understanding AI",
          materials: [
            {
              name: "AI Introduction PDF",
              type: "PDF",
              content: "http://localhost:8080/uploads/ai-intro.pdf",
            },
          ],
        },
        {
          id: "000000000000000000000000",
          name: "Eyerusalem",
          description: "Understanding AI",
          materials: [
            {
              name: "AI Introduction PDF",
              type: "PDF",
              content: "http://localhost:8080/uploads/ai-intro.pdf",
            },
          ],
        },
      ],
    });
  }, []);

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Course Image */}
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />

        <div className="p-6">
          {/* Course Title */}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {course.name}
          </h1>

          {/* Course Description */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {course.description}
          </p>

          {/* Course Parts */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Course Parts
          </h2>
          <div className="space-y-6">
            {course.parts.map((part) => (
              <div
                key={part.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {part.name}
                </h3>
                <p className="text-gray-600 mb-4">{part.description}</p>

                {/* Materials */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Materials
                  </h4>
                  <ul className="list-disc list-inside pl-5 text-gray-700">
                    {part.materials.map((material, index) => (
                      <li key={index}>
                        <a
                          href={material.content}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {material.name} ({material.type})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

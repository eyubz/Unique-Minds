import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img1 from "../Assets/img1.jpg";

const CourseDetail = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(
    {
      id: "66d74926dc95cf36ee67fa5f",
      name: "Introduction to AI",
      description:
        "Learn the basics of Artificial Intelligence, including key concepts and practical applications.",
      image: img1, //"http://localhost:8080/uploads/image0_0.jpg",
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
    }
    // id: "",
    // name: "",
    // description: "",
    // image: img1,
    // parts: [],
  );

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://localhost:8080/api/courses/${course_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Course saved successfully:", result);
      } else {
        console.error("Failed to save the course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `https://localhost:8080/api/courses/${course_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setCourse(data.course);
        } else {
          console.error("Failed to fetch course");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [course_id]);

  return (
    <div className="container mx-auto my-12 px-4 mb-20 w-3/4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={`http://localhost:8080/uploads/${course.image}`}
          alt={course.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />

        <div className="p-6">
          <h1 className="text-4xl font-extrabold text-customBlue mb-4">
            {course.name}
          </h1>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {course.description}
          </p>

          <h2 className="text-2xl font-semibold text-customBlue mb-4 border-b-2 border-gray-200 pb-2">
            Course Parts
          </h2>
          <div className="space-y-6">
            {course.parts.map((part) => (
              <div
                key={part.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-white hover:text-white"
              >
                <h3 className="text-xl font-semibold text-customBlue mb-2">
                  {part.name}
                </h3>
                <p className="text-gray-600 mb-4">{part.description}</p>

                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-customBlue mb-2">
                    Materials
                  </h4>
                  <ul className="list-disc list-inside pl-5 text-customBlue">
                    {part.materials.map((material, index) => (
                      <li key={index}>
                        <a
                          href={material.content}
                          className="text-customBlue hover:underline"
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
          <div className="flex justify-end mt-8">
            <button
              className="bg-customBlue text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-400 transition duration-300"
              onClick={handleSave}
            >
              Save Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

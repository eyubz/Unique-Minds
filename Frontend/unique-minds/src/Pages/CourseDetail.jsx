import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img1 from "../Assets/herosecrtion.jpg";

const CourseDetail = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] =
    useState();
    //   {
    //   id: "course_12345",
    //   name: "Introduction to Web Development",
    //   description:
    //     "This course will teach you the basics of web development, including HTML, CSS, and JavaScript.",
    //   image: "https://example.com/course-image.jpg",
    //   parts: [
    //     {
    //       id: "part_1",
    //       name: "Getting Started with HTML",
    //       description:
    //         "Learn the basics of HTML and how to structure your web pages.",
    //       materials: [
    //         {
    //           name: "HTML Cheat Sheet",
    //           type: "PDF",
    //           content: "https://example.com/materials/html-cheat-sheet.pdf",
    //         },
    //         {
    //           name: "HTML Tutorial Video",
    //           type: "Video",
    //           content: "https://example.com/materials/html-tutorial.mp4",
    //         },
    //       ],
    //     },
    //     {
    //       id: "part_2",
    //       name: "Introduction to CSS",
    //       description: "Learn how to style your web pages with CSS.",
    //       materials: [
    //         {
    //           name: "CSS Flexbox Guide",
    //           type: "PDF",
    //           content: "https://example.com/materials/css-flexbox-guide.pdf",
    //         },
    //         {
    //           name: "CSS Tutorial Video",
    //           type: "Video",
    //           content: "https://example.com/materials/css-tutorial.mp4",
    //         },
    //       ],
    //     },
    //     {
    //       id: "part_3",
    //       name: "Getting Started with JavaScript",
    //       description:
    //         "Learn the basics of JavaScript and how to make your web pages interactive.",
    //       materials: [
    //         {
    //           name: "JavaScript Basics",
    //           type: "PDF",
    //           content: "https://example.com/materials/js-basics.pdf",
    //         },
    //         {
    //           name: "JavaScript Tutorial Video",
    //           type: "Video",
    //           content: "https://example.com/materials/js-tutorial.mp4",
    //         },
    //       ],
    //     },
    //   ],
    //   progress: 60,
    //   completed_parts: ["part_1"],
    //   is_completed: false,
    // }

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        //navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://localhost:8080/api/courses/${course_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCourse(data);
        } else {
          console.error("Failed to fetch course");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [course_id, navigate]);

  const togglePartCompletion = async (partId) => {
    const updatedCompletedParts = course.completed_parts.includes(partId)
      ? course.completed_parts.filter((id) => id !== partId)
      : [...course.completed_parts, partId];

    setCourse({ ...course, completed_parts: updatedCompletedParts });

    try {
      const token = localStorage.getItem("access_token");
      await fetch(`https://localhost:8080/api/courses/${course_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed_parts: updatedCompletedParts }),
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="container mx-auto my-12 px-4 mb-20 w-3/4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={img1} //{`http://localhost:8080/uploads/${course.image}`}
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
                className={`p-6 rounded-lg shadow-md ${
                  course.completed_parts.includes(part.id)
                    ? "bg-customBlue text-white"
                    : "bg-gray-100 text-customBlue"
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={course.completed_parts.includes(part.id)}
                    onChange={() => togglePartCompletion(part.id)}
                    className="mr-3"
                  />
                  <h3 className="text-xl font-semibold mb-2">{part.name}</h3>
                </div>
                <p className="mb-4">{part.description}</p>

                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Materials</h4>
                  <ul className="list-disc list-inside pl-5">
                    {part.materials.map((material, index) => (
                      <li key={index}>
                        <a
                          href={material.content}
                          className="hover:underline"
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

          <div className="flex justify-between mt-8">
            <div className="text-lg font-semibold">
              Progress: {course.progress}%
            </div>

            <button
              className="bg-gray-200 text-customBlue font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-400 transition duration-300"
              onClick={() => {
                console.log("Save Course clicked");
              }}
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

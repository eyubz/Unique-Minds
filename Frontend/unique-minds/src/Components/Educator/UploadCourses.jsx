import React, { useState } from "react";

const UploadCourse = () => {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    image: null,
    isFeatured: false,
    parts: [],
  });

  const [currentPart, setCurrentPart] = useState({
    name: "",
    description: "",
    sequence: 1,
    materials: [],
  });

  const [currentMaterial, setCurrentMaterial] = useState({
    name: "",
    type: "",
    content: null,
    description: "",
  });

  const [selectedPartSequence, setSelectedPartSequence] = useState(null);

  const handleCourseChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handlePartChange = (e) => {
    const { name, value } = e.target;
    setCurrentPart((prevPart) => ({
      ...prevPart,
      [name]: value,
    }));
  };

  const handleMaterialChange = (e) => {
    const { name, value, files } = e.target;
    setCurrentMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: files ? files[0] : value,
    }));
  };

  const addPart = () => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      parts: [...prevCourse.parts, currentPart],
    }));
    setCurrentPart({
      name: "",
      description: "",
      sequence: course.parts.length + 1,
      materials: [],
    });
  };

  const addMaterial = () => {
    if (selectedPartSequence === null) {
      alert("Please select a part to add materials.");
      return;
    }

    setCourse((prevCourse) => {
      const updatedParts = prevCourse.parts.map((part) =>
        part.sequence === selectedPartSequence
          ? { ...part, materials: [...part.materials, currentMaterial] }
          : part
      );
      return { ...prevCourse, parts: updatedParts };
    });

    setCurrentMaterial({
      name: "",
      type: "",
      content: null,
      description: "",
    });
  };

  const uploadFile = async (file) => {
    console.log("Uploading file:", file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/courses/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.fileUrl;
      } else {
        console.error("Failed to upload file:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const imageUrl = await uploadFile(course.image);
    console.log("Image URL:", imageUrl);
    if (!imageUrl) {
      alert("Image upload failed. Please try again.");
      return;
    }

    const partsWithUploadedMaterials = await Promise.all(
      course.parts.map(async (part) => {
        const materialsWithUrls = await Promise.all(
          part.materials.map(async (material) => {
            if (material.content instanceof File) {
              const fileUrl = await uploadFile(material.content);
              if (!fileUrl) {
                alert(
                  `Material upload failed for ${material.name}. Please try again.`
                );
                return null;
              }
              return { ...material, content: fileUrl };
            } else {
              return material;
            }
          })
        );

        const validMaterials = materialsWithUrls.filter((mat) => mat !== null);

        return { ...part, materials: validMaterials };
      })
    );

    const courseData = {
      name: course.name,
      description: course.description,
      image: imageUrl,
      isFeatured: course.isFeatured,
      parts: partsWithUploadedMaterials,
    };
    try {
      const response = await fetch("http://localhost:8080/api/courses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Course uploaded successfully:", result);
      } else {
        console.error("Failed to upload course:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading course:", error);
    }
  };

  return (
    <div className="bg-customBlue p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold mb-6 text-white">Upload New Course</h3>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="bg-white p-6 rounded-lg shadow w-full lg:w-1/3 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Course Details
          </h3>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={course.name}
              onChange={handleCourseChange}
              placeholder="Course Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <textarea
              name="description"
              value={course.description}
              onChange={handleCourseChange}
              placeholder="Course Description"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32 resize-none"
            />
            <label className="flex items-center space-x-2">Course Image </label>
            <input
              type="file"
              name="image"
              onChange={handleCourseChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Add Part
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={currentPart.name}
                onChange={handlePartChange}
                placeholder="Part Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="sequence"
                value={currentPart.sequence}
                onChange={handlePartChange}
                placeholder="Part Sequence"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="description"
                value={currentPart.description}
                onChange={handlePartChange}
                placeholder="Part Description"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 md:col-span-2 h-32 resize-none"
              />
              <button
                onClick={addPart}
                className="md:col-span-2 py-3 bg-customBlue text-white rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Add Part
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Course Parts
            </h3>
            <div className="space-y-6">
              {course.parts.map((part, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg bg-gray-50 shadow"
                >
                  <h4 className="text-lg font-bold text-gray-800">
                    {part.name}
                  </h4>
                  <p className="text-gray-700">{part.description}</p>
                  <p className="text-gray-700">Sequence: {part.sequence}</p>
                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-800">Materials</h5>
                    {part.materials.length === 0 ? (
                      <p className="text-gray-700">No materials added yet.</p>
                    ) : (
                      part.materials.map((material, idx) => (
                        <div
                          key={idx}
                          className="border p-3 rounded-lg bg-white shadow mb-2"
                        >
                          <h6 className="font-semibold text-gray-800">
                            {material.name}
                          </h6>
                          <p className="text-gray-700">Type: {material.type}</p>
                          <p className="text-gray-700">
                            Content:{" "}
                            {material.content?.name || "Uploaded content"}
                          </p>
                          <p className="text-gray-700">
                            Description: {material.description}
                          </p>
                        </div>
                      ))
                    )}
                    <button
                      onClick={() => setSelectedPartSequence(part.sequence)}
                      className="py-2 px-4 bg-customBlue text-white rounded-lg hover:bg-gray-500 transition duration-300 mt-4"
                    >
                      Select for Adding Materials
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Add Material to Selected Part
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={currentMaterial.name}
                onChange={handleMaterialChange}
                placeholder="Material Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="type"
                value={currentMaterial.type}
                onChange={handleMaterialChange}
                placeholder="Material Type"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="file"
                name="content"
                onChange={handleMaterialChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="description"
                value={currentMaterial.description}
                onChange={handleMaterialChange}
                placeholder="Material Description"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 md:col-span-2 h-32 resize-none"
              />
              <button
                onClick={addMaterial}
                className="md:col-span-2 py-3 bg-customBlue text-white rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Add Material
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          className="py-3 px-6 bg-white text-customBlue rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Submit Course
        </button>
      </div>
    </div>
  );
};

export default UploadCourse;

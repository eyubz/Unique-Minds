import React, { useState } from "react";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    profileImage: "https://via.placeholder.com/150",
    name: "John Doe",
    age: "16",
    condition: "Down Syndrome",
    bio: "Student bio goes here...",
    guardianEmail: "guardian@example.com",
    guardianPhone: "123-456-7890",
    location: "City, Country",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    // Handle image upload logic
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="bg-light-gray p-8 rounded shadow-md w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-black">Student Profile</h2>
        <button
          onClick={handleEditClick}
          className="text-blue-600 hover:text-blue-800"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <div className="w-32 h-32">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </div>
          {isEditing && (
            <input
              id="imageUpload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          )}
        </label>

        <div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="text-3xl font-bold text-black bg-white border border-gray-300 rounded p-2"
            />
          ) : (
            <h2 className="text-3xl font-bold text-black">{profile.name}</h2>
          )}
          {isEditing ? (
            <input
              type="text"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="text-gray-600 bg-white border border-gray-300 rounded p-2 mt-1"
            />
          ) : (
            <p className="text-gray-600">Age: {profile.age}</p>
          )}
          {isEditing ? (
            <input
              type="text"
              name="condition"
              value={profile.condition}
              onChange={handleChange}
              className="text-gray-600 bg-white border border-gray-300 rounded p-2 mt-1"
            />
          ) : (
            <p className="text-gray-600">Condition: {profile.condition}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-black mb-4">Bio</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full h-32 bg-white border border-gray-300 rounded p-2 text-gray-800"
          />
        ) : (
          <p className="text-gray-800">{profile.bio}</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-black mb-4">
          Guardian Contact Information
        </h3>
        <ul className="text-gray-800">
          <li>
            <span className="font-bold">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="guardianEmail"
                value={profile.guardianEmail}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded p-2 ml-2"
              />
            ) : (
              <span className="ml-2">{profile.guardianEmail}</span>
            )}
          </li>
          <li>
            <span className="font-bold">Phone:</span>
            {isEditing ? (
              <input
                type="text"
                name="guardianPhone"
                value={profile.guardianPhone}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded p-2 ml-2"
              />
            ) : (
              <span className="ml-2">{profile.guardianPhone}</span>
            )}
          </li>
          <li>
            <span className="font-bold">Location:</span>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded p-2 ml-2"
              />
            ) : (
              <span className="ml-2">{profile.location}</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentProfile;

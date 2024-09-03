import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Senior Educator",
    specialization: "Specialized in Down Syndrome Education",
    bio: "John Doe has over 15 years of experience in special education, with a focus on Down Syndrome. He is passionate about creating inclusive learning environments where every child can thrive. In his career, he has developed numerous programs that have helped children with Down Syndrome achieve their educational goals.",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <div className="bg-light-gray p-8 rounded shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-black">Profile</h2>
        <button
          onClick={handleEditClick}
          className="text-blue-600 hover:text-blue-800"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <div className="w-32 h-32">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-full h-full rounded-full object-cover shadow-lg"
          />
        </div>

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
              name="title"
              value={profile.title}
              onChange={handleChange}
              className="text-gray-600 bg-white border border-gray-300 rounded p-2 mt-1"
            />
          ) : (
            <p className="text-gray-600">{profile.title}</p>
          )}
          {isEditing ? (
            <input
              type="text"
              name="specialization"
              value={profile.specialization}
              onChange={handleChange}
              className="text-gray-600 bg-white border border-gray-300 rounded p-2 mt-1"
            />
          ) : (
            <p className="text-gray-600">{profile.specialization}</p>
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
          Contact Information
        </h3>
        <ul className="text-gray-800">
          <li>
            <span className="font-bold">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded p-2 ml-2"
              />
            ) : (
              <span className="ml-2">{profile.email}</span>
            )}
          </li>
          <li>
            <span className="font-bold">Phone:</span>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded p-2 ml-2"
              />
            ) : (
              <span className="ml-2">{profile.phone}</span>
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

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-black mb-4">Connect</h3>
        <div className="flex space-x-4">
          <a href="/" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a href="/" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="/" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;

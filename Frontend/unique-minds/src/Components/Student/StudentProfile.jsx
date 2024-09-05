import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "Emily Johnson",
    age: 10,
    condition: "Down Syndrome",
    bio: "Emily is a bright and energetic student who enjoys art and music.",
    guardianEmail: "guardian@example.com",
    guardianPhone: "+1 987 654 3210",
    location: "Los Angeles, USA",
    profileImage: "https://via.placeholder.com/150",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/student/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch profile:", response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/student/profile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Failed to update profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }

      if (imageFile) {
        const formData = new FormData();
        formData.append("profileImage", imageFile);

        try {
          const response = await fetch(
            "http://localhost:8080/api/student/upload",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          const result = await response.json();
          if (response.ok) {
            const imageUrl = result.url;
            setProfile((prevProfile) => ({
              ...prevProfile,
              profileImage: imageUrl,
            }));
          } else {
            console.error("Error uploading image:", result.message);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }

    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProfile((prevProfile) => ({
      ...prevProfile,
      profileImage: imageUrl,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Profile not found.</p>; // Handle case where profile is not found
  }

  return (
    <div className="bg-light-gray p-8 rounded shadow-md max-w-4xl mx-auto">
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

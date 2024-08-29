import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    dob: "1990-01-01",
    phone: "123-456-7890",
    address: {
      street: "123 Main St",
      city: "Anytown",
      postalCode: "12345",
    },
    bio: "This is a short bio about John Doe.",
    profileImage: "https://via.placeholder.com/100",
  });

  const userId = "YOUR_USER_ID";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`/api/users/${userId}`, profileData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      address: {
        ...profileData.address,
        [name]: value,
      },
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <div className="flex items-center mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="hidden"
          id="profile-image-upload"
        />
        <label htmlFor="profile-image-upload">
          <img
            src={profileData.profileImage || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover cursor-pointer transition-transform transform hover:scale-105"
          />
        </label>
        <div className="ml-6">
          <h2 className="text-3xl font-bold mb-2">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="text-3xl font-bold border-b-2 border-blue-500 focus:outline-none"
              />
            ) : (
              profileData.name
            )}
          </h2>
          <p className="text-lg text-gray-700">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="border-b-2 border-blue-500 focus:outline-none w-full"
              />
            ) : (
              profileData.email
            )}
          </p>
          <p className="text-lg text-gray-700">
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                className="border-b-2 border-blue-500 focus:outline-none w-full"
              />
            ) : (
              profileData.username
            )}
          </p>
          <p className="text-lg text-gray-700">
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={profileData.dob}
                onChange={handleChange}
                className="border-b-2 border-blue-500 focus:outline-none"
              />
            ) : (
              `Date of Birth: ${profileData.dob}`
            )}
          </p>
          <p className="text-lg text-gray-700">
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="border-b-2 border-blue-500 focus:outline-none"
              />
            ) : (
              `Phone: ${profileData.phone}`
            )}
          </p>
          <p className="text-lg text-gray-700">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="street"
                  value={profileData.address.street}
                  onChange={handleAddressChange}
                  placeholder="Street"
                  className="border-b-2 border-blue-500 focus:outline-none mb-2 w-full"
                />
                <input
                  type="text"
                  name="city"
                  value={profileData.address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="border-b-2 border-blue-500 focus:outline-none mb-2 w-full"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={profileData.address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Postal Code"
                  className="border-b-2 border-blue-500 focus:outline-none w-full"
                />
              </>
            ) : (
              `Address: ${profileData.address.street}, ${profileData.address.city}, ${profileData.address.postalCode}`
            )}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Bio</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none"
          />
        ) : (
          <p className="text-lg text-gray-800">{profileData.bio}</p>
        )}
        <button
          onClick={isEditing ? handleSaveClick : handleEditClick}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}

export default Profile;

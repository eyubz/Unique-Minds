import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import img from "../../Assets/educator.jpg";

const StarRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          color={index < rating ? "gold" : "lightgray"}
          size={12}
        />
      ))}
    </div>
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Speech Therapist",
    image: img,
    email: "bezueyerusalem@gmail.com",
    phone: "0957575757",
    bio: "John Doe has over 15 years of experience in special education...",
    availability: ["Monday 10:00 AM - 2:00 PM", "Wednesday 10:00 AM - 2:00 PM"],
    address: "Addis Ababa, Ethiopia",
    rating: 3,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/profile")
  //     .then((response) => response.json())
  //     .then((data) => setProfile(data))
  //     .catch((error) => console.error("Error fetching profile data:", error));
  // }, []);

  const handleEditClick = () => {
    if (isEditing) {
      fetch("http://localhost:8080/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
          setIsEditing(false);
        })
        .catch((error) => console.error("Error posting profile data:", error));
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleAvailabilitySubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const newAvailability = `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()} - ${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString()}`;
    const updatedAvailability = [...profile.availability, newAvailability];

    setProfile({
      ...profile,
      availability: updatedAvailability,
    });

    fetch("http://localhost:8080/api/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availability: newAvailability,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Availability set successfully!");
        setIsOverlayOpen(false);
      })
      .catch((error) => console.error("Error setting availability:", error));
  };

  return (
    <div className="relative flex flex-col h-full p-8 bg-light-gray rounded shadow-md">
      <div className="bg-customBlue p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {profile.name}!
        </h1>
        <p className="mt-2 text-white">
          Always stay updated in your teaching journey.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6 ml-auto">
        <button
          onClick={handleEditClick}
          className="text-blue-600 hover:text-blue-800"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex items-start space-x-6 mb-8">
        <div className="w-32 h-32">
          <img
            src={profile.image}
            alt="Profile"
            className="w-full h-full rounded-full object-cover shadow-lg"
          />
        </div>

        <div className="flex flex-col flex-grow">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="text-3xl font-bold text-black bg-white border border-gray-300 rounded p-2 mb-2"
            />
          ) : (
            <h2 className="text-3xl font-bold text-customBlue">
              {profile.name}
            </h2>
          )}
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={profile.title}
              onChange={handleChange}
              className="text-gray-600 bg-white border border-gray-300 rounded p-2 mb-2"
            />
          ) : (
            <p className="text-customBlue">{profile.title}</p>
          )}
          <div>
            <StarRating rating={profile.rating} />
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-black mb-4">Bio</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full h-32 bg-white border border-gray-300 rounded p-2 text-gray-800 mb-4"
          />
        ) : (
          <p className="text-gray-800 mb-4">{profile.bio}</p>
        )}
        <h3 className="text-2xl font-bold text-black mb-4">Availability</h3>
        <ul className="text-gray-800 mb-4">
          {Array.isArray(profile.availability) &&
            profile.availability.map((avail, index) => (
              <li key={index} className="mb-2">
                {isEditing ? (
                  <input
                    type="input"
                    name={`availability-${index}`}
                    value={avail}
                    onChange={(e) => {
                      const updatedAvailability = [...profile.availability];
                      updatedAvailability[index] = e.target.value;
                      setProfile({
                        ...profile,
                        availability: updatedAvailability,
                      });
                    }}
                    className="w-full bg-white border border-gray-300 rounded p-2 mb-2"
                  />
                ) : (
                  avail
                )}
              </li>
            ))}
        </ul>

        {isEditing && (
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            Add Availability
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">Email</h3>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={profile.email}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded p-2 mb-2"
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">Phone</h3>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={profile.phone}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded p-2 mb-2"
            />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">Address</h3>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded p-2 mb-2"
            />
          ) : (
            <p>{profile.address}</p>
          )}
        </div>
      </div>

      {isOverlayOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Set Availability</h3>
            <form onSubmit={handleAvailabilitySubmit}>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-gray-700 mb-2">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-700 mb-2">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsOverlayOpen(false)}
                  className="bg-gray-600 text-white rounded px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

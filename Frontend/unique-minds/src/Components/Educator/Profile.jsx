import React, { useState, useRef, useEffect, useNavigate } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import img from "../../Assets/educator.jpg";

import {
  FaCalendarAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

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
    availability: [{ start: new Date(), end: new Date() }],
    address: "Addis Ababa, Ethiopia",
    rating: 3,
  });
  //const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetch("http://localhost:8080/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    } else {
      // navigate("/login");
      console.error("No token found in local storage");
    }
  }, []);
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);

    fetch("http://localhost:8080/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile({
          ...profile,
          image: data.imageUrl,
        });
        setImageFile(null);
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload();
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(profile),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
          setIsEditing(false);
        })
        .catch((error) => console.error("Error updating profile data:", error));
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

  const formatAvailability = (start, end) => {
    return `${format(start, "eeee")} ${format(start, "h:mm a")} - ${format(
      end,
      "h:mm a"
    )}`;
  };

  const handleAvailabilitySubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const newAvailability = formatAvailability(startDate, endDate);
    const updatedAvailability = [
      ...profile.availability,
      { start: startDate, end: endDate },
    ];

    setProfile({
      ...profile,
      availability: updatedAvailability,
    });
    fetch("http://localhost:8080/api/availability", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
          className="text-customBlued hover:text-blue-800"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex items-start space-x-6 mb-8">
        <div className="w-32 h-32">
          <img
            src={profile.image || "default-profile.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover shadow-lg cursor-pointer"
            onClick={handleProfileImageClick}
            style={{ cursor: "pointer" }}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-col flex-grow">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="text-3xl font-bold text-customBlue bg-white border border-gray-300 rounded p-2 mb-2"
              />
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                className="text-customBlue bg-white border border-gray-300 rounded p-2 mb-2"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-customBlue">
                {profile.name}
              </h2>
              <p className="text-customBlue">{profile.title}</p>
            </>
          )}
          <div>
            <StarRating rating={profile.rating} />
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-customBlue mb-4">Bio</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full h-32 bg-white border border-gray-300 rounded p-2 text-customBlue mb-4"
          />
        ) : (
          <p className="text-gray-800 mb-4">{profile.bio}</p>
        )}
        <h3 className="text-2xl font-bold text-customBlue mb-4">
          Availability
        </h3>
        <ul className=" mb-4 bg-customBlue rounded-lg shadow-lg p-4">
          {Array.isArray(profile.availability) &&
            profile.availability.map((avail, index) => (
              <li key={index} className="mb-2">
                {isEditing ? (
                  <input
                    type="input"
                    name={`availability-${index}`}
                    value={formatAvailability(avail.start, avail.end)}
                    onChange={(e) => {
                      const updatedAvailability = [...profile.availability];
                      const [newStart, newEnd] = e.target.value.split(" - ");
                      updatedAvailability[index] = {
                        start: new Date(newStart),
                        end: new Date(newEnd),
                      };
                      setProfile({
                        ...profile,
                        availability: updatedAvailability,
                      });
                    }}
                    className="w-full bg-white border border-gray-300 rounded p-2 mb-2 text-customBlue"
                  />
                ) : (
                  <span className="flex items-center text-white">
                    <FaCalendarAlt className="text-white mr-2" />
                    {formatAvailability(avail.start, avail.end)}
                  </span>
                )}
              </li>
            ))}
        </ul>

        {isEditing && (
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="bg-customBlue text-white rounded px-4 py-2"
          >
            Add Availability
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-2xl font-bold text-customBlue mb-4">
          Contact Information
        </h3>
        <div>
          {isEditing ? (
            <input
              type="text"
              name="email"
              placeholder="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded p-2 mb-2 text-customBlue"
            />
          ) : (
            <span className="flex items-center">
              <FaEnvelope className="text-customBlue mr-2" />
              {profile.email}
            </span>
          )}
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded p-2 mb-2 text-customBlue"
            />
          ) : (
            <span className="flex items-center">
              <FaPhoneAlt className="text-customBlue mr-2" />
              {profile.phone}
            </span>
          )}
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded p-2 mb-2 text-customBlue"
            />
          ) : (
            <span className="flex items-center">
              <FaMapMarkerAlt className="text-customBlue mr-2" />
              {profile.address}
            </span>
          )}
        </div>
      </div>
      {isOverlayOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsOverlayOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-customBlue mb-4">
              Set Availability
            </h3>
            <form onSubmit={handleAvailabilitySubmit}>
              <div className="mb-4">
                <label
                  className="block mb-2 text-customBlue"
                  htmlFor="start-date"
                >
                  Start Date
                </label>
                <DatePicker
                  id="start-date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-customBlue"
                  htmlFor="end-date"
                >
                  End Date
                </label>
                <DatePicker
                  id="end-date"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-customBlue text-white rounded px-4 py-2"
              >
                Save Availability
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

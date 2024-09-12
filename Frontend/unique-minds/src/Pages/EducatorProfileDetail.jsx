import React, { useState, useEffect } from "react";
import img from "../Assets/educator.jpg"; // Remove this if the image is fetched from the API

const EducatorProfileDetail = ({ userId }) => {
  const [educator, setEducator] = useState({
    name: "Ford Antonette",
    title: "Senior Response Strategist, Executive Vice President of Admissions",
    phone: "(400) 139-9865",
    email: "fordantonette5@yahoo.com",
    availability: ["Monday - Friday: 9 AM - 5 PM", "Saturday: 10 AM - 2 PM"],
    about:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quia, earum! Dolorum delectus magni aliquam nisi tempora quisquam ut? Odit placeat nam hic quia distinctio. Perferendis excepturi velit consectetur consequuntur rerum.",
    rating: 4.8,
    reviews: [
      {
        name: "John Doe",
        text: "Great educator! Very knowledgeable and helpful.",
        date: "August 22, 2023",
        rating: 5,
      },
      {
        name: "Jane Smith",
        text: "Engaging sessions and always willing to provide extra resources.",
        date: "July 15, 2023",
        rating: 4,
      },
      {
        name: "Michael Johnson",
        text: "I highly recommend learning from Ford. Excellent teaching style.",
        date: "June 12, 2023",
        rating: 5,
      },
    ],
    image: "https://via.placeholder.com/150", // Example image URL
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    rating: 0,
  });
  const [userRating, setUserRating] = useState(0);
  const [selectedAvailability, setSelectedAvailability] = useState("");

  // useEffect(() => {
  //   const fetchEducatorDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://localhost:8080/api/educators/${userId}`
  //       );
  //       const data = await response.json();

  //       if (response.ok) {
  //         setEducator(data);
  //       } else {
  //         console.error("Failed to fetch educator details");
  //         setError("Failed to fetch educator details");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching educator details:", error);
  //       setError("Error fetching educator details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEducatorDetails();
  // }, [userId]);

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const reviewToSubmit = {
      ...newReview,
      rating: userRating,
      educatorId: userId,
    };

    try {
      const response = await fetch(
        `https://localhost:8080/api/courses/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewToSubmit),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEducator((prev) => ({
          ...prev,
          reviews: [...prev.reviews, data],
          rating:
            [...prev.reviews, data].reduce(
              (sum, review) => sum + review.rating,
              0
            ) / [...prev.reviews, data].length,
        }));
        setNewReview({
          name: "",
          text: "",
          rating: 0,
        });
        setUserRating(0);
      } else {
        console.error("Failed to submit review");
        setError("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Error submitting review");
    }
  };

  const handleAvailabilityChange = (e) => {
    const { value } = e.target;
    setSelectedAvailability(value);
  };

  const handleSchedule = async () => {
    if (!selectedAvailability) {
      alert("Please select an availability slot.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:8080/api/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          educatorId: userId,
          availability: selectedAvailability,
        }),
      });

      if (response.ok) {
        alert("Scheduled successfully!");
        setSelectedAvailability("");
      } else {
        console.error("Failed to schedule");
        setError("Failed to schedule");
      }
    } catch (error) {
      console.error("Error scheduling:", error);
      setError("Error scheduling");
    }
  };

  const renderStars = (rating, onClick = () => {}) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={i}
            className="text-yellow-500 text-xl cursor-pointer"
            onClick={() => onClick(i + 1)}
          >
            ★
          </span>
        ))}
        {halfStar && (
          <span
            className="text-yellow-500 text-xl cursor-pointer"
            onClick={() => onClick(fullStars + 1)}
          >
            ★
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span
            key={i + fullStars}
            className="text-gray-300 text-xl cursor-pointer"
            onClick={() => onClick(fullStars + 1 + i)}
          >
            ★
          </span>
        ))}
      </>
    );
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!educator) {
  //   return <div>No educator data available</div>;
  // }

  const {
    name,
    title,
    phone,
    email,
    availability,
    about,
    rating,
    reviews,
    image,
  } = educator;

  return (
    <div className="container mx-auto px-4 py-12 w-3/4 mt-16 shadow-lg">
      <div className="flex flex-col lg:flex-row">
        {/* Profile Section */}
        <div className="w-full lg:w-1/4 lg:pr-8">
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={image || img}
              alt="Profile"
              className="rounded-full w-40 h-40 mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
              {name}
            </h1>
            <h2 className="text-lg text-gray-600 text-center lg:text-left">
              {title}
            </h2>
            <p className="text-gray-600 text-center lg:text-left mt-2">
              {phone}
            </p>
            <p className="text-gray-600 text-center lg:text-left">{email}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-3/4">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Availability
            </h3>
            <div className="mb-4">
              {availability.map((slot, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="radio"
                    id={`availability-${index}`}
                    name="availability"
                    value={slot}
                    checked={selectedAvailability === slot}
                    onChange={handleAvailabilityChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`availability-${index}`}
                    className="text-gray-800"
                  >
                    {slot}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={handleSchedule}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Schedule
            </button>
          </div>

          <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About</h3>
            <p className="text-gray-700">{about}</p>
          </div>

          <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h3>
            <div className="flex items-center mb-4">
              {renderStars(rating)}
              <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
            </div>
            {reviews.map((review, index) => (
              <div key={index} className="mb-4 border-t border-gray-300 pt-4">
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                <p className="text-gray-700">{review.text}</p>
                <p className="text-gray-500 text-sm">
                  {review.date} - {renderStars(review.rating)}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Leave a Review
            </h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label
                  htmlFor="reviewName"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="reviewName"
                  name="name"
                  value={newReview.name}
                  onChange={handleReviewChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reviewText"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Review
                </label>
                <textarea
                  id="reviewText"
                  name="text"
                  value={newReview.text}
                  onChange={handleReviewChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="mb-4 flex items-center">
                {renderStars(userRating, handleStarClick)}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorProfileDetail;

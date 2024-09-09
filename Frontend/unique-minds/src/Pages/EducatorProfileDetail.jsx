import React, { useState, useEffect } from "react";
import img from "../Assets/educator.jpg"; // Remove this if the image is fetched from the API

const EducatorProfileDetail = ({ userId }) => {
  const [educator, setEducator] = useState({
    name: "Ford Antonette",
    title: "Senior Response Strategist, Executive Vice President of Admissions",
    phone: "(400) 139-9865",
    email: "fordantonette5@yahoo.com",
    campus: "IU Southeast",
    website: "https://mywebsite.com",
    availability: "Monday - Friday: 9 AM - 5 PM\nSaturday: 10 AM - 2 PM",
    education: [
      {
        degree: "M.Arch.",
        field: "Arch.",
        institution: "Southern California Institute of Architecture",
        year: "2004",
      },
      {
        degree: "B.A.",
        field: "Sociology and Anthropology",
        institution: "Holy Cross College",
        year: "1995",
      },
    ],
    interests: [
      "Architecture",
      "Social Impact Design",
      "Augmented and Virtual Reality",
      "Digital Fabrication",
      "Design Thinking",
    ],
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
      educatorId: userId, // Include educatorId if needed
    };

    try {
      const response = await fetch(`https://localhost:8080/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewToSubmit),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the state with the new review
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
    campus,
    website,
    availability,
    education,
    interests,
    about,
    rating,
    reviews,
    image,
  } = educator;

  return (
    <div className="container mx-auto px-4 py-12 w-3/4 shadow-lg mt-16">
      <div className="flex flex-col items-center md:flex-row ml-12">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <img
            src={image || img}
            alt="Profile"
            className="rounded-full w-40 h-40 mx-auto md:mx-0 mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <h2 className="text-lg text-gray-600">{title}</h2>
        </div>

        <div className="w-full md:w-2/3 mt-8 md:mt-0 md:ml-12">
          <div className="bg-customBlue shadow-lg rounded-lg p-6 mt-10 text-white">
            <ul>
              <li className="mb-4">
                <strong>Phone:</strong> {phone}
              </li>
              <li className="mb-4">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${email}`} className="text-blue-500">
                  {email}
                </a>
              </li>
              <li className="mb-4">
                <strong>Campus:</strong> {campus}
              </li>
              <li className="mb-4">
                <strong>Website:</strong>{" "}
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  {website}
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Availability
            </h3>
            <p className="text-gray-600 mb-4">{availability}</p>
            <button className="bg-customBlue text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-400 transition duration-300">
              Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 ml-12">
        <h3 className="text-2xl font-bold text-gray-800">Education</h3>
        <ul className="mt-4 text-gray-600">
          {education.map((edu, index) => (
            <li key={index} className="mb-2">
              <strong>{edu.degree}</strong> in {edu.field} from{" "}
              {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 ml-12">
        <h3 className="text-2xl font-bold text-gray-800">Interests</h3>
        <ul className="mt-4 text-gray-600">
          {interests.map((interest, index) => (
            <li key={index} className="mb-2">
              {interest}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 ml-12">
        <h3 className="text-2xl font-bold text-gray-800">About</h3>
        <p className="text-gray-600 mt-4">{about}</p>
      </div>

      <div className="mt-12 ml-12">
        <h3 className="text-2xl font-bold text-gray-800">Rating</h3>
        <div className="flex items-center">
          {renderStars(rating)}
          <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
        </div>
      </div>

      <div className="mt-12 ml-12">
        <h3 className="text-2xl font-bold text-gray-800">Reviews</h3>
        <div className="mt-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow mb-4">
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
                <p className="text-gray-600 ml-2 text-sm">{review.date}</p>
              </div>
              <p className="text-gray-800 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 ml-12">
        <h3 className="text-2xl font-bold text-gray-800">Add Your Review</h3>
        <form
          onSubmit={handleSubmitReview}
          className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newReview.name}
              onChange={handleReviewChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Review
            </label>
            <textarea
              id="text"
              name="text"
              value={newReview.text}
              onChange={handleReviewChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating
            </label>
            <div className="flex items-center">
              {renderStars(userRating, handleStarClick)}
              <span className="ml-2 text-gray-600">
                {userRating === 0 ? "Select a rating" : userRating}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-customBlue text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-400 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducatorProfileDetail;

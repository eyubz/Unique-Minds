import React, { useEffect, useState } from "react";
import img from "../Assets/educator.jpg";
import { Link } from "react-router-dom";

const Educators = () => {
  const [educators, setEducators] = useState([
    {
      id: 1,
      name: "John Doe",
      title: "AI Specialist",
      description:
        "John is an AI expert with years of experience in artificial intelligence and machine learning.",
      image: img,
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Web Developer",
      description:
        "Jane is a full-stack web developer specializing in modern front-end technologies.",
      image: img,
    },
    {
      id: 3,
      name: "Alex Johnson",
      title: "Cybersecurity Expert",
      description:
        "Alex is a leading cybersecurity consultant with experience in ethical hacking.",
      image: img,
    },
    // Add more educators as needed
  ]);

  const [visibleEducators, setVisibleEducators] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    // Initial load of educators
    setVisibleEducators(educators.slice(0, itemsPerPage));
    setShowMore(educators.length > itemsPerPage);
  }, [educators]);

  const loadMoreEducators = () => {
    const nextPage = visibleEducators.length + itemsPerPage;
    setVisibleEducators(educators.slice(0, nextPage));
    if (nextPage >= educators.length) {
      setShowMore(false); // Hide "Show More" if no more educators to load
    }
  };

  const SearchBar = () => {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
      setInput(e.target.value);
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      // Add search functionality here
    };

    return (
      <div className="flex justify-center pt-8 pb-4 px-4">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl flex items-center bg-white rounded-md overflow-hidden"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Search Educator"
              className="w-full py-3 px-4 pl-12 rounded-md text-customBlue border border-blue-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-customBlue text-white py-3 px-6 rounded-md hover:bg-gray-500 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="mt-12">
      <SearchBar />
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-500 mt-12 mb-28">
          Our Teachers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {visibleEducators.map((educator) => (
            <div
              key={educator.id}
              className="bg-customBlue rounded-lg shadow-lg overflow-hidden max-w-xs transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6 text-center">
                <img
                  src={educator.image}
                  alt={educator.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {educator.name}
                </h3>
                <h4 className="text-lg text-white mb-2">{educator.title}</h4>
                <p className="text-white">{educator.description}</p>
                <button className="mt-4 bg-white text-customBlue font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none">
                  <Link to="/educator_detail">View Profile</Link>
                </button>
              </div>
            </div>
          ))}
        </div>

        {showMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreEducators}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Educators;

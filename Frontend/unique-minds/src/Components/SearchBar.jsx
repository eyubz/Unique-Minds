import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex justify-center pt-8 pb-4 px-4">
      <form
        onSubmit={handleSearch}
        className="w-full max-w-lg flex items-center bg-white rounded-md shadow-lg"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Enter Course Name or Category"
            className="w-full py-2 px-4 pl-10 rounded-md text-blue-500 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none ml-2"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

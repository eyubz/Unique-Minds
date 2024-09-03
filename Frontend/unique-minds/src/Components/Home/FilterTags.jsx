import React from "react";

const FilterTags = ({ onTagSelect }) => {
  const tags = ["Technology", "Science", "Mathematics", "Arts"];

  const handleTagClick = (tag) => {
    if (onTagSelect) {
      onTagSelect(tag);
    }
  };

  return (
    <div className="flex justify-evenly gap-6 p-4 bg-white rounded-md shadow-lg mt-10">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className="px-6 py-3 rounded-lg bg-gray-200 text-blue-500 border-2 border-blue-500 hover:bg-gray-300 focus:outline-none"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;

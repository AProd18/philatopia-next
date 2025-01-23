import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search by name, year, or country..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchBar;

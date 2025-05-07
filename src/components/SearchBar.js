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
        className="opacity-80 w-full p-2 border border-gray-300 dark:border-gray-600 rounded mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default SearchBar;

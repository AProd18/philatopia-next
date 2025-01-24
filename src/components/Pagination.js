const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded text-sm shadow-md transition-colors duration-200 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-black"
        }`}
      >
        Previous
      </button>
      <span className="self-center text-sm text-gray-600">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded text-sm shadow-md transition-colors duration-200 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-black"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

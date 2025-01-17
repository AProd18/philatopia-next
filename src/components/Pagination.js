const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Previous
      </button>
      <span className="self-center">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

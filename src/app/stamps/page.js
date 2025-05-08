"use client";

import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Button from "@/components/ui/Button";
import UserProfileModal from "@/components/UserProfileModal";
import CountryFilter from "@/components/CountryFilter";
import SortDropdown from "@/components/SortDropdown";

const PhilatelyGallery = () => {
  const [stamps, setStamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [filteredStamps, setFilteredStamps] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [sortOption, setSortOption] = useState("date-newest");

  useEffect(() => {
    const fetchStamps = async () => {
      const res = await fetch(`/api/collections/all?page=${currentPage}`);
      const data = await res.json();

      setStamps(data.stamps);
      setTotalPages(data.totalPages);
      setFilteredStamps(data.stamps);
    };
    fetchStamps();
  }, [currentPage]);

  const sortedStamps = [...filteredStamps].sort((a, b) => {
    switch (sortOption) {
      case "date-newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "date-oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "year-asc":
        return a.yearIssued - b.yearIssued;
      case "year-desc":
        return b.yearIssued - a.yearIssued;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = stamps.filter((stamp) => {
      return (
        stamp.name.toLowerCase().includes(lowerQuery) ||
        stamp.yearIssued.toString().includes(lowerQuery) ||
        stamp.country.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredStamps(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStampClick = (stamp) => {
    setSelectedStamp(stamp);
  };

  function getTruncatedText(text, maxLength = 125) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    const trimmed = text.slice(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4"></h1>

      {/* Search bar */}
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 w-full">
        {/* Filter bar */}
        <CountryFilter
          stamps={stamps}
          onFilter={(country) => {
            if (!country) {
              setFilteredStamps(stamps);
            } else {
              const filtered = stamps.filter(
                (stamp) => stamp.country.toLowerCase() === country.toLowerCase()
              );
              setFilteredStamps(filtered);
            }
          }}
        />

        {/* Sort bar */}
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      {/* Toggle View Mode */}
      <div className="flex justify-end space-x-4 mb-4">
        <Button
          onClick={() => setViewMode("grid")}
          viewMode={viewMode}
          mode="grid"
        >
          Grid View
        </Button>
        <Button
          onClick={() => setViewMode("list")}
          viewMode={viewMode}
          mode="list"
        >
          List View
        </Button>
      </div>

      {/* Displaying stamps */}
      {filteredStamps.length === 0 ? (
        <p>No stamps found</p>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="w-full border rounded-lg overflow-hidden bg-card text-text backdrop-blur-sm bg-opacity-90 dark:via-gray-700 dark:to-gray-800 flex flex-col justify-between border-gray-300 dark:border-gray-600"
            >
              {stamp.image ? (
                <Image
                  src={stamp.image}
                  alt={stamp.name}
                  width={400}
                  height={300}
                  className="object-cover cursor-pointer"
                  onClick={() => handleStampClick(stamp)}
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex justify-center items-center">
                  <span className="text-white">No Image</span>
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                  {stamp.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {getTruncatedText(stamp.description)}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-bold">Year Issued:</span>{" "}
                  {stamp.yearIssued}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-bold">Country:</span> {stamp.country}
                </p>
                <p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-auto"
                  onClick={() => setSelectedUser(stamp.user)}
                >
                  <span className="font-bold">Owner:</span>{" "}
                  <span className="cursor-pointer hover:underline">
                    {stamp.user?.name || "Unknown"}
                  </span>
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
                  Added on: {new Date(stamp.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="flex flex-col space-y-4">
          {sortedStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 border p-4 rounded bg-card text-text backdrop-blur-sm bg-opacity-90 dark:via-gray-700 dark:to-gray-800 border-gray-300 dark:border-gray-600"
            >
              {stamp.image ? (
                <Image
                  src={stamp.image}
                  alt={stamp.name}
                  width={128}
                  height={128}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain cursor-pointer"
                  onClick={() => handleStampClick(stamp)}
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 flex justify-center items-center text-gray-700 rounded">
                  No Image
                </div>
              )}
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-200">
                  {stamp.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {getTruncatedText(stamp.description)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-bold">Year Issued:</span>{" "}
                  {stamp.yearIssued}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-bold">Country:</span> {stamp.country}
                </p>
                <p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-auto"
                  onClick={() => setSelectedUser(stamp.user)}
                >
                  <span className="font-bold">Owner:</span>{" "}
                  <span className="cursor-pointer hover:underline">
                    {stamp.user?.name || "Unknown"}
                  </span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                  Added on: {new Date(stamp.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {selectedStamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blur samo na pozadinu */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Modal ostaje jasan */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedStamp(null)}
            >
              ✖
            </button>
            <Image
              src={selectedStamp.image}
              alt={selectedStamp.name}
              width={300}
              height={200}
              className="object-contain w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhilatelyGallery;

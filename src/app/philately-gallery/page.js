"use client";

import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Modal from "@/components/Modal";

const PhilatelyGallery = () => {
  const [stamps, setStamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [filteredStamps, setFilteredStamps] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const handleOwnerClick = async (userId) => {
    const res = await fetch(`/api/users/${userId}`);
    const userData = await res.json();

    setSelectedOwner({
      id: userId,
      profileImage: userData.profileImage,
      aboutMe: userData.aboutMe,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>

      {/* Search bar */}
      <SearchBar onSearch={handleSearch} />

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
          {filteredStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="border rounded-lg overflow-hidden bg-gradient-to-b from-white/90 via-[#f3f1ed] to-white/70 flex flex-col h-full"
            >
              {stamp.image ? (
                <Image
                  src={stamp.image}
                  alt={stamp.name}
                  width={400}
                  height={300}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex justify-center items-center">
                  <span className="text-white">No Image</span>
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-600">
                  {stamp.name}
                </h3>
                <p className="text-sm text-gray-600">{stamp.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-bold">Year Issued:</span>{" "}
                  {stamp.yearIssued}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-bold">Country:</span> {stamp.country}
                </p>
                <p
                  className="text-sm text-gray-500 mt-auto cursor-pointer hover:underline"
                  onClick={() => setSelectedOwner(stamp.userId)}
                >
                  <span className="font-bold">Owner:</span> {stamp.userId}
                </p>
                <p className="text-xs text-gray-400 mt-1 italic">
                  Added on: {new Date(stamp.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="flex flex-col space-y-4">
          {filteredStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 border p-4 rounded bg-gradient-to-b from-white/90 via-[#f3f1ed] to-white/70"
            >
              {stamp.image ? (
                <Image
                  src={stamp.image}
                  alt={stamp.name}
                  width={128}
                  height={128}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 flex justify-center items-center text-gray-700 rounded">
                  No Image
                </div>
              )}
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-semibold text-lg text-gray-600">
                  {stamp.name}
                </h3>
                <p className="text-sm text-gray-600">{stamp.description}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Year Issued:</span>{" "}
                  {stamp.yearIssued}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Country:</span> {stamp.country}
                </p>
                <p
                  className="text-sm text-gray-500 mt-auto cursor-pointer hover:underline"
                  onClick={() => handleOwnerClick(stamp.userId)}
                >
                  <span className="font-bold">Owner:</span> {stamp.userId}
                </p>
                <p className="text-xs text-gray-400 italic">
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
      {selectedOwner && (
        <Modal
          isOpen={!!selectedOwner}
          onClose={() => setSelectedOwner(null)}
        />
      )}
    </div>
  );
};

export default PhilatelyGallery;

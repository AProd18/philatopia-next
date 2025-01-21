"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Image from "next/image";

const MyCollections = () => {
  const { data: session } = useSession(); // Retrieve the current user's session
  const [stamps, setStamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch the user's stamps only if the user is logged in
    if (session?.user?.name) {
      const fetchStamps = async () => {
        const res = await fetch(
          `/api/collections?user=${session.user.name}&page=${currentPage}`
        );
        const data = await res.json();
        setStamps(data.stamps); // Update state with the fetched stamps
        setTotalPages(data.totalPages); // Update the total number of pages
      };

      fetchStamps();
    }
  }, [session, currentPage]); // Fetch data when session or currentPage changes

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Collections</h1>
      {stamps.length === 0 ? (
        <p>No stamps yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stamps.map((stamp) => (
            <div
              key={stamp.id}
              className="border rounded-lg overflow-hidden shadow-lg bg-white"
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
              <div className="p-4">
                <h3 className="text-lg font-semibold">{stamp.name}</h3>
                <p className="text-sm text-gray-600">{stamp.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Year Issued: {stamp.yearIssued}
                </p>
                <p className="text-xs text-gray-400 mt-1">
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
    </div>
  );
};

export default MyCollections;

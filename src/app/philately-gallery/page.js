"use client";

import { useEffect, useState } from "react";

const PhilatelyGallery = () => {
  const [stamps, setStamps] = useState([]);

  useEffect(() => {
    const fetchStamps = async () => {
      const res = await fetch("/api/collections/all");
      const data = await res.json();
      setStamps(data);
    };
    fetchStamps();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Philately Gallery</h1>
      {stamps.length === 0 ? (
        <p>No stamps available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stamps.map((stamp) => (
            <div
              key={stamp.id}
              className="border rounded-lg overflow-hidden shadow-lg bg-white"
            >
              {stamp.image ? (
                <img
                  src={stamp.image}
                  alt={stamp.name}
                  className="w-full h-48 object-cover"
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
                <p className="text-sm text-gray-500 mt-2">
                  Owner: {stamp.user}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Added on: {new Date(stamp.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhilatelyGallery;

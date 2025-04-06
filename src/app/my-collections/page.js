"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Image from "next/image";
import Button from "@/components/ui/Button";

const MyCollections = () => {
  const { data: session } = useSession();
  const [stamps, setStamps] = useState([]);
  const [filteredStamps, setFilteredStamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingStamp, setEditingStamp] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    yearIssued: "",
    country: "",
    image: "",
  });

  const [stampToDelete, setStampToDelete] = useState(null); // For confirmation popup

  useEffect(() => {
    if (session?.user?.id) {
      const fetchStamps = async () => {
        const res = await fetch(
          `/api/collections?userId=${session.user.id}&page=${currentPage}`
        );
        const data = await res.json();
        setStamps(data.stamps);
        setFilteredStamps(data.stamps);
        setTotalPages(data.totalPages);
      };

      fetchStamps();
    }
  }, [session, currentPage]);

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

  const confirmDelete = (stamp) => {
    setStampToDelete(stamp);
  };

  const cancelDelete = () => {
    setStampToDelete(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!stampToDelete) return;

    const res = await fetch(`/api/collections/${stampToDelete.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const updatedStamps = stamps.filter(
        (stamp) => stamp.id !== stampToDelete.id
      );
      setStamps(updatedStamps);
      setFilteredStamps(updatedStamps);
      setStampToDelete(null);
    } else {
      alert("Failed to delete stamp.");
    }
  };

  const handleEditClick = (stamp) => {
    setEditingStamp(stamp);
    setFormValues({
      name: stamp.name,
      description: stamp.description,
      yearIssued: stamp.yearIssued,
      country: stamp.country,
      image: stamp.image || "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.image && editingStamp?.image) {
      formValues.image = editingStamp.image;
    }

    formValues.yearIssued = parseInt(formValues.yearIssued);

    const res = await fetch(`/api/collections/${editingStamp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    if (res.ok) {
      const updatedStamp = await res.json();
      const updatedStamps = stamps.map((stamp) =>
        stamp.id === editingStamp.id ? updatedStamp.stamp : stamp
      );

      setStamps(updatedStamps);
      setFilteredStamps(updatedStamps);
      setEditingStamp(null);
    } else {
      alert("Failed to update stamp.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <SearchBar onSearch={handleSearch} />

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

      {filteredStamps.length === 0 ? (
        <p>No stamps found</p>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="bg-gradient-to-b from-white/90 via-[#f3f1ed] to-white/70 border rounded-lg overflow-hidden shadow-lg flex flex-col justify-between"
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
                <p className="text-sm text-gray-600 line-clamp-3">
                  {stamp.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-bold">Year Issued:</span>{" "}
                  {stamp.yearIssued}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-bold">Country:</span> {stamp.country}
                </p>
              </div>
              <div className="mt-4 flex space-x-2 p-4">
                <button
                  onClick={() => handleEditClick(stamp)}
                  className="px-3 py-0.5 rounded flex-1 shadow-md transition-colors duration-200 bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-black text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(stamp)}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 hover:text-red-900 px-3 py-0.5 rounded text-sm transition-colors duration-200 shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {filteredStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="flex items-center space-x-4 border p-4 rounded bg-gradient-to-b from-white/90 via-[#f3f1ed] to-white/70"
            >
              {stamp.image ? (
                <Image
                  src={stamp.image}
                  alt={stamp.name}
                  width={80}
                  height={60}
                  className="rounded object-cover"
                />
              ) : (
                <div className="w-20 h-16 bg-gray-300 flex justify-center items-center text-gray-700 rounded">
                  No Image
                </div>
              )}
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-600">
                  {stamp.name}
                </h3>
                <p className="text-sm text-gray-600">{stamp.description}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Year Issued:</span>{" "}
                  {stamp.yearIssued},{" "}
                  <span className="font-bold">Country:</span> {stamp.country}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleEditClick(stamp)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-black px-3 py-1 rounded text-sm transition-colors duration-200 shadow-md flex items-center justify-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(stamp)}
                  className="bg-red-100 hover:bg-red-200 text-red-800 hover:text-red-900 px-3 py-1 rounded text-sm transition-colors duration-200 shadow-md flex items-center justify-center"
                >
                  Delete
                </button>
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

      {/* Delete Confirmation Popup */}
      {stampToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this stamp?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollections;

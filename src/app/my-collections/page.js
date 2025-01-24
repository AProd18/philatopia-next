"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Image from "next/image";

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

  useEffect(() => {
    if (session?.user?.name) {
      const fetchStamps = async () => {
        const res = await fetch(
          `/api/collections?user=${session.user.name}&page=${currentPage}`
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

  const handleDelete = async (id) => {
    const res = await fetch(`/api/collections/${id}`, { method: "DELETE" });

    if (res.ok) {
      const updatedStamps = stamps.filter((stamp) => stamp.id !== id);
      setStamps(updatedStamps);
      setFilteredStamps(updatedStamps);
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
      formValues.image = editingStamp.image; // Keep the current image if not changed
    }

    // Ensure yearIssued is a number before sending
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>

      {/* Search bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Toggle View Mode */}
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 rounded shadow-md transition-colors duration-200 ${
            viewMode === "grid"
              ? "bg-green-400 text-gray-800 hover:bg-green-500 hover:text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-black"
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded shadow-md transition-colors duration-200 ${
            viewMode === "list"
              ? "bg-green-400 text-gray-800 hover:bg-green-500 hover:text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-black"
          }`}
        >
          List View
        </button>
      </div>

      {/* Displaying stamps */}
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
                  className="px-3 py-2 rounded flex-1 shadow-md transition-colors duration-200 bg-green-400 text-gray-800 hover:bg-green-500 hover:text-white text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stamp.id)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-black px-3 py-2 rounded text-sm transition-colors duration-200 shadow-md"
                >
                  Delete
                </button>
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
                  className="bg-green-400 hover:bg-green-500 text-gray-800 hover:text-white px-3 py-1 rounded text-sm transition-colors duration-200 shadow-md flex items-center justify-center"
                >
                  <span className="material-icons-outlined mr-1 text-base"></span>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stamp.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-black px-3 py-1 rounded text-sm transition-colors duration-200 shadow-md flex items-center justify-center"
                >
                  <span className="material-icons-outlined mr-1 text-base"></span>
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
      {editingStamp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-6 rounded shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-600">Edit Stamp</h2>

            <label
              className="block text-sm font-semibold mb-2 text-gray-600"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />

            <label
              className="block text-sm font-semibold mb-2 text-gray-600"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />

            <label
              className="block text-sm font-semibold mb-2 text-gray-600"
              htmlFor="yearIssued"
            >
              Year Issued
            </label>
            <input
              id="yearIssued"
              type="number"
              value={formValues.yearIssued}
              onChange={(e) =>
                setFormValues({ ...formValues, yearIssued: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />

            <label
              className="block text-sm font-semibold mb-2 text-gray-600"
              htmlFor="country"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              value={formValues.country}
              onChange={(e) =>
                setFormValues({ ...formValues, country: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />

            <label
              className="block text-sm font-semibold mb-2 text-gray-600"
              htmlFor="image"
            >
              Image:
            </label>
            <div className="flex items-center mb-4">
              <input
                id="image"
                type="file"
                onChange={(e) =>
                  setFormValues({ ...formValues, image: e.target.files[0] })
                }
                className="border p-2 w-full"
              />
              <span className="ml-4 text-sm text-gray-500">
                {formValues.image?.name || "No file chosen"}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingStamp(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCollections;

"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const AddStamp = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [yearIssued, setYearIssued] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Set upload limits: max file size and max image dimensions
  const MAX_SIZE = 1 * 1024 * 1024;
  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image.size > MAX_SIZE) {
      setError("File size is too large. Maximum allowed size is 1MB.");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        setError(
          `Image dimensions are too large. Maximum allowed dimensions are ${MAX_WIDTH}x${MAX_HEIGHT}.`
        );
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("yearIssued", yearIssued);
      formData.append("country", country);
      formData.append("user", session?.user?.name);
      formData.append("image", image);

      fetch("/api/stamps", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Stamp successfully added:", data);
            setError("");
            setSuccessMessage("Stamp successfully added!");
            // Reset form inputs
            setName("");
            setDescription("");
            setYearIssued("");
            setCountry("");
            setImage(null);
          } else {
            setError(data.error);
            setSuccessMessage("");
          }
        });
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Stamp
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="yearIssued"
            className="block text-sm font-medium text-gray-700"
          >
            Year Issued:
          </label>
          <input
            type="number"
            id="yearIssued"
            value={yearIssued}
            onChange={(e) => setYearIssued(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country:
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-gray-600"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">
            {successMessage}
            <p className="mt-2">
              Check your stamps on the{" "}
              <Link
                href="/my-collections"
                className="text-indigo-600 hover:text-indigo-800"
              >
                My Collections
              </Link>{" "}
              page.
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Stamp
        </button>
      </form>
    </div>
  );
};

export default AddStamp;

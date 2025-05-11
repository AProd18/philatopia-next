"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
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
  const [stampCount, setStampCount] = useState(0);

  // Set upload limits: max file size and max image dimensions
  const MAX_SIZE = 1 * 1024 * 1024;
  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1000;
  const MAX_DESCRIPTION_LENGTH = 125;
  const MAX_STAMPS = 10;

  useEffect(() => {
    if (error || successMessage) {
      const timeout = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error, successMessage]);

  useEffect(() => {
    const fetchStampCount = async () => {
      if (session?.user?.id) {
        const res = await fetch(`/api/stamps/count?userId=${session.user.id}`);
        const data = await res.json();
        if (data.success) {
          setStampCount(data.count);
        }
      }
    };
    fetchStampCount();
  }, [session]);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setError("File size is too large. Maximum allowed size is 1MB.");
        setImage(null);
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          setError(
            `Image dimensions are too large. Max allowed: ${MAX_WIDTH}x${MAX_HEIGHT}.`
          );
          setImage(null);
        } else {
          setError("");
          setImage(file);
        }
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stampCount >= MAX_STAMPS) {
      setError("You have reached the maximum number of stamps.");
      return;
    }

    if (!image) {
      setError("Please select a valid image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("yearIssued", yearIssued);
    formData.append("country", country);
    formData.append("userId", session?.user?.id);
    formData.append("image", image);

    try {
      const res = await fetch("/api/stamps", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMessage("Stamp successfully added!");
        setError("");
        setName("");
        setDescription("");
        setYearIssued("");
        setCountry("");
        setImage(null);
      } else {
        setError(data.error);
        setSuccessMessage("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 opacity-90 shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        {session && (
          <div className="mb-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {stampCount}/{MAX_STAMPS} stamps added
            {stampCount >= MAX_STAMPS && (
              <p className="text-red-500 mt-1">Upgrade to add more stamps.</p>
            )}
          </div>
        )}
        {/* <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center"></h2> */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
            rows={4}
            maxLength={MAX_DESCRIPTION_LENGTH}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />

          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            {description.length}/{MAX_DESCRIPTION_LENGTH} characters
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="yearIssued"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Year Issued:
          </label>
          <input
            type="number"
            id="yearIssued"
            value={yearIssued}
            onChange={(e) => setYearIssued(e.target.value)}
            required
            className="mt-1 block w-full p-2 border  border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Country:
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="mt-1 block w-full p-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-gray-600 dark:text-gray-300"
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
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                My Collections
              </Link>{" "}
              page.
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-300"
        >
          Add Stamp
        </button>
      </form>
    </div>
  );
};

export default AddStamp;

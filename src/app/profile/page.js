"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // null, true, false

  // Fetch user profile data when session is available
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/profile`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProfileImage(data.user.profileImage || "");
            setAboutMe(data.user.aboutMe || "");
          } else {
            console.error("Failed to fetch profile:", data.error);
          }
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [session]);

  // Handle file sleection for profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle saving profile changes (image and about me section)
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("aboutMe", aboutMe);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const response = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      setProfileImage(result.data.profileImage);
      setMessage("Profile updated successfully!");
      setIsSuccess(true);
    } else {
      setMessage(result.error || "Error updating profile");
      setIsSuccess(false);
    }

    setTimeout(() => {
      setMessage("");
      setIsSuccess(null);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card text-text backdrop-blur-sm bg-opacity-90 dark:via-gray-700 dark:to-gray-800 dark:border-gray-600  rounded-lg shadow-md mt-36">
      <div className="mb-6 text-center">
        <div className="relative w-32 h-32 mx-auto">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full border border-gray-300"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-white">
              No Image
            </div>
          )}
        </div>
        <label
          htmlFor="profileImage"
          className="mt-4 inline-block px-4 py-2  rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-black"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="profileImage"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="aboutMe"
          className="block text-lg font-medium mb-2 text-gray-500 dark:text-gray-300"
        >
          About Me
        </label>
        <textarea
          id="aboutMe"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value.slice(0, 254))}
          className="w-full p-2 opacity-80 border rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          rows={4}
          placeholder="Write something about yourself..."
        />
        <p className="text-sm text-right text-gray-400 dark:text-gray-300 mt-1">
          {aboutMe.length}/254 characters
        </p>
        {message && (
          <p
            className={`mt-2 text-sm ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      {session?.user?.email && (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          {session.user.email}
        </p>
      )}

      <button
        onClick={handleSaveChanges}
        className="w-full px-6 py-2  rounded-lg  bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-black"
      >
        Save Changes
      </button>
    </div>
  );
}

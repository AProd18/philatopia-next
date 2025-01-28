"use client";

import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null); // Store image URL
  const [aboutMe, setAboutMe] = useState("This is my bio"); // Example initial bio
  const [password, setPassword] = useState(""); // New password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm new password

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Temporary display of image
      // TODO: Save image to server later
    }
  };

  const handleSaveChanges = () => {
    // TODO: Handle saving profile image, about me, and password to server
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Changes saved successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* Profile Image Section */}
      <div className="mb-6">
        <div className="relative w-32 h-32">
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
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
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

      {/* About Me Section */}
      <div className="mb-6">
        <label htmlFor="aboutMe" className="block text-lg font-medium mb-2">
          About Me
        </label>
        <textarea
          id="aboutMe"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows={4}
          placeholder="Write something about yourself..."
        />
      </div>

      {/* Change Password Section */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter new password"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-lg font-medium mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Confirm new password"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveChanges}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Save Changes
      </button>
    </div>
  );
}

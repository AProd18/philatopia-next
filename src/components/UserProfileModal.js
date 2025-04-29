"use client";

import Image from "next/image";

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-10 text-center">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>

        {user.profileImage ? (
          <Image
            src={user.profileImage}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4 object-cover w-24 h-24"
          />
        ) : (
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center">
            No Image
          </div>
        )}
        <h2 className="text-lg font-semibold text-gray-600">
          {user.name || "Unknown User"}
        </h2>
        <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
          {user.aboutMe || "No bio available."}
        </p>
      </div>
    </div>
  );
};

export default UserProfileModal;

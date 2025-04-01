import { useState } from "react";

const Modal = ({ isOpen, onClose, profileImage, aboutMe }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <img
            src={profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border border-gray-300"
          />
          <p className="text-gray-700 text-center">
            {aboutMe || "No bio available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

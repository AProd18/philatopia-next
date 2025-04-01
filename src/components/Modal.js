import Image from "next/image";
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
          <Image
            src={stamp.image}
            alt={stamp.name}
            width={128}
            height={128}
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
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

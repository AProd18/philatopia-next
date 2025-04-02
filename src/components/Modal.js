import Image from "next/image";

const Modal = ({ isOpen, onClose, profileImage, aboutMe }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="User profile"
              width={128}
              height={128}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full">
              No Image
            </div>
          )}
          <p className="text-gray-700 text-center mt-4">
            {aboutMe || "No bio available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

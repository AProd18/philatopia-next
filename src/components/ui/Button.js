export default function Button({ onClick, viewMode, mode, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded shadow-md transition-colors duration-200 ${
        viewMode === mode
          ? "bg-green-400 text-gray-800 hover:bg-green-500 hover:text-white"
          : "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

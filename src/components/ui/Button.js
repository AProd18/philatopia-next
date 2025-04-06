export default function Button({
  onClick,
  children,
  viewMode,
  mode,
  variant = "view",
}) {
  let baseStyles =
    "px-3 py-1.5 text-sm rounded shadow-md transition-colors duration-200";

  let styleMap = {
    view:
      viewMode === mode
        ? "bg-gray-400 text-gray-800 hover:bg-gray-400"
        : "bg-gray-300 text-gray-800 hover:bg-gray-400",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${styleMap[variant]}`}>
      {children}
    </button>
  );
}

// "bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-black

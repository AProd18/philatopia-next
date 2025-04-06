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
        ? "bg-[#b8a88a] text-white hover:bg-[#a8977b]"
        : "bg-[#e0d6c6] text-gray-800 hover:bg-[#cfc3b1]",
    edit: "bg-[#b8a88a] text-white hover:bg-[#a8977b]",
    delete: "bg-[#e6b8b8] text-gray-800 hover:bg-[#d89c9c]",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${styleMap[variant]}`}>
      {children}
    </button>
  );
}

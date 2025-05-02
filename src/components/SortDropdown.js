"use client";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="bg-white w-full  shadow-md rounded p-4 mb-6 border border-gray-300 opacity-80">
      <label
        htmlFor="sort"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="date-newest">Date Added (Newest)</option>
        <option value="date-oldest">Date Added (Oldest)</option>
        <option value="year-asc">Year Issued (Ascending)</option>
        <option value="year-desc">Year Issued (Descending)</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  );
}

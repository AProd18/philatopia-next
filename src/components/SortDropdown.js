"use client";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="bg-white w-full md:w-[50%] shadow-md rounded p-4 mb-6 border border-gray-300 opacity-80">
      <label htmlFor="sort" className="mr-2 font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2"
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

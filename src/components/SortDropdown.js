"use client";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="w-full shadow-md rounded p-4 mb-6 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[rgba(0,0,0,0.4)]">
      <label
        htmlFor="sort"
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

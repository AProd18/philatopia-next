"use client";

import { useState, useEffect } from "react";

const CountryFilter = ({ stamps, onFilter }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const countryCounts = stamps.reduce((acc, stamp) => {
    acc[stamp.country] = (acc[stamp.country] || 0) + 1;
    return acc;
  }, {});

  const uniqueCountries = Array.from(
    new Set(stamps.map((stamp) => stamp.country))
  ).sort();

  const handleChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    onFilter(country);
  };

  return (
    <div className="bg-white w-full md:w-[50%] shadow-md rounded p-4 mb-6 border border-gray-300 opacity-80">
      <label
        htmlFor="country"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Filter by Country
      </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleChange}
        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Countries</option>
        {uniqueCountries.map((country) => (
          <option key={country} value={country}>
            {country} ({countryCounts[country]})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryFilter;

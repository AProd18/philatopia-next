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
    <div className="mb-4">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700"
      >
        Filter by Country
      </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">All Countries ({stamps.length})</option>
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

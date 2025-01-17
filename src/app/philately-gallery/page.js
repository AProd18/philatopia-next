"use client";

import { useEffect, useState } from "react";

const PhilatelyGallery = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Fetches stamp collections from the API when the component mounts
    const fetchCollections = async () => {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(data);
    };
    fetchCollections();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Philately Gallery</h1>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <h2>{collection.name}</h2>
            <p>{collection.description}</p>
            <p>Created by: {collection.user}</p>
            <p>Year: {collection.yearIssued}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhilatelyGallery;

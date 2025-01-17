"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const AddStamp = () => {
  const { data: session } = useSession(); // Retrieve the current user session
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [yearIssued, setYearIssued] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object for sending data in multipart/form-data format
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("yearIssued", yearIssued);
    formData.append("user", session?.user?.name); // Attach the current user's name from the session korisnika sa sesije
    if (image) {
      formData.append("image", image); // Attach the image file if selected
    }

    const res = await fetch("/api/stamps", {
      method: "POST", // HTTP method for creating a new resource
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      console.log("Stamp successfully added:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Year Issued:</label>
        <input
          type="number"
          value={yearIssued}
          onChange={(e) => setYearIssued(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button type="submit">Add Stamp</button>
    </form>
  );
};

export default AddStamp;

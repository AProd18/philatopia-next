"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }), // Sending user credentials
      });

      if (!response.ok) {
        throw new Error("Error registering user");
      }

      const user = await response.json();

      // Automatically log in the user after successful registration
      signIn("credentials", {
        redirect: false,
        email,
        password,
      }).then(({ error }) => {
        if (error) {
          setError(error);
        } else {
          router.push("/"); // Redirect to homepage on successful login
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Register</h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col space-y-4 w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </form>
    </main>
  );
}

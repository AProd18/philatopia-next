"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession(); // Retrieve the current session data and authentication status
  console.log("Session data:", session);
  console.log("Session status:", status);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("Sign-in response:", res);

    if (res?.error) {
      console.log("Login error:", res.error);
      setError("Invalid email or password");
    } else {
      console.log("Logged in successfully");
      router.push("/login");
    }
  };

  const handleGoogleLogin = async () => {
    const res = await signIn("google", { callbackUrl: "/" });
    console.log("Google login response:", res);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Login</h1>
      {!session ? (
        <form
          className="flex flex-col mt-4 space-y-4 w-80"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <p className="text-green-600">Welcome, {session.user.name}!</p>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}

      {!session && (
        <div className="mt-4 text-center">
          <p className="text-gray-600">or</p>
          <button
            onClick={handleGoogleLogin}
            className="p-2 mt-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Login with Google
          </button>
        </div>
      )}
    </main>
  );
}

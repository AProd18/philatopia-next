"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession(); // Retrieve the current session data and authentication status
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
    <main className="flex items-center justify-center min-h-screen opacity-90">
      <div className="w-full max-w-sm bg-[var(--card)] text-[var(--card-foreground)] p-6 rounded-lg shadow-md transition-colors duration-300">
        <h1 className="text-xl font-semibold text-center mb-6">
          Sign in with your email and password
        </h1>
        {!session ? (
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </form>
        ) : (
          <div className="text-center mt-4">
            <p className="text-green-600">Welcome, {session.user.name}!</p>
            <p>
              Check out your{" "}
              <a
                href="/my-collections"
                className="text-blue-500 underline hover:text-blue-700"
              >
                collection
              </a>
              !
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 p-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Sign out
            </button>
          </div>
        )}

        {!session && (
          <div className="mt-4 text-center">
            <p>or</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full mt-4 p-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

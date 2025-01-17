"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the home page after sign out
  };

  return (
    <nav
      className="text-white p-4"
      style={{ backgroundColor: "var(--nav-menu)" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Philately</Link>
        </div>
        <div className="space-x-4">
          <Link href="/philately-gallery" className="hover:underline">
            Philately Gallery
          </Link>
          {!session ? (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/add-stamp" className="hover:underline">
                Add Stamp
              </Link>
              <Link href="/my-collections" className="hover:underline">
                My Collections
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

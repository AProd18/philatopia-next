"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Philately</Link>
        </div>
        <div className="space-x-4">
          {!session ? (
            <>
              <Link href="/philately-gallery" className="hover:underline">
                Philately Gallery
              </Link>
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
              <button onClick={() => signOut()} className="hover:underline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

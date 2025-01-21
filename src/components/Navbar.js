"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for menu

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav
      className="text-white p-4 shadow-lg"
      style={{
        backgroundColor: "#343a40",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        opacity: "80%",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">Philately</Link>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto md:flex flex-col md:flex-row items-center bg-gray-900 md:bg-transparent space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 `}
        >
          <Link
            href="/philately-gallery"
            className="hover:underline block md:inline"
          >
            Philately Gallery
          </Link>
          {!session ? (
            <>
              <Link href="/login" className="hover:underline block md:inline">
                Login
              </Link>
              <Link
                href="/register"
                className="hover:underline block md:inline"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/add-stamp"
                className="hover:underline block md:inline"
              >
                Add Stamp
              </Link>
              <Link
                href="/my-collections"
                className="hover:underline block md:inline"
              >
                My Collections
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline block md:inline"
              >
                Logout
              </button>
            </>
          )}
          {/* Contact Us */}
          <Link
            href="/contact-us"
            className="hover:underline block md:inline md:ml-4 border-l-2 md:border-l-0 pl-4 md:pl-0"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

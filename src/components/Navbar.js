"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/profile`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user.profileImage) {
            setProfileImage(data.user.profileImage);
          }
        })
        .catch((error) =>
          console.error("Error fetching profile image:", error)
        );
    }
  }, [session]); // When the session changes, refresh the profile picture.

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`text-white p-4 shadow-lg fixed w-full z-50 transition-all ${
          menuOpen ? "h-auto" : "h-16"
        }`}
        style={{
          backgroundColor: "#343a40",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          opacity: "80%",
        }}
      >
        <div className="container mx-auto flex justify-between items-center h-full">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/">Stampfolio</Link>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>

          {/* Navigation Menu */}
          <div
            className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex flex-col md:flex-row items-center bg-gray-900 md:bg-transparent space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <Link href="/philately-gallery" className="hover:underline block">
              Stamps
            </Link>

            {session ? (
              <>
                <Link href="/add-stamp" className="hover:underline block">
                  Add Stamp
                </Link>
                <Link href="/my-collections" className="hover:underline block">
                  My Collections
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:underline block text-red-400"
                >
                  Logout
                </button>

                {/* Profil image as icon */}
                <Link href="/profile" className="ml-4">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                      ?
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:underline block">
                  Login
                </Link>
                <Link href="/register" className="hover:underline block">
                  Register
                </Link>
              </>
            )}

            <Link
              href="/contact-us"
              className="hover:underline block md:inline md:ml-4 border-l-2 md:border-l-0 pl-4 md:pl-5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Push content down when menu is open */}
      <div className={`${menuOpen ? "mt-80" : "mt-16"} transition-all`}></div>
    </>
  );
}

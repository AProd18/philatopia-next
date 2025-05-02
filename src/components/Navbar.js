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
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 ${
          menuOpen ? "bg-[#343a40]" : "bg-[#343a40]/80"
        } text-white shadow-lg transition-colors duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center p-4 h-16">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/">Philatopia</Link>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <div className="relative group">
              <span className="hover:underline cursor-pointer md:mr-6">
                Getting Into Stamps
              </span>
              <div className="absolute left-0 top-full w-48 bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/getting-into-stamps/start-here"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Start Here
                </Link>
                <Link
                  href="/getting-into-stamps/how-to-spot-value"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  How to Spot Value
                </Link>
                <Link
                  href="/getting-into-stamps/storing-and-tools"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Storage & Tools
                </Link>
              </div>
            </div>

            <Link href="/stamps" className="hover:underline">
              Stamps
            </Link>

            {session ? (
              <>
                <Link href="/add-stamp" className="hover:underline">
                  Add Stamp
                </Link>
                <Link href="/my-collections" className="hover:underline">
                  My Collections
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:underline text-red-400"
                >
                  Sign Out
                </button>
                <Link href="/profile" className="ml-2">
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
                <Link href="/login" className="hover:underline">
                  Sign In
                </Link>
                <Link href="/register" className="hover:underline">
                  Create An Account
                </Link>
              </>
            )}

            <Link href="/contact-us" className="hover:underline">
              Contact Us
            </Link>
            <Link href="/donation" className="hover:underline">
              Donation
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#343a40]/80 backdrop-blur-sm text-white flex flex-col items-center justify-center space-y-6 md:hidden animate-fade-in border-t border-white/10 px-4 pt-6 pb-10">
          <Link
            href="/stamps"
            className="text-xl hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Stamps
          </Link>
          <div className="text-center">
            <div className="text-xl font-semibold mb-2">
              Getting Into Stamps
            </div>
            <Link
              href="/getting-into-stamps/start-here"
              className="block hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Start Here
            </Link>
            <Link
              href="/getting-into-stamps/how-to-spot-value"
              className="block hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              How to Spot Value
            </Link>
            <Link
              href="/getting-into-stamps/storing-and-tools"
              className="block hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Storage & Tools
            </Link>
          </div>

          {session ? (
            <>
              <Link
                href="/add-stamp"
                className="text-xl hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Add Stamp
              </Link>
              <Link
                href="/my-collections"
                className="text-xl hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                My Collections
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-400 hover:underline text-xl"
              >
                Sign Out
              </button>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={60}
                    height={60}
                    className="rounded-full border border-gray-300"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl">
                    ?
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xl hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-xl hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Create An Account
              </Link>
            </>
          )}
          <Link
            href="/contact-us"
            className="text-xl hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/donation"
            className="text-xl hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Donation
          </Link>
        </div>
      )}

      {/* Push content down on desktop */}
      <div className="mt-16"></div>
    </>
  );
}

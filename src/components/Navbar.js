"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { LogOut } from "lucide-react";
import {
  FiArrowRightCircle,
  FiUserPlus,
  FiMail,
  FiHeart,
} from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import ThemeToggle from "./ThemeToggle";

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
        } text-gray-300 shadow-lg transition-colors duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center p-4 h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 text-xl font-bold">
            <Link href="/">Philatopia</Link>
            <ThemeToggle />
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
              <span className="nav-link cursor-pointer md:mr-6">
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

            <Link href="/stamps" className="nav-link">
              Stamps
            </Link>

            {session ? (
              <>
                <Link href="/add-stamp" className="nav-link">
                  Add Stamp
                </Link>
                <Link href="/my-collections" className="nav-link">
                  My Collections
                </Link>
                <button
                  onClick={handleLogout}
                  className="nav-link-red inline-flex items-center gap-1"
                >
                  <LogOut size={16} strokeWidth={1.5} />
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
                <Link
                  href="/login"
                  className="nav-link flex items-center gap-2 text-m"
                >
                  <FiArrowRightCircle className="text-base" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/register"
                  className="nav-link flex items-center gap-2 text-m"
                >
                  <FiUserPlus className="text-base" />
                  <span>Create An Account</span>
                </Link>
              </>
            )}

            <Link
              href="/contact-us"
              className="nav-link flex items-center gap-2 text-m"
            >
              <BiMessageDetail className="text-base" />
              <span>Contact Us</span>
            </Link>
            <Link
              href="/donation"
              className="nav-link flex items-center gap-2 text-m"
            >
              <FiHeart className="text-base" />
              <span>Donation</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#343a40]/80 backdrop-blur-sm text-white flex flex-col items-center justify-center space-y-4 md:hidden animate-fade-in border-t border-white/10 px-4 pt-10 ">
          <Link
            href="/stamps"
            className="text-l hover:bg-gray-700/50 px-4  rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            Stamps
          </Link>

          <hr className="border-white/10 w-full max-w-xs mx-auto" />

          <div className="text-center">
            <div className="text-l font-semibold mb-2">Getting Into Stamps</div>
            <Link
              href="/getting-into-stamps/start-here"
              className="block text-sm hover:bg-gray-700/50 px-4  rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              Start Here
            </Link>
            <Link
              href="/getting-into-stamps/how-to-spot-value"
              className="block text-sm hover:bg-gray-700/50 px-4  rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              How to Spot Value
            </Link>
            <Link
              href="/getting-into-stamps/storing-and-tools"
              className="block text-sm hover:bg-gray-700/50 px-4  rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              Storage & Tools
            </Link>
          </div>

          <hr className="border-white/10 w-full max-w-xs mx-auto" />

          {session ? (
            <>
              <Link
                href="/add-stamp"
                className="text-l hover:bg-gray-700/50 px-4  rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Add Stamp
              </Link>
              <hr className="border-white/10 w-full max-w-xs mx-auto" />
              <Link
                href="/my-collections"
                className="text-l hover:bg-gray-700/50 px-4 rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                My Collections
              </Link>
              <hr className="border-white/10 w-full max-w-xs mx-auto" />

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-400 hover:bg-gray-700/50 px-4 py-2 rounded transition text-l"
              >
                <LogOut size={18} strokeWidth={1.5} />
                Sign Out
              </button>
              <hr className="border-white/10 w-full max-w-xs mx-auto" />
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
              <hr className="border-white/10 w-full max-w-xs mx-auto" />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-m"
                onClick={() => setMenuOpen(false)}
              >
                <FiArrowRightCircle className="text-base" />
                <span>Sign In</span>
              </Link>

              <hr className="border-white/10 w-full max-w-xs mx-auto" />

              <Link
                href="/register"
                className="flex items-center gap-2 text-m"
                onClick={() => setMenuOpen(false)}
              >
                <FiUserPlus className="text-base" />
                <span>Create An Account</span>
              </Link>

              <hr className="border-white/10 w-full max-w-xs mx-auto" />
            </>
          )}
          <Link
            href="/contact-us"
            className=" hover:bg-gray-700/50 px-4  rounded transition flex items-center gap-2 text-m"
            onClick={() => setMenuOpen(false)}
          >
            <BiMessageDetail className="text-base" />
            <span>Contact Us</span>
          </Link>
          <hr className="border-white/10 w-full max-w-xs mx-auto" />
          <Link
            href="/donation"
            className=" hover:bg-gray-700/50 px-4 rounded transition flex items-center gap-2 text-m"
            onClick={() => setMenuOpen(false)}
          >
            <FiHeart className="text-base" />
            <span>Donation</span>
          </Link>
        </div>
      )}

      {/* Push content down on desktop */}
      <div className="mt-16"></div>
    </>
  );
}

"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <div className="relative min-h-screen flex flex-col">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center max-md:bg-contain"
            style={{
              backgroundImage: "url('/background.jpg')",
              filter: "brightness(0.8) blur(2px)",
            }}
          ></div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-20"></div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-4 bg-opacity-60">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}

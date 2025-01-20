"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en" className={inter.className}>
        <body>
          <div className="relative min-h-screen flex flex-col">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/background.jpg')",
                filter: "brightness(0.8) blur(2px)", // Smanjuje osvetljenje i dodaje blur
              }}
            ></div>

            {/* Overlay Layer for Shadow Effect */}
            <div className="absolute inset-0 bg-black opacity-20"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto p-4  bg-opacity-60">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}

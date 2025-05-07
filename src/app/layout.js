"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en" className={inter.className}>
        <body>
          <ThemeProvider
            attribute="class" // koristi Tailwind 'class' strategiju
            defaultTheme="light"
            enableSystem={true}
          >
            <div className="relative min-h-screen flex flex-col">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/background.jpg')",
                  filter: "brightness(0.8) blur(2px)",
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
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}

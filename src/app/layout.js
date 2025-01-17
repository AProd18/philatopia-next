"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">{children}</main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}

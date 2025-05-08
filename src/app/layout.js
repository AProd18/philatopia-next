"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { inter } from "@/components/ui/fonts";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class" // use Tailwind 'class' strategy
            defaultTheme="light"
            enableSystem={true}
          >
            <div className="relative min-h-screen flex flex-col">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center max-md:bg-contain"
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

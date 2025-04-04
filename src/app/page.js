// app/page.js
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Home() {
  const totalUsers = await prisma.user.count();
  const totalStamps = await prisma.stamp.count();

  return (
    <main className="flex flex-col items-center justify-center py-10">
      {/* Welcome Section */}
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mb-5 bg-white bg-opacity-90 shadow-lg rounded-md">
        <div className="h-80 flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-700 text-center">
            Welcome to Stampfolio
          </h1>
          <p className="text-base sm:text-lg md:text-l mt-2 text-gray-600 text-center">
            <strong>Stampfolio</strong> is a platform for stamp collectors to
            share, organize, and explore beautiful stamps from around the world.
            Whether you&apos;re a passionate philatelist or just starting your
            collection,{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              join us
            </Link>{" "}
            and showcase your stamps!
          </p>
        </div>
      </div>

      {/* Announcement Section */}
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mb-5 bg-red-100 bg-opacity-90 shadow-lg rounded-md">
        <div className="h-60 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-bold text-red-700 text-center">
            Application Under Development
          </h2>
          <p className="text-base sm:text-lg md:text-sm mt-2 text-red-600 text-center">
            This app is currently under development and has been released for
            testing purposes. We will be rolling out exciting new features and
            updates very soon! Stay tuned for more news and improvements!
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mb-5 bg-white bg-opacity-90 shadow-md rounded-md">
        <div className="p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            📊 Stampfolio Stats
          </h3>
          <p className="text-gray-600 text-center">
            Total Users: <span className="font-bold">{totalUsers}</span> | Total
            Stamps: <span className="font-bold">{totalStamps}</span>
          </p>
        </div>
      </div>
    </main>
  );
}

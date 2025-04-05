import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const totalUsers = await prisma.user.count();
  const totalStamps = await prisma.stamp.count();

  const lastStamp = await prisma.stamp.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true, // ako želiš i ime korisnika
    },
  });

  return (
    <main className="flex flex-col items-center justify-center pt-40 pb-10 px-4">
      {/* Announcement Section */}
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] mb-5 bg-red-100 bg-opacity-90 shadow-lg rounded-md">
        <div className="h-60 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-bold text-red-700 text-center">
            Application Under Development
          </h2>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] mb-5 bg-white bg-opacity-90 shadow-lg rounded-md">
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

      {lastStamp && (
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mb-5 bg-green-100 bg-opacity-90 shadow-md rounded-md">
          <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
            <Image
              src={lastStamp.image}
              alt={lastStamp.title || "Recently added stamp"}
              width={128}
              height={128}
              className="rounded-md shadow object-cover"
            />

            <div>
              <h3 className="text-xl font-semibold text-green-700">
                🆕 Last Added Stamp
              </h3>
              <p className="text-gray-700 font-bold">{lastStamp.title}</p>
              <p className="text-gray-600">{lastStamp.description}</p>
              {/* <p className="text-sm text-gray-500 mt-1">
                Year: {lastStamp.year} | By: {lastStamp.user.username}
              </p> */}
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] mb-5 bg-white bg-opacity-90 shadow-md rounded-md">
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

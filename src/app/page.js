import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export default async function Home() {
  const totalUsers = await prisma.user.count();
  const totalStamps = await prisma.stamp.count();

  const lastStamp = await prisma.stamp.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <main className="flex flex-col items-center justify-center pt-10 md:pt-40 pb-10 px-4">
      {/* Announcement Section */}
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] mb-5 bg-red-100 bg-opacity-90 shadow-lg rounded-md">
        <div className="h-60 flex flex-col items-center justify-center p-6">
          <h2 className="text-xl sm:text-xl md:text-xl font-bold text-red-700 text-center">
            Application Under Development
          </h2>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] mb-5 bg-white bg-opacity-90 shadow-lg rounded-md">
        <div className="h-80 flex flex-col items-center justify-center p-6">
          <h1 className="text-xl sm:text-3xl md:text-xl font-bold text-gray-700 text-center">
            Welcome to Philatopia
          </h1>
          <p className="text-sm sm:text-base md:text-base mt-2 text-gray-600 text-center">
            <strong>Philatopia</strong> is a platform for stamp collectors to
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
        <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] mb-5 flex flex-col xl:flex-row gap-4 space-y-4 xl:space-y-0">
          {/* Last Stamp */}
          <div className="flex-1 bg-white shadow-lg bg-opacity-90 rounded-md p-4 flex flex-col sm:flex-row items-center gap-4">
            <Image
              src={lastStamp.image}
              alt={lastStamp.title || "Recently added stamp"}
              width={128}
              height={128}
              className="rounded-md shadow object-cover"
            />
            <div>
              <h3 className="text-l font-semibold text-gray-700">
                Last Added Stamp
              </h3>
              <p className="text-gray-700 font-bold">{lastStamp.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                Posted{" "}
                {formatDistanceToNow(new Date(lastStamp.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 bg-white shadow-md bg-opacity-90 rounded-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl sm:text-3xl md:text-xl font-semibold text-gray-700 mb-2">
              Stats
            </h3>
            <p className="text-gray-600 text-center">
              Total Users: <span className="font-bold">{totalUsers}</span> |
              Total Stamps: <span className="font-bold">{totalStamps}</span>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

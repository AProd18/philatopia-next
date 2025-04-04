import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
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

      {/* New Announcement Section */}
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

      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-blue-100 bg-opacity-90 shadow-lg rounded-md">
        <div className="h-60 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-bold text-blue-700 text-center">
            Explore the Philately Gallery
          </h2>
          <p className="text-base sm:text-lg md:text-sm mt-2 text-blue-600 text-center">
            Browse a wide variety of stamps uploaded by our community. No
            account needed!
          </p>
          <Link
            href="/philately-gallery"
            className="mt-4 bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </main>
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hqrdrajjaxxelgdbbgob.supabase.co",
        pathname: "/storage/v1/object/public/profile_images/**",
      },
      {
        protocol: "https",
        hostname: "hqrdrajjaxxelgdbbgob.supabase.co",
        pathname: "/storage/v1/object/public/stamp_images/**",
      },
    ],
  },
};

export default nextConfig;

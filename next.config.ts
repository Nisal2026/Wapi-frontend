import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: "https://your-backend-domain.com/api",
    NEXT_PUBLIC_API_BASE_URL: "/api",
    NEXT_PUBLIC_STORAGE_URL: "https://your-backend-domain.com/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.beinthegno.com",
      },
    ],
  },
};

export default nextConfig;

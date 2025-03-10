import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: 'cdn.discordapp.com', 
      },
      {
        protocol:"http",
        hostname:"localhost",
        port:"3000"
      },
      {
        protocol:"https",
        hostname:"discoimg.vercel.app",
      }
    ],
  }
};

export default nextConfig;

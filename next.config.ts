import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
        protocol: 'https',
        port: '',
        pathname: '/**',
        search: '',
      }
    ]
  }
};

export default nextConfig;

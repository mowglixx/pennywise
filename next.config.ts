import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
        protocol: 'https',
        pathname: '/**'
      }
    ]
  },
  experimental: {
      optimizePackageImports: [
        "@chakra-ui/react"
      ]
    }
};

export default nextConfig;

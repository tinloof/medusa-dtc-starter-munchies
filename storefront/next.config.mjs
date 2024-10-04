/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {hostname: "cdn.sanity.io"},
      {hostname: "munchies.medusajs.app"},
    ],
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    taint: true,
  },
};

export default config;

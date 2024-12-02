/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {hostname: "cdn.sanity.io"},
      {hostname: "s3.minio.coolify.fmouss.dev"}, // TODO: Remove this once we have a proper domain
      {hostname: "tinloof-munchies.s3.eu-north-1.amazonaws.com"},
      {hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com"},
      {hostname: "s3.eu-central-1.amazonaws.com"},
    ],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: true, //process.env.VERCEL_ENV === "production",
  },
  typescript: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    taint: true,
  },
  rewrites() {
    return [
      {
        source:
          "/:path((?!us|dk|fr|de|es|jp|gb|ca|ar|za|mx|my|au|nz|dz|br|cms|api|images|icons|favicon.ico|sections|favicon-inactive.ico).*)",
        destination: "/ca/:path*",
      },
    ];
  },
};

export default config;

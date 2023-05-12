/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // experimental: {
  //   webVitalsAttribution: ["FCP", "LCP", "CLS", "FID", "TTFB", "INP"],
  // },
};

module.exports = nextConfig;

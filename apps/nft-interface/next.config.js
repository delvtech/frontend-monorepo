/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ["assets.example.com", "element-fi.mypinata.cloud", "ipfs.io"],
  },
};

module.exports = nextConfig;

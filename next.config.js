/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product images come from Cloudinary — allow that domain for
    // Next.js's built-in image optimization.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;

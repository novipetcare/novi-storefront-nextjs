/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next.js's built-in image optimization pipeline needs extra
    // platform-specific configuration to run on Cloudflare Workers —
    // without it, using <Image> anywhere (even just the header logo)
    // can crash every page. Disabling it serves images directly
    // instead — a standard, safe workaround for this platform.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;

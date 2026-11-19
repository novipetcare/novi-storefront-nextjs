/** @type {import('next').NextConfig} */
// Security headers on every page. The Content-Security-Policy here is deliberately limited to the
// directives that cannot break checkout (framing, plugins, base tag); a full script policy would need
// live testing with the Razorpay pop-up.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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

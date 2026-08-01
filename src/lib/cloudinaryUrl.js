// Inserts Cloudinary transformation parameters into an existing
// Cloudinary URL — automatic format selection (WebP/AVIF where
// supported), automatic quality compression, and a width cap. This is
// how we get real image optimization despite Next.js's own
// optimization pipeline being disabled (see next.config.js — it needs
// extra platform-specific setup we don't have on Cloudflare Workers).
// Cloudinary does the resizing/compression at their CDN edge instead.
export function optimizedImageUrl(url, width) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url; // not a Cloudinary URL (or already transformed) — leave as-is
  }
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

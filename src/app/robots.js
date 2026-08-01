const SITE_URL = "https://novi-storefront-nextjs.novipetcare.workers.dev";

// Next.js generates /robots.txt automatically from this file's export.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful for search engines to index here — a checkout
      // form and a one-time order confirmation with no lasting content.
      disallow: ["/checkout", "/order-success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

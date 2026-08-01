import { getProducts } from "../lib/api.js";

const SITE_URL = "https://novi-storefront-nextjs.novipetcare.workers.dev";

// Next.js generates /sitemap.xml automatically from this file's export.
export default async function sitemap() {
  const staticPages = [
    { url: `${SITE_URL}/`, priority: 1.0 },
    { url: `${SITE_URL}/about`, priority: 0.7 },
    { url: `${SITE_URL}/contact`, priority: 0.5 },
    { url: `${SITE_URL}/terms-and-conditions`, priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, priority: 0.3 },
    { url: `${SITE_URL}/shipping-policy`, priority: 0.3 },
    { url: `${SITE_URL}/payment-refund-policy`, priority: 0.3 },
  ];

  let productPages = [];
  try {
    const products = await getProducts();
    productPages = products.map((p) => ({
      url: `${SITE_URL}/product/${p.id}`,
      priority: 0.9,
    }));
  } catch {
    // If the backend is briefly unavailable at build/request time, ship
    // the sitemap without product pages rather than fail the whole thing.
  }

  return [...staticPages, ...productPages].map((entry) => ({
    ...entry,
    lastModified: new Date(),
  }));
}

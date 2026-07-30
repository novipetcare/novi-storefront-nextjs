// src/lib/api.js
// -----------------------------------------------------------------------
// Used inside Server Components (pages) to fetch data at request time —
// this is the actual SEO benefit of the Next.js version: search engines
// receive fully-rendered HTML with real product/content data already in
// it, rather than an empty shell that JavaScript fills in afterward.
//
// `cache: "no-store"` means every request gets fresh data from the
// database (reflects admin panel changes immediately) rather than a
// stale build-time snapshot.
// -----------------------------------------------------------------------

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://novi-backend.novipetcare.workers.dev";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();
  return data.products;
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.product;
}

export async function getContent() {
  const res = await fetch(`${BASE_URL}/api/content`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load content");
  const data = await res.json();
  return data.content;
}

export { BASE_URL };

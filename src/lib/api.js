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
//
// Defensive by design: a slow or malformed backend response should never
// crash the whole page. Every fetch has a timeout, and response parsing
// tolerates a few different shapes rather than assuming one exact
// structure.
// -----------------------------------------------------------------------

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://novi-backend.novipetcare.workers.dev";
const FETCH_TIMEOUT_MS = 10000;

async function fetchJson(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store", signal: controller.signal });
    if (!res.ok) {
      console.error(`[NOVI storefront] API request failed: ${path} (status ${res.status})`);
      throw new Error(`Backend returned ${res.status} for ${path}`);
    }
    try {
      return await res.json();
    } catch (parseErr) {
      console.error(`[NOVI storefront] API request returned invalid JSON: ${path}`);
      throw new Error(`Invalid JSON response from ${path}`);
    }
  } catch (err) {
    if (err.name === "AbortError") {
      console.error(`[NOVI storefront] API request timed out: ${path}`);
      throw new Error(`Backend request timed out: ${path}`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// Tolerates a few reasonable response shapes for a product list, rather
// than assuming exactly one — protects against the page crashing if the
// backend's wrapper shape ever shifts slightly.
function extractArray(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.[key])) return data.data[key];
  return [];
}

function normalizeProduct(p) {
  return {
    ...p,
    price: Number(p.price) || 0,
    mrp: p.mrp != null ? Number(p.mrp) : null,
    stock: Number(p.stock) || 0,
    images: Array.isArray(p.images) ? p.images : [],
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
  };
}

export async function getProducts() {
  const data = await fetchJson("/api/products");
  return extractArray(data, "products").map(normalizeProduct);
}

export async function getProduct(id) {
  const data = await fetchJson(`/api/products/${id}`);
  const product = data?.product ?? data?.data?.product ?? data;
  return product ? normalizeProduct(product) : null;
}

export async function getContent() {
  const data = await fetchJson("/api/content");
  return data?.content ?? data?.data?.content ?? data ?? {};
}

export { BASE_URL };

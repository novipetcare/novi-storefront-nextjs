import { notFound } from "next/navigation";
import { getProduct } from "../../../lib/api.js";
import ProductDetailClient from "./ProductDetailClient.jsx";

// This is the single biggest SEO win of the whole rebuild: each product
// now has its own real, indexable URL (/product/1, /product/2, ...)
// with a UNIQUE title and description — something the old single-page
// modal-based product view could never offer, since it had no URL of
// its own at all.
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  if (!product) return { title: "Product not found — NOVI" };

  return {
    title: `${product.name} — NOVI`,
    description: product.description,
    openGraph: {
      title: `${product.name} — NOVI`,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <main className="product-page">
      <ProductDetailClient product={product} />
    </main>
  );
}

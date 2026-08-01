import { notFound } from "next/navigation";
import { getProduct } from "../../../lib/api.js";
import ProductDetailClient from "./ProductDetailClient.jsx";

const SITE_URL = "https://novi-storefront-nextjs.novipetcare.workers.dev";

// This is the single biggest SEO win of the whole rebuild: each product
// now has its own real, indexable URL (/product/1, /product/2, ...)
// with a UNIQUE title and description — something the old single-page
// modal-based product view could never offer, since it had no URL of
// its own at all.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found — NOVI" };

  const title = `${product.name} — NOVI`;

  return {
    title,
    description: product.description,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      title,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  // Product structured data — this is what actually enables Google to
  // show price and stock-availability directly in search results
  // (rich results), rather than just a plain blue link.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.length > 0 ? product.images : undefined,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${id}`,
      priceCurrency: "INR",
      price: (product.price / 100).toFixed(2),
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  // Breadcrumb structured data — lets Google show "novipets.in > Product
  // Name" in the search result instead of the raw URL path.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: product.name, item: `${SITE_URL}/product/${id}` },
    ],
  };

  return (
    <main className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient product={product} />
    </main>
  );
}

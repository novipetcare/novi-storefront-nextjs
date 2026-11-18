import Hero from "../components/Hero.jsx";
import FormulaGrid from "../components/FormulaGrid.jsx";
import TrustBar from "../components/TrustBar.jsx";
import FAQ from "../components/FAQ.jsx";
import { getProducts, getContent } from "../lib/api.js";
import { FAQS } from "../lib/faqData.js";

// FAQ structured data — this is what actually makes Google eligible to
// show your FAQ questions directly in search results (an "FAQ rich
// result"), not just the page title/description. Built from the same
// FAQS data the visible FAQ component renders, so they can never drift
// out of sync with each other.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

// No "use client" here — this runs on the server. By the time this HTML
// reaches a browser or a search engine crawler, the product names,
// prices, and hero text are ALREADY in the page — nothing needs to wait
// for JavaScript to load and run first.
export default async function HomePage() {
  let products, content;
  try {
    // Fetched sequentially, not with Promise.all — kept this way since
    // it's proven reliable; the real fix for the earlier flakiness was
    // the service binding in lib/api.js, not this ordering, but no
    // reason to change it back now.
    products = await getProducts();
    content = await getContent();
  } catch (err) {
    // Logged for our own debugging, but customers see a calm, on-brand
    // message instead of a stack trace.
    console.error("[NOVI storefront] Homepage data fetch failed:", err.message);
    return (
      <main className="maintenance-page">
        <span className="maintenance-icon" aria-hidden="true">
          🐾
        </span>
        <h1>Site under maintenance</h1>
        <p>We're preparing something huge. Please check back in a few minutes.</p>
      </main>
    );
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero content={content} />
      <FormulaGrid products={products} />
      <TrustBar />
      <FAQ />
    </main>
  );
}

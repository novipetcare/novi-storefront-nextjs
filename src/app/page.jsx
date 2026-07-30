import Hero from "../components/Hero.jsx";
import FormulaGrid from "../components/FormulaGrid.jsx";
import TrustBar from "../components/TrustBar.jsx";
import FAQ from "../components/FAQ.jsx";
import { getProducts, getContent } from "../lib/api.js";

// No "use client" here — this runs on the server. By the time this HTML
// reaches a browser or a search engine crawler, the product names,
// prices, and hero text are ALREADY in the page — nothing needs to wait
// for JavaScript to load and run first.
export default async function HomePage() {
  let products, content;
  try {
    [products, content] = await Promise.all([getProducts(), getContent()]);
  } catch (err) {
    // Temporary: surface the real error message instead of Next.js's
    // generic "Application error" page, so we can see exactly what's
    // failing rather than guessing further.
    return (
      <main style={{ padding: "2rem", fontFamily: "monospace" }}>
        <h1>Data fetch failed</h1>
        <p>{err.message}</p>
        <pre>{err.stack}</pre>
      </main>
    );
  }

  return (
    <main>
      <Hero content={content} />
      <FormulaGrid products={products} />
      <TrustBar />
      <FAQ />
    </main>
  );
}

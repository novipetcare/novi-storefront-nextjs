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
  const [products, content] = await Promise.all([getProducts(), getContent()]);

  return (
    <main>
      <Hero content={content} />
      <FormulaGrid products={products} />
      <TrustBar />
      <FAQ />
    </main>
  );
}

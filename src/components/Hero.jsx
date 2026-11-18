export default function Hero({ content }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="eyebrow">3 variants · 1 mission</span>
        <h1 className="hero-title">{content.hero_title || "A formula for every dog."}</h1>
        <p className="hero-subtitle">
          {content.hero_subtitle || "Pure care for precious paws — finally formulated for India."}
        </p>
        <div className="trust-tags">
          {["Sulphate-Free", "Paraben-Free", "pH Balanced", "Cruelty-Free", "Made in India"].map((tag) => (
            <span key={tag} className="trust-tag">
              {tag}
            </span>
          ))}
        </div>
        <a href="#formulas" className="hero-cta">
          Find your dog&apos;s formula ↓
        </a>
      </div>
    </section>
  );
}

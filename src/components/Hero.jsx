import TrustTags from "./TrustTags.jsx";

export default function Hero({ content }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="eyebrow">3 variants · 1 mission</span>
        <h1 className="hero-title">{content.hero_title || "A formula for every dog."}</h1>
        <h2 className="hero-title-2">
          {content.hero_title_2 || "Dog shampoo made for Indian hard water, with Niacinamide in every bottle."}
        </h2>
        <p className="hero-subtitle">
          {content.hero_subtitle || "Pure care for precious paws — finally formulated for India."}
        </p>
        <TrustTags />
        <a href="#formulas" className="hero-cta">
          Find your dog&apos;s formula ↓
        </a>
      </div>
    </section>
  );
}

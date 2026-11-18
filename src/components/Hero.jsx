import TrustTags from "./TrustTags.jsx";

// Words on a clean light background, then the three bottles as a full-width
// banner directly underneath (wide image on desktop, closer crop on phones).
export default function Hero({ content }) {
  return (
    <>
      <section className="hero hero-v2">
        <div className="hero-v2-text">
          <h1 className="hero-title">{content.hero_title || "A formula for every dog."}</h1>
          <h2 className="hero-title-2">
            {content.hero_title_2 || "Dog shampoo made for Indian hard water, with Niacinamide in every bottle."}
          </h2>
          <p className="hero-subtitle">
            {content.hero_subtitle || "Pure care for precious paws — finally formulated for India."}
          </p>
          <TrustTags />
          <a href="#formulas" className="hero-btn">
            Find your dog&apos;s formula
          </a>
        </div>
      </section>
      <div className="hero-stage">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/novi-range-banner-mobile.webp" width="900" height="809" />
          <img
            src="/images/novi-range-banner.webp"
            width="1944"
            height="809"
            alt="NOVI dog shampoo range: Tick & Flea Defence, Neem & Oats Everyday and Puppy & Sensitive"
            className="hero-stage-img"
            fetchPriority="high"
          />
        </picture>
      </div>
    </>
  );
}

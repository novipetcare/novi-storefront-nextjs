import Image from "next/image";
import TrustTags from "./TrustTags.jsx";

// Two-column hero: words on the left, the three bottles on the right.
export default function Hero({ content }) {
  return (
    <section className="hero hero-v2">
      <div className="hero-v2-grid">
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
        <div className="hero-v2-art">
          <span className="hero-v2-pool" aria-hidden="true" />
          <Image
            src="/images/novi-range-banner-mobile.webp"
            width={900}
            height={809}
            priority
            sizes="(max-width: 860px) 92vw, 520px"
            alt="NOVI dog shampoo range: Tick & Flea Defence, Neem & Oats Everyday and Puppy & Sensitive"
            className="hero-v2-img"
          />
        </div>
      </div>
    </section>
  );
}

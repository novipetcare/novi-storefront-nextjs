// One banner showing the three-product range, directly under the hero so a
// visitor sees at a glance that NOVI sells dog shampoo.
// Desktop: full-width wide image. Mobile: a tighter crop on the three bottles.
export default function RangeBanner() {
  return (
    <section className="range-banner">
      <picture>
        <source media="(max-width: 700px)" srcSet="/images/novi-range-banner-mobile.webp" width="900" height="809" />
        <img
          src="/images/novi-range-banner.webp"
          width="1944"
          height="809"
          alt="NOVI dog shampoo range: Tick & Flea Defence, Neem & Oats Everyday and Puppy & Sensitive"
          className="range-banner-img"
          fetchPriority="high"
        />
      </picture>
    </section>
  );
}

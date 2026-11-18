// Curated customer reviews, shown as tiles (3 per row on desktop).
// Renders nothing when there are no reviews, so the section stays hidden
// until reviews have been added in the admin panel.
function Stars({ rating }) {
  const n = Math.max(1, Math.min(5, Number(rating) || 5));
  return (
    <span className="review-stars" role="img" aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      <span className="review-stars-off">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function ReviewTiles({ reviews, title, subtitle }) {
  if (!reviews || reviews.length === 0) return null;
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">{title}</h2>
      {subtitle ? <p className="reviews-subtitle">{subtitle}</p> : null}
      <div className="review-grid">
        {reviews.map((r) => (
          <figure className="review-tile" key={r.id}>
            <Stars rating={r.rating} />
            <blockquote className="review-text">“{r.review_text}”</blockquote>
            <figcaption className="review-by">
              <strong>{r.reviewer_name}</strong>
              {r.dog_name || r.dog_breed ? (
                <span> · {[r.dog_name, r.dog_breed].filter(Boolean).join(", ")}</span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

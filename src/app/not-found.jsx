import Link from "next/link";

export const metadata = {
  title: "Page not found — NOVI",
};

export default function NotFound() {
  return (
    <main className="maintenance-page">
      <span className="maintenance-icon" aria-hidden="true">
        🐾
      </span>
      <h1>We couldn't find that page</h1>
      <p>The page you're looking for may have moved or no longer exists.</p>
      <Link href="/" className="checkout-btn" style={{ display: "inline-block", textDecoration: "none", marginTop: "1rem" }}>
        Back to the store
      </Link>
    </main>
  );
}

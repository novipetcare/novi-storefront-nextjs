import Link from "next/link";

export default async function OrderSuccessPage({ params }) {
  const { id } = await params;
  return (
    <main className="order-success">
      <span className="success-icon" aria-hidden="true">
        🐾
      </span>
      <h1>Order received!</h1>
      <p>Order #{id} has been recorded. We&apos;ll be in touch with confirmation shortly.</p>
      <Link href="/" className="checkout-btn" style={{ display: "inline-block", textDecoration: "none" }}>
        Continue shopping
      </Link>
    </main>
  );
}

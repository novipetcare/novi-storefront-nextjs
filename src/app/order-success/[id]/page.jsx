import Link from "next/link";

export default function OrderSuccessPage() {
  // The order number is deliberately not shown to the customer.
  return (
    <main className="order-success">
      <span className="success-icon" aria-hidden="true">
        🐾
      </span>
      <h1>Order received!</h1>
      <p>Thank you! Your order has been received. We&apos;ll be in touch with confirmation shortly.</p>
      <Link href="/" className="checkout-btn" style={{ display: "inline-block", textDecoration: "none" }}>
        Continue shopping
      </Link>
    </main>
  );
}

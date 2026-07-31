"use client";

import "./globals.css";

// Next.js requires this exact file (global-error.jsx) to catch errors
// that happen in the ROOT layout itself. Must render its own
// <html>/<body> since it replaces the entire root layout when active.
export default function GlobalError({ error, reset }) {
  // Logged for our own debugging, but customers see a calm, on-brand
  // message instead of a stack trace.
  if (typeof console !== "undefined") {
    console.error("[NOVI storefront] Root layout error:", error?.message);
  }

  return (
    <html>
      <body>
        <main className="maintenance-page">
          <span className="maintenance-icon" aria-hidden="true">
            🐾
          </span>
          <h1>Site under maintenance</h1>
          <p>We're preparing something huge. Please check back in a few minutes.</p>
          <button className="checkout-btn" onClick={() => reset()} style={{ marginTop: "1rem" }}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

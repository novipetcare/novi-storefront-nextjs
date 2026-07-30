"use client";

// Next.js requires this exact file (global-error.jsx) to catch errors
// that happen in the ROOT layout itself — our earlier try/catch in
// page.jsx couldn't reach these, since a layout error happens "above"
// the page. This must render its own <html>/<body> since it replaces
// the entire root layout when active.
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ padding: "2rem", fontFamily: "monospace" }}>
        <h1>Root layout error</h1>
        <p>{error?.message}</p>
        <pre>{error?.stack}</pre>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

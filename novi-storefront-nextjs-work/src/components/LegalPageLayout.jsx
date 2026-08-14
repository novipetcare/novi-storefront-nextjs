export default function LegalPageLayout({ title, children }) {
  return (
    <main className="legal-page">
      <h1>{title}</h1>
      <div className="legal-content">{children}</div>
    </main>
  );
}

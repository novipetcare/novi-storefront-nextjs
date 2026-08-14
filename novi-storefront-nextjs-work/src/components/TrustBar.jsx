const TRUST_ITEMS = [
  { icon: "✓", label: "Sulphate & Paraben Free" },
  { icon: "⚖", label: "pH Calibrated for Dogs" },
  { icon: "🐇", label: "Cruelty Free" },
  { icon: "🇮🇳", label: "India-Specific Formula" },
  { icon: "❤", label: "Made with Love in India" },
];

export default function TrustBar() {
  return (
    <section className="trust-bar">
      {TRUST_ITEMS.map((item) => (
        <div className="trust-item" key={item.label}>
          <span className="trust-item-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}

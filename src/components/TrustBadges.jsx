// Credibility badges shown under the product cards. Only badges we can back
// up are enabled. To switch one on or off, change `enabled` (ask Claude).
const P = {
  width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
};

const BADGES = [
  {
    enabled: true,
    title: "100% Secure Payments",
    text: "Encrypted checkout (UPI, cards, net banking)",
    icon: (
      <svg {...P}>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
        <path d="M12 14.8v2" />
      </svg>
    ),
  },
  {
    enabled: true,
    title: "DPIIT-recognised startup",
    text: "Recognised under Startup India",
    icon: (
      <svg {...P}>
        <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" />
      </svg>
    ),
  },
  {
    enabled: true,
    title: "Every ingredient listed",
    text: "Full ingredient list on every bottle",
    icon: (
      <svg {...P}>
        <path d="M7 3.5h8l3 3V20.5H7z" />
        <path d="M10 10h5M10 13.5h5M10 17h3" />
      </svg>
    ),
  },
  {
    // OFF until JP shares written confirmation from the reviewing vet.
    enabled: false,
    title: "Reviewed by a veterinarian",
    text: "Our formulas were reviewed by a vet",
    icon: (
      <svg {...P}>
        <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
        <path d="M12 9.5v5M9.5 12h5" />
      </svg>
    ),
  },
];

export default function TrustBadges() {
  const items = BADGES.filter((b) => b.enabled);
  if (items.length === 0) return null;
  return (
    <section className="trust-badges" aria-label="Why shop with NOVI">
      {items.map((b) => (
        <div className="trust-badge" key={b.title}>
          <span className="trust-badge-icon">{b.icon}</span>
          <div>
            <strong>{b.title}</strong>
            <span>{b.text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

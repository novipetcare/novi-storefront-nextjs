import CrueltyFreeIcon from "./CrueltyFreeIcon.jsx";

const PETA_URL = "https://crueltyfree.peta.org/company/novi/";

const TRUST_ITEMS = [
  { icon: "✓", label: "Sulphate & Paraben Free" },
  { icon: "⚖", label: "pH Calibrated for Dogs" },
  { icon: <CrueltyFreeIcon size={22} />, label: "Cruelty Free", peta: true },
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
          <span>
            {item.label}
            {item.peta ? (
              <>
                {" "}
                <a className="trust-peta-link" href={PETA_URL} target="_blank" rel="noopener noreferrer">
                  · PETA-listed
                </a>
              </>
            ) : null}
          </span>
        </div>
      ))}
    </section>
  );
}

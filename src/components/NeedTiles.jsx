import Link from "next/link";

// "What does bath day look like at your place?": six situations an owner recognises, each linking
// to the right product. Wording stays on cleaning, coat feel, fragrance and
// ease of use (no treatment or tick/flea efficacy claims).
// Product ids: 1 = F01 Tick & Flea Defence, 2 = F02 Neem & Oat Everyday, 3 = F03 Puppy & Sensitive.
const P = {
  width: 44, height: 44, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
};

const NEEDS = [
  {
    color: "#f2a31b",
    title: "My dog lives outdoors",
    text: "Deep cleans after muddy walks and garden play.",
    href: "/product/1",
    icon: (<svg {...P}><path d="M3 20h18" /><path d="M7 20c0-6 2-9 5-13 3 4 5 7 5 13" /><path d="M12 11v9" /></svg>),
  },
  {
    color: "#a9d8e0",
    title: "Regular bath routine",
    text: "Gentle enough for every bath, no heavy perfume.",
    href: "/product/2",
    icon: (<svg {...P}><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2z" /><path d="M7 12V7a2 2 0 0 1 4 0" /><path d="M7 21l-1 1M17 21l1 1" /></svg>),
  },
  {
    color: "#f6c6d3",
    title: "I have a puppy",
    text: "Fragrance-free and made for puppy coats.",
    href: "/product/3",
    icon: (<svg {...P}><circle cx="12" cy="14" r="5" /><path d="M7.5 10.5C5.5 9 4.5 6.5 5.5 5c1.5-.3 3 1.2 3.5 3M16.5 10.5c2-1.5 3-4 2-5.5-1.5-.3-3 1.2-3.5 3" /><path d="M10 13.5h.01M14 13.5h.01M11 16c.6.5 1.4.5 2 0" /></svg>),
  },
  {
    color: "#bfe3cc",
    title: "Fragrance-sensitive home",
    text: "No added fragrance, no strong smell left behind.",
    href: "/product/3",
    icon: (<svg {...P}><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="4" /><path d="M5 5l14 14" /></svg>),
  },
  {
    color: "#d9cdf0",
    title: "Thick or double coat",
    text: "Spreads easily and rinses out fully.",
    href: "/product/2",
    icon: (<svg {...P}><path d="M4 8c3-3 5 3 8 0s5 3 8 0M4 13c3-3 5 3 8 0s5 3 8 0M4 18c3-3 5 3 8 0s5 3 8 0" /></svg>),
  },
  {
    color: "#f9d3b4",
    title: "Hard-to-brush coat",
    text: "A softer coat that's easier to brush after drying.",
    href: "/product/2",
    icon: (<svg {...P}><path d="M5 9h14v3H5z" /><path d="M7 12v4M10 12v4M13 12v4M16 12v4" /><path d="M12 9V5" /></svg>),
  },
];

export default function NeedTiles() {
  return (
    <section className="need-tiles" id="needs">
      <h2 className="need-tiles-title">What does bath day look like at your place?</h2>
      <p className="need-tiles-sub">Pick the one that sounds like your dog and we'll point you to the right shampoo.</p>
      <div className="need-grid">
        {NEEDS.map((n) => (
          <Link href={n.href} className="need-tile" key={n.title} style={{ background: n.color }}>
            <span className="need-icon">{n.icon}</span>
            <strong>{n.title}</strong>
            <span className="need-text">{n.text}</span>
            <span className="need-go">See shampoo →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

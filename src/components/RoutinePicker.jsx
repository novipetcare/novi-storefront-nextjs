"use client";

// Option B: a 3-tap picker that recommends a shampoo and a 4-step routine.
// Mapping follows the locked selector: puppy or fragrance-free -> F03,
// outdoor -> F01, otherwise F02. Product ids: 1 = F01, 2 = F02, 3 = F03.
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../lib/CartContext.jsx";

const Q = [
  { key: "who", q: "Who are we bathing?", opts: [["outdoor", "An outdoor dog"], ["indoor", "An indoor dog"], ["puppy", "A puppy"]] },
  { key: "coat", q: "What's the coat like?", opts: [["short", "Short"], ["thick", "Thick or double"], ["long", "Long or fluffy"]] },
  { key: "scent", q: "Fragrance preference?", opts: [["mild", "Mild is fine"], ["none", "No added fragrance"]] },
];

const COAT_TIP = {
  short: "A small amount goes a long way. Massage it in and rinse well.",
  thick: "Work the shampoo through in sections so it reaches the whole coat, then rinse until the water runs clear.",
  long: "Brush out tangles before wetting, and rinse thoroughly so the coat dries soft and easy to comb.",
};

function pick(a) {
  if (a.who === "puppy" || a.scent === "none") return 3;
  if (a.who === "outdoor") return 1;
  return 2;
}

export default function RoutinePicker({ products }) {
  const { addItem } = useCart();
  const [a, setA] = useState({});
  const [added, setAdded] = useState(false);
  const done = Q.every((x) => a[x.key]);
  const product = done ? products.find((p) => p.id === pick(a)) : null;

  return (
    <section className="routine-picker">
      <h2 className="need-tiles-title">Build your dog's bath routine</h2>
      <p className="need-tiles-sub">Three quick taps and we'll recommend the shampoo and the steps.</p>
      <div className="picker-card">
        {Q.map((x, i) => (
          <div className="picker-q" key={x.key}>
            <strong>{i + 1}. {x.q}</strong>
            <div className="picker-opts">
              {x.opts.map(([v, label]) => (
                <button
                  type="button"
                  key={v}
                  className={`picker-opt ${a[x.key] === v ? "on" : ""}`}
                  onClick={() => { setA({ ...a, [x.key]: v }); setAdded(false); }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
        {done && product && (
          <div className="picker-result">
            <h3>Your routine</h3>
            <p className="picker-pick">
              Your shampoo: <strong>{product.name}</strong> — ₹{(product.price / 100).toFixed(0)}
            </p>
            <ol className="picker-steps">
              <li>Brush out tangles and loose hair.</li>
              <li>Wet the coat fully and lather in the shampoo.</li>
              <li>Rinse until the water runs clear.</li>
              <li>Towel dry and brush through.</li>
            </ol>
            <p className="picker-tip">Tip for this coat: {COAT_TIP[a.coat]}</p>
            <p className="picker-tip">How often: as your vet advises.</p>
            <div className="picker-actions">
              <button
                type="button"
                className="add-to-cart-btn primary"
                onClick={() => { addItem(product, 1); setAdded(true); }}
              >
                {added ? "Added ✓" : "Add to cart"}
              </button>
              <Link href={`/product/${product.id}`} className="picker-link">See this shampoo →</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is NOVI safe for puppies?",
    a: "Yes — our Gentle formula (F03) is specifically made for puppies and sensitive skin, with no harsh actives and a tear-free formula.",
  },
  {
    q: "How often should I use NOVI shampoo?",
    a: "For everyday use, once every 2–3 weeks is typical for most Indian coats. For tick & flea defence, follow the guidance on the product label based on your region's season.",
  },
  {
    q: "Are the ingredients natural?",
    a: "Yes — our formulas are built around Neem, Oat, Aloe Vera, and other India-relevant natural ingredients, without sulphates or parabens.",
  },
  {
    q: "What if my dog has a reaction?",
    a: "Discontinue use and consult your vet. We recommend a small patch test before the first full wash if your dog has known sensitivities.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section">
      <div className="section-heading">
        <span className="eyebrow">Questions</span>
        <h2>Good to know.</h2>
      </div>

      <div className="faq-list">
        {FAQS.map((item, i) => (
          <div className="faq-item" key={item.q}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              {item.q}
              <span className="faq-toggle">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && <p className="faq-answer">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { FAQS } from "../lib/faqData.js";

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

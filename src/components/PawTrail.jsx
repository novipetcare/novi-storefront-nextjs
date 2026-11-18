"use client";

// A trail of paw prints walking across the page between sections. They start
// muddy, turn half-clean, then end foamy and clean as the page reaches the
// shampoos. Purely decorative (illustration only, no claim). The prints
// appear one after another as the strip scrolls into view.
import { useEffect, useRef, useState } from "react";

// Nine prints in a gentle, slightly sloping walk: left and right feet alternate.
const POS = Array.from({ length: 9 }, (_, i) => ({
  x: 6 + i * 11.5,
  y: 50 + (i % 2 ? 13 : -13) + (i - 4) * 2.2,
  r: 90 + (i % 2 ? 7 : -7),
}));

function Paw() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <ellipse cx="16" cy="21" rx="7.5" ry="6.2" />
      <ellipse cx="6.5" cy="13.5" rx="3" ry="4" transform="rotate(-22 6.5 13.5)" />
      <ellipse cx="12.5" cy="7.8" rx="3" ry="4.3" />
      <ellipse cx="19.5" cy="7.8" rx="3" ry="4.3" />
      <ellipse cx="25.5" cy="13.5" rx="3" ry="4" transform="rotate(22 25.5 13.5)" />
    </svg>
  );
}

export default function PawTrail({ variant = "mud" }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false); // JS ready: hide, then reveal
  const [walk, setWalk] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setWalk(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setWalk(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`paw-trail paw-${variant} ${armed ? "armed" : ""} ${walk ? "walk" : ""}`}
      aria-hidden="true"
    >
      {POS.map((p, i) => {
        const tone = variant === "mixed" ? (i < 5 ? "mud" : "clean") : variant;
        return (
          <span
            key={i}
            className={`paw paw-tone-${tone}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, "--rot": `${p.r}deg`, "--i": i }}
          >
            <Paw />
            {tone === "clean" ? <i className="bubble b1" /> : null}
            {tone === "clean" ? <i className="bubble b2" /> : null}
          </span>
        );
      })}
    </div>
  );
}

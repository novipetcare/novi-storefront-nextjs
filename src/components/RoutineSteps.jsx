// Option A: a simple 4-step bath routine strip (no interaction).
const P = {
  width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
};
const STEPS = [
  { n: 1, title: "Brush", text: "Brush out tangles and loose hair before the bath.",
    icon: <svg {...P}><path d="M5 9h14v3H5z" /><path d="M7 12v4M10 12v4M13 12v4M16 12v4" /><path d="M12 9V5" /></svg> },
  { n: 2, title: "Wet & lather", text: "Wet the coat fully, then work the shampoo in, section by section.",
    icon: <svg {...P}><path d="M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10z" /><path d="M9 14.5h6" /></svg> },
  { n: 3, title: "Rinse well", text: "Rinse until the water runs clear, so no residue is left.",
    icon: <svg {...P}><path d="M4 8c3-3 5 3 8 0s5 3 8 0M4 13c3-3 5 3 8 0s5 3 8 0M4 18c3-3 5 3 8 0s5 3 8 0" /></svg> },
  { n: 4, title: "Dry & brush", text: "Towel dry, then brush through while the coat is still damp.",
    icon: <svg {...P}><path d="M4 14h16v5H4z" /><path d="M7 14V9a5 5 0 0 1 10 0v5" /></svg> },
];

export default function RoutineSteps() {
  return (
    <section className="routine-steps">
      <h2 className="need-tiles-title">The NOVI bath routine</h2>
      <p className="need-tiles-sub">Four simple steps for a clean, comfortable bath at home.</p>
      <ol className="routine-grid">
        {STEPS.map((s) => (
          <li className="routine-step" key={s.n}>
            <span className="need-icon">{s.icon}</span>
            <span className="routine-num">Step {s.n}</span>
            <strong>{s.title}</strong>
            <span className="need-text">{s.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

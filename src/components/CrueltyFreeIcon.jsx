// One cruelty-free icon used everywhere on the site (hero tags and trust bar),
// so the symbol is identical in both places. Our own line drawing of a rabbit
// with a small heart; it is not PETA's logo.
export default function CrueltyFreeIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.2 9.2C7.6 6.6 7.4 2.8 9 2.6c1.6-.2 2.1 3.2 2.1 6.1" />
      <path d="M14.8 9.2c1.6-2.6 1.8-6.4.2-6.6-1.6-.2-2.1 3.2-2.1 6.1" />
      <ellipse cx="12" cy="13.2" rx="5.4" ry="4.6" />
      <path d="M10 12.3h.01M14 12.3h.01" strokeWidth="2.1" />
      <path d="M11.2 14.2h1.6M12 14.2v.9" />
      <path d="M12 21.2c-2.6-1.6-3.9-2.9-3.9-4.2a1.9 1.9 0 0 1 3.9-.4 1.9 1.9 0 0 1 3.9.4c0 1.3-1.3 2.6-3.9 4.2z" strokeWidth="1.3" />
    </svg>
  );
}

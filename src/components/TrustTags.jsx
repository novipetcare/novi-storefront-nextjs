// Five brand promises shown as icon pills under the hero headline.
// Icons are simple inline SVG line drawings (no image files to load).
import CrueltyFreeIcon from "./CrueltyFreeIcon.jsx";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const TAGS = [
  {
    label: "Sulphate-Free",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="9" cy="14" r="4.5" />
        <circle cx="16.5" cy="9.5" r="3" />
        <circle cx="16" cy="17" r="1.6" />
        <path d="M4 4l16 16" />
      </svg>
    ),
  },
  {
    label: "Paraben-Free",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M8.5 12l2.5 2.5L15.5 9.5" />
      </svg>
    ),
  },
  {
    label: "pH Balanced",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10z" />
        <path d="M9 14.5h6" />
      </svg>
    ),
  },
  {
    label: "Cruelty-Free",
    icon: <CrueltyFreeIcon />,
  },
  {
    label: "Made in India",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
        <circle cx="12" cy="10" r="2.3" />
      </svg>
    ),
  },
];

export default function TrustTags() {
  return (
    <ul className="trust-tags">
      {TAGS.map((tag) => (
        <li key={tag.label} className="trust-tag">
          <span className="trust-tag-icon">{tag.icon}</span>
          <span className="trust-tag-label">{tag.label}</span>
        </li>
      ))}
    </ul>
  );
}

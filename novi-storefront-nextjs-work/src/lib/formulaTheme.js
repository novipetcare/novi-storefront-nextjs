const THEMES = [
  { keywords: ["tick", "flea", "defence", "defense"], icon: "🛡️", label: "Defence" },
  { keywords: ["everyday", "neem", "oat"], icon: "🌿", label: "Everyday" },
  { keywords: ["puppy", "sensitive", "gentle"], icon: "🤍", label: "Gentle" },
];
const FALLBACK_ICON = "🐾";

export function getFormulaTheme(productName = "") {
  const lower = productName.toLowerCase();
  const match = THEMES.find((t) => t.keywords.some((k) => lower.includes(k)));
  return match || { icon: FALLBACK_ICON, label: "" };
}

export function getFormulaCode(index) {
  return `F${String(index + 1).padStart(2, "0")}`;
}

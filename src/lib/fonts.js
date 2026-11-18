import { Young_Serif, Figtree } from "next/font/google";

// Headings: Young Serif (warm, sturdy). Body: Figtree (friendly, clear).
// Variable names stay --font-display / --font-body so the CSS keeps working.
export const fraunces = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

import { Fraunces, Inter } from "next/font/google";

// Self-hosts these fonts on your own domain at build time, instead of
// fetching them from Google's servers as a separate render-blocking
// request — this is what was causing the "render-blocking requests"
// warning in PageSpeed. The variable names match exactly what
// globals.css already expects (--font-display, --font-body), so no
// other CSS changes are needed.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

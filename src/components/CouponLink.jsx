"use client";
import { useEffect, useState } from "react";

// Affiliate / coupon links: https://novipets.in/?coupon=ROVER10 (works on any page).
// The code is remembered for 7 days and applied automatically at checkout. The server still
// validates it (dates, % and influencer) when the customer checks out, so a made-up or expired code just fails.
export const COUPON_KEY = "novi_coupon";
const CODE_RE = /^[A-Z0-9]{4,20}$/;
const KEEP_MS = 7 * 24 * 60 * 60 * 1000;

export function readSavedCoupon() {
  try {
    const v = JSON.parse(window.localStorage.getItem(COUPON_KEY) || "null");
    if (v && CODE_RE.test(v.code) && Date.now() - v.ts < KEEP_MS) return v.code;
  } catch {}
  return null;
}

export default function CouponLink() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const raw = (p.get("coupon") || p.get("code") || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!CODE_RE.test(raw)) return;
    try {
      window.localStorage.setItem(COUPON_KEY, JSON.stringify({ code: raw, ts: Date.now() }));
    } catch {}
    setCode(raw);
    const t = setTimeout(() => setCode(null), 7000);
    return () => clearTimeout(t);
  }, []);

  if (!code) return null;
  return (
    <div className="coupon-toast" role="status">
      Code <strong>{code}</strong> will be applied at checkout.
    </div>
  );
}

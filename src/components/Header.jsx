"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../lib/CartContext.jsx";

export default function Header() {
  const { totalItems, setDrawerOpen } = useCart();

  return (
    <header className="site-header">
      <Link href="/" className="logo-mark" aria-label="NOVI home">
        <Image src="/logo.png" alt="" width={34} height={34} className="logo-icon" priority />
        <span className="logo-text">NOVI</span>
      </Link>
      <button className="cart-toggle" onClick={() => setDrawerOpen(true)} aria-label="Open cart">
        <CartIcon />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </button>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

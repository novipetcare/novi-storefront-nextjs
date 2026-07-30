"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../../lib/CartContext.jsx";
import { getFormulaTheme } from "../../../lib/formulaTheme.js";
import { hasDiscount, getDiscountPercent } from "../../../lib/pricing.js";

export default function ProductDetailClient({ product }) {
  const { addItem, setDrawerOpen } = useCart();
  const [qty, setQty] = useState(1);
  const theme = getFormulaTheme(product.name);
  const showDiscount = hasDiscount(product);

  function handleAdd() {
    addItem(product, qty);
    setDrawerOpen(true);
  }

  return (
    <div className="product-detail-grid">
      <Link href="/" className="back-link">
        ← Back to store
      </Link>

      <div className="product-detail-image">
        {product.images?.[0] ? (
          <Image src={product.images[0]} alt={product.name} width={600} height={540} priority />
        ) : (
          <div className="placeholder-bottle large" aria-hidden="true">
            <span>{theme.icon}</span>
          </div>
        )}
      </div>

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-desc">{product.description}</p>

        {product.highlights?.length > 0 && (
          <div className="ingredient-tags">
            {product.highlights.map((h) => (
              <span key={h} className="ingredient-tag">
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="qty-row">
          <span>Quantity</span>
          <div className="qty-stepper">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </button>
          </div>
        </div>

        <div className="product-detail-footer">
          <div className="price-block">
            {showDiscount && <span className="mrp-strike large">₹{((product.mrp * qty) / 100).toFixed(0)}</span>}
            <span className="formula-price large">₹{((product.price * qty) / 100).toFixed(0)}</span>
            {showDiscount && <span className="discount-badge">{getDiscountPercent(product)}% off</span>}
          </div>
          <button className="add-to-cart-btn primary" onClick={handleAdd} disabled={product.stock <= 0}>
            {product.stock <= 0 ? "Out of stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

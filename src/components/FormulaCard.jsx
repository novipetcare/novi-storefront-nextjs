"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../lib/CartContext.jsx";
import { getFormulaTheme, getFormulaCode } from "../lib/formulaTheme.js";
import { hasDiscount, getDiscountPercent } from "../lib/pricing.js";

export default function FormulaCard({ product, index }) {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const theme = getFormulaTheme(product.name);
  const showDiscount = hasDiscount(product);
  // Reflects the REAL cart state, not just a temporary flash — so the
  // button stays "Added" for as long as the item genuinely is in the
  // cart, removing any confusion about whether it actually got added.
  const inCart = items.some((i) => i.id === product.id);

  function handleAddToCart(e) {
    e.preventDefault(); // don't navigate when clicking the button inside the link
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className="formula-card">
      <Link href={`/product/${product.id}`} className="formula-card-link">
        <div className="formula-card-image">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.name} width={400} height={360} />
          ) : (
            <div className="placeholder-bottle" aria-hidden="true">
              <span>{theme.icon}</span>
            </div>
          )}
        </div>

        <div className="formula-card-body">
          <div className="formula-code-row">
            <span className="formula-code">
              {getFormulaCode(index)} — {theme.label || "Care"}
            </span>
            <span className="formula-icon" aria-hidden="true">
              {theme.icon}
            </span>
          </div>

          <h3>{product.name}</h3>
          <p className="formula-desc">{product.description}</p>

          {product.highlights?.length > 0 && (
            <div className="ingredient-tags">
              {product.highlights.slice(0, 3).map((h) => (
                <span key={h} className="ingredient-tag">
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="formula-card-footer">
        <div className="price-block">
          {showDiscount && <span className="mrp-strike">₹{(product.mrp / 100).toFixed(0)}</span>}
          <span className="formula-price">₹{(product.price / 100).toFixed(0)}</span>
          {showDiscount && <span className="discount-badge">{getDiscountPercent(product)}% off</span>}
        </div>
        <button
          className={`add-to-cart-btn ${justAdded || inCart ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Out of stock" : inCart ? "Added ✓ (add more)" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

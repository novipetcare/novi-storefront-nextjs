"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../lib/CartContext.jsx";
import { getFormulaTheme, getFormulaCode } from "../lib/formulaTheme.js";
import { hasDiscount, getDiscountPercent } from "../lib/pricing.js";
import { optimizedImageUrl } from "../lib/cloudinaryUrl.js";

export default function FormulaCard({ product, index }) {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const theme = getFormulaTheme(product.name);
  const showDiscount = hasDiscount(product);
  // Reflects the REAL cart state, not just a temporary flash — so the
  // button stays "Added" for as long as the item genuinely is in the
  // cart, removing any confusion about whether it actually got added.
  const inCart = items.some((i) => i.id === product.id);

  // Photo slider: on hover (desktop) the photos slide by themselves; on touch
  // screens people swipe. Cards with a single photo get a gentle zoom instead.
  const images = product.images || [];
  const trackRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [slide, setSlide] = useState(0);

  function goTo(i) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!hovering) {
      goTo(0);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % images.length;
      goTo(i);
    }, 1100);
    return () => clearInterval(timer);
  }, [hovering, images.length]);

  function handleScroll(e) {
    const el = e.currentTarget;
    setSlide(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
  }

  function handleAddToCart(e) {
    e.preventDefault(); // don't navigate when clicking the button inside the link
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className="formula-card" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <Link href={`/product/${product.id}`} className="formula-card-link">
        <div className={`formula-card-image ${images.length > 1 ? "has-slides" : ""}`}>
          {images.length > 0 ? (
            <>
              <div className="slide-track" ref={trackRef} onScroll={handleScroll}>
                {images.map((src, n) => (
                  <div className="slide" key={src + n}>
                    <Image
                      src={optimizedImageUrl(src, 400)}
                      alt={n === 0 ? product.name : `${product.name} - photo ${n + 1}`}
                      width={400}
                      height={360}
                      priority={index === 0 && n === 0}
                    />
                  </div>
                ))}
              </div>
              {images.length > 1 && (
                <div className="slide-dots" aria-hidden="true">
                  {images.map((_, n) => (
                    <span key={n} className={n === slide ? "dot active" : "dot"} />
                  ))}
                </div>
              )}
            </>
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

          {theme.label && <span className="formula-kind">Dog shampoo</span>}
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

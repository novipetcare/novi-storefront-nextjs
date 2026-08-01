"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../../lib/CartContext.jsx";
import { getFormulaTheme } from "../../../lib/formulaTheme.js";
import { hasDiscount, getDiscountPercent } from "../../../lib/pricing.js";

export default function ProductDetailClient({ product }) {
  const { addItem, setDrawerOpen, items } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const theme = getFormulaTheme(product.name);
  const showDiscount = hasDiscount(product);
  const inCart = items.some((i) => i.id === product.id);
  const images = product.images?.length > 0 ? product.images : [];

  function handleAdd() {
    addItem(product, qty);
    setDrawerOpen(true);
  }

  return (
    <div className="product-detail-grid">
      <Link href="/" className="back-link">
        ← Back to store
      </Link>

      <div className="product-gallery">
        <div className="product-detail-image">
          {images.length > 0 ? (
            <Image
              key={activeImageIndex}
              src={images[activeImageIndex]}
              alt={`${product.name} — image ${activeImageIndex + 1}`}
              width={600}
              height={540}
              priority
            />
          ) : (
            <div className="placeholder-bottle large" aria-hidden="true">
              <span>{theme.icon}</span>
            </div>
          )}
        </div>

        {/* Thumbnail strip — only shown when there's more than one image,
            matching the standard ecommerce pattern (Amazon/Nykaa-style):
            main image up top, clickable thumbnails to switch it. */}
        {images.length > 1 && (
          <div className="thumbnail-strip" role="tablist" aria-label="Product images">
            {images.map((img, i) => (
              <button
                key={img + i}
                className={`thumbnail-btn ${i === activeImageIndex ? "active" : ""}`}
                onClick={() => setActiveImageIndex(i)}
                role="tab"
                aria-selected={i === activeImageIndex}
                aria-label={`Show image ${i + 1}`}
              >
                <Image src={img} alt="" width={70} height={70} />
              </button>
            ))}
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
            <button
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              disabled={qty >= product.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {qty >= product.stock && product.stock > 0 && (
            <span className="hint-text">Only {product.stock} left in stock</span>
          )}
        </div>

        <div className="product-detail-footer">
          <div className="price-block">
            {showDiscount && <span className="mrp-strike large">₹{((product.mrp * qty) / 100).toFixed(0)}</span>}
            <span className="formula-price large">₹{((product.price * qty) / 100).toFixed(0)}</span>
            {showDiscount && <span className="discount-badge">{getDiscountPercent(product)}% off</span>}
          </div>
          <button
            className={`add-to-cart-btn primary ${inCart ? "added" : ""}`}
            onClick={handleAdd}
            disabled={product.stock <= 0}
          >
            {product.stock <= 0 ? "Out of stock" : inCart ? "Added ✓ (add more)" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

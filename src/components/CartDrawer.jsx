"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../lib/CartContext.jsx";
import { optimizedImageUrl } from "../lib/cloudinaryUrl.js";

export default function CartDrawer() {
  const { items, updateQty, removeItem, totalAmount, isDrawerOpen, setDrawerOpen } = useCart();
  const router = useRouter();

  if (!isDrawerOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setDrawerOpen(false)}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="modal-close" onClick={() => setDrawerOpen(false)} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Find your dog&apos;s formula above.</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    {item.image ? <img src={optimizedImageUrl(item.image, 120)} alt={item.name} loading="lazy" /> : <span aria-hidden="true">🐾</span>}
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">₹{(item.price / 100).toFixed(0)}</span>
                    <div className="qty-stepper small">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        disabled={item.stock != null && item.qty >= item.stock}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    {item.stock != null && item.qty >= item.stock && (
                      <span className="hint-text">Max available: {item.stock}</span>
                    )}
                  </div>
                  <button className="remove-item-btn" onClick={() => removeItem(item.id)} aria-label="Remove item">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>₹{(totalAmount / 100).toFixed(0)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => {
                  setDrawerOpen(false);
                  router.push("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

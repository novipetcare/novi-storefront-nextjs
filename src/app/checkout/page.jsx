"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../lib/CartContext.jsx";
import { clientApi } from "../../lib/clientApi.js";
import { readSavedCoupon } from "../../components/CouponLink.jsx";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customer_name: "",
    customer_address: "",
    customer_city: "",
    customer_state: "",
    customer_pincode: "",
    customer_phone: "",
    customer_email: "",
    pet_name: "",
    pet_breed: "",
    pet_age: "",
  });
  const [pincodeLookup, setPincodeLookup] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null); // { code, discount_percent, discount_amount, total_amount }
  const [couponMsg, setCouponMsg] = useState("");
  const [couponBusy, setCouponBusy] = useState(false);

  // The discount shown here is only a preview. The server recalculates it
  // from its own prices when the order is created, and that is what is charged.
  const payable = coupon ? coupon.total_amount : totalAmount;

  async function checkCoupon(code, silent = false) {
    setCouponBusy(true);
    if (!silent) setCouponMsg("");
    try {
      const r = await clientApi.validateCoupon(code, items);
      setCoupon(r);
      setCouponMsg(silent ? "" : `${r.code} applied: ${r.discount_percent}% off.`);
    } catch (err) {
      setCoupon(null);
      setCouponMsg(err.message);
    } finally {
      setCouponBusy(false);
    }
  }

  // Arrived through a coupon link (?coupon=CODE): apply the saved code once the cart has items.
  const triedSaved = useRef(false);
  useEffect(() => {
    if (triedSaved.current || coupon || items.length === 0) return;
    const saved = readSavedCoupon();
    triedSaved.current = true;
    if (saved) {
      setCouponInput(saved);
      checkCoupon(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Cart changed after a code was applied: re-check it against the new cart.
  useEffect(() => {
    if (coupon) checkCoupon(coupon.code, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePincodeChange(value) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
    updateField("customer_pincode", digitsOnly);

    if (digitsOnly.length !== 6) {
      setPincodeLookup("");
      return;
    }

    setPincodeLookup("loading");
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${digitsOnly}`);
      const data = await res.json();
      const postOffice = data?.[0]?.PostOffice?.[0];
      if (postOffice) {
        setForm((prev) => ({ ...prev, customer_city: postOffice.District, customer_state: postOffice.State }));
        setPincodeLookup("done");
      } else {
        setPincodeLookup("failed");
      }
    } catch {
      setPincodeLookup("failed");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.customer_name.trim() || !form.customer_address.trim()) {
      setError("Name and address are required.");
      return;
    }
    if (!/^\d{6}$/.test(form.customer_pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!form.customer_city.trim() || !form.customer_state.trim()) {
      setError("City and state are required.");
      return;
    }
    if (!form.customer_phone.trim() && !form.customer_email.trim()) {
      setError("Please provide a phone number or email address.");
      return;
    }
    if (typeof window === "undefined" || !window.Razorpay) {
      setError("Payment system failed to load. Please refresh and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const { order_id } = await clientApi.createOrder({
        ...form,
        items: items.map((i) => ({ product_id: i.id, name: i.name, qty: i.qty, price: i.price })),
        total_amount: totalAmount,
        coupon_code: coupon ? coupon.code : undefined,
      });

      const { razorpay_order_id, amount, currency, key_id } = await clientApi.createRazorpayOrder(order_id);

      const razorpay = new window.Razorpay({
        key: key_id,
        order_id: razorpay_order_id,
        amount,
        currency,
        name: "NOVI",
        description: "NOVI dog shampoo",
        prefill: {
          name: form.customer_name,
          email: form.customer_email || undefined,
          contact: form.customer_phone || undefined,
        },
        theme: { color: "#2b4433" },
        handler: async (response) => {
          try {
            await clientApi.verifyPayment({
              order_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            router.push(`/order-success/${order_id}`);
          } catch (err) {
            setError(`Payment could not be verified: ${err.message}. If money was deducted, please contact us.`);
          } finally {
            setSubmitting(false);
          }
        },
        modal: { ondismiss: () => setSubmitting(false) },
      });

      razorpay.on("payment.failed", (response) => {
        setError(`Payment failed: ${response.error.description || "please try again."}`);
        setSubmitting(false);
      });

      razorpay.open();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <p>Your cart is empty.</p>
        <Link href="/">← Back to store</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <Link href="/" className="back-link">
        ← Back to store
      </Link>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <label>
            Full Name *
            <input value={form.customer_name} onChange={(e) => updateField("customer_name", e.target.value)} required />
          </label>

          <label>
            Address (House no., street, locality) *
            <textarea rows={2} value={form.customer_address} onChange={(e) => updateField("customer_address", e.target.value)} required />
          </label>

          <div className="form-row">
            <label>
              Pincode *
              <input
                type="text"
                inputMode="numeric"
                value={form.customer_pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                placeholder="6-digit pincode"
                maxLength={6}
                required
              />
              {pincodeLookup === "loading" && <span className="hint-text">Looking up city/state...</span>}
              {pincodeLookup === "failed" && <span className="hint-text">Couldn&apos;t auto-detect — please fill manually.</span>}
            </label>
            <label>
              City *
              <input value={form.customer_city} onChange={(e) => updateField("customer_city", e.target.value)} required />
            </label>
            <label>
              State *
              <input value={form.customer_state} onChange={(e) => updateField("customer_state", e.target.value)} required />
            </label>
          </div>

          <div className="form-row">
            <label>
              Phone
              <input type="tel" value={form.customer_phone} onChange={(e) => updateField("customer_phone", e.target.value)} placeholder="At least one of phone/email required" />
            </label>
            <label>
              Email
              <input type="email" value={form.customer_email} onChange={(e) => updateField("customer_email", e.target.value)} />
            </label>
          </div>

          <h2 className="section-divider">Your Pet (optional)</h2>
          <div className="form-row">
            <label>
              Pet&apos;s Name
              <input value={form.pet_name} onChange={(e) => updateField("pet_name", e.target.value)} />
            </label>
            <label>
              Breed
              <input value={form.pet_breed} onChange={(e) => updateField("pet_breed", e.target.value)} />
            </label>
            <label>
              Age
              <input value={form.pet_age} onChange={(e) => updateField("pet_age", e.target.value)} />
            </label>
          </div>

          {error && <div className="error-text">{error}</div>}

          <button type="submit" className="checkout-btn" disabled={submitting}>
            {submitting ? "Processing..." : `Pay Now — ₹${(payable / 100).toFixed(0)}`}
          </button>
          <p className="secure-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
              <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
            </svg>
            100% Secure Payments · Encrypted checkout
          </p>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div className="summary-line" key={item.id}>
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{((item.price * item.qty) / 100).toFixed(0)}</span>
            </div>
          ))}
          <div className="coupon-box">
            <label htmlFor="coupon-code">Have a coupon code?</label>
            <div className="coupon-row">
              <input
                id="coupon-code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                placeholder="Enter code"
                maxLength={20}
                autoComplete="off"
              />
              <button type="button" className="coupon-btn" disabled={couponBusy || !couponInput} onClick={() => checkCoupon(couponInput)}>
                {couponBusy ? "Checking..." : "Apply"}
              </button>
            </div>
            {couponMsg && <p className={coupon ? "coupon-ok" : "coupon-err"} role="status">{couponMsg}</p>}
          </div>
          {coupon && (
            <>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{(coupon.subtotal_amount / 100).toFixed(0)}</span>
              </div>
              <div className="summary-line coupon-line">
                <span>Coupon {coupon.code} ({coupon.discount_percent}% off)</span>
                <span>−₹{(coupon.discount_amount / 100).toFixed(0)}</span>
              </div>
            </>
          )}
          <div className="summary-line total">
            <span>Total</span>
            <span>₹{(payable / 100).toFixed(0)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { clientApi } from "../lib/clientApi.js";

const DISMISSED_KEY = "novi_popup_dismissed";
const TIMED_TRIGGER_MS = 20000;

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const hasShown = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    function trigger() {
      if (hasShown.current) return;
      hasShown.current = true;
      setVisible(true);
    }

    function handleMouseLeave(e) {
      if (e.clientY <= 0) trigger();
    }
    document.addEventListener("mouseleave", handleMouseLeave);
    const timer = setTimeout(trigger, TIMED_TRIGGER_MS);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  function handleClose() {
    setVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, "true");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await clientApi.subscribe(email);
      setSubmitted(true);
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch (err) {
      setError(err.message);
    }
  }

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-panel popup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {submitted ? (
          <div className="popup-success">
            <span aria-hidden="true">🐾</span>
            <p>You&apos;re on the list! Check your inbox soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Get our free dog care guide</h2>
            <p>Enter your email and we&apos;ll send you our pet care magazine, free.</p>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            {error && <div className="error-text">{error}</div>}
            <button type="submit" className="checkout-btn">
              Send me the guide
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

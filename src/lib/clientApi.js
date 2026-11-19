// src/lib/clientApi.js
// -----------------------------------------------------------------------
// Browser-only API calls — order creation, payment, email capture. These
// run after a user interacts with the page (add to cart, checkout), so
// unlike src/lib/api.js they don't need to run on the server.
// -----------------------------------------------------------------------
"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://novi-backend.novipetcare.workers.dev";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

function authed(token) {
  return { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
}

export const clientApi = {
  validateCoupon: (code, items) =>
    request("/api/coupons/validate", {
      method: "POST",
      body: JSON.stringify({ code, items: items.map((i) => ({ product_id: i.id, qty: i.qty })) }),
    }),
  partnerLogin: (username, password) =>
    request("/api/influencer/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  partnerChangePassword: (token, current_password, new_password) =>
    request("/api/influencer/change-password", { method: "POST", body: JSON.stringify({ current_password, new_password }), ...authed(token) }),
  partnerDashboard: (token) => request("/api/influencer/dashboard", authed(token)),
  subscribe: (email) => request("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) }),
  createOrder: (order) => request("/api/orders", { method: "POST", body: JSON.stringify(order) }),
  createRazorpayOrder: (order_id) =>
    request("/api/payments/create-order", { method: "POST", body: JSON.stringify({ order_id }) }),
  verifyPayment: (payload) => request("/api/payments/verify", { method: "POST", body: JSON.stringify(payload) }),
};

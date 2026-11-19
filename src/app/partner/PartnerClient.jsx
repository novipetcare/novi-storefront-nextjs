"use client";

import { useState, useEffect, useCallback } from "react";
import { clientApi } from "../../lib/clientApi.js";

const KEY = "novi_partner_token";
const rs = (p) => (p / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const STATUS = { pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled" };
const COUPON_STATE = { live: "Live", upcoming: "Not started yet", expired: "Expired", paused: "Paused" };

function readToken() {
  try { return sessionStorage.getItem(KEY) || ""; } catch { return ""; }
}
function saveToken(t) {
  try { t ? sessionStorage.setItem(KEY, t) : sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}

export default function PartnerClient() {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const [mustChange, setMustChange] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [pw, setPw] = useState({ current: "", next: "" });

  const logout = useCallback(() => { saveToken(""); setToken(""); setData(null); setMustChange(false); }, []);

  const load = useCallback(async (t) => {
    try {
      setData(await clientApi.partnerDashboard(t));
      setError("");
    } catch (err) {
      if (/password first/i.test(err.message)) setMustChange(true);
      else if (/unauthorized/i.test(err.message)) logout();
      else setError(err.message);
    }
  }, [logout]);

  useEffect(() => {
    const t = readToken();
    if (t) { setToken(t); load(t); }
    setReady(true);
  }, [load]);

  // Live numbers: refresh every 30 seconds while the page is open.
  useEffect(() => {
    if (!token || mustChange) return;
    const id = setInterval(() => load(token), 30000);
    return () => clearInterval(id);
  }, [token, mustChange, load]);

  async function login(e) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const r = await clientApi.partnerLogin(form.username.trim(), form.password);
      saveToken(r.token); setToken(r.token); setMustChange(r.must_change_password);
      setForm({ username: "", password: "" });
      if (!r.must_change_password) await load(r.token);
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  async function changePassword(e) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const r = await clientApi.partnerChangePassword(token, pw.current, pw.next);
      saveToken(r.token); setToken(r.token); setMustChange(false); setPw({ current: "", next: "" });
      await load(r.token);
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  if (!ready) return <main className="partner-page" />;

  if (!token) {
    return (
      <main className="partner-page">
        <form className="partner-card" onSubmit={login}>
          <h1>Partner login</h1>
          <p className="partner-muted">See your coupon sales and earnings.</p>
          <label>Username<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} autoComplete="username" required /></label>
          <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="current-password" required /></label>
          {error && <p className="coupon-err" role="alert">{error}</p>}
          <button className="partner-btn" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
        </form>
      </main>
    );
  }

  if (mustChange) {
    return (
      <main className="partner-page">
        <form className="partner-card" onSubmit={changePassword}>
          <h1>Set a new password</h1>
          <p className="partner-muted">Use at least 10 characters with letters and numbers.</p>
          <label>Current (temporary) password<input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} autoComplete="current-password" required /></label>
          <label>New password<input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" required /></label>
          {error && <p className="coupon-err" role="alert">{error}</p>}
          <button className="partner-btn" disabled={busy}>{busy ? "Saving..." : "Save password"}</button>
        </form>
      </main>
    );
  }

  if (!data) return <main className="partner-page"><p className="partner-muted">{error || "Loading..."}</p></main>;

  const s = data.summary;
  return (
    <main className="partner-page partner-wide">
      <div className="partner-head">
        <div>
          <h1>Hi {data.influencer.name}</h1>
          <p className="partner-muted">Your commission: {data.influencer.commission_percent}% {data.influencer.commission_basis === "net" ? "of sales after the discount, excluding GST" : "of the product MRP on every order"}. Updates live.</p>
        </div>
        <button className="partner-link" onClick={logout}>Log out</button>
      </div>

      <div className="partner-stats">
        <div><span>Orders</span><strong>{s.orders}</strong></div>
        <div><span>Sales (excl. GST)</span><strong>₹{rs(s.net_sales_paise)}</strong></div>
        <div><span>Pending earnings</span><strong>₹{rs(s.earnings_pending_paise)}</strong></div>
        <div><span>Confirmed earnings</span><strong>₹{rs(s.earnings_confirmed_paise)}</strong></div>
        <div><span>Paid to you</span><strong>₹{rs(s.paid_out_paise)}</strong></div>
        <div className="partner-highlight"><span>To be paid</span><strong>₹{rs(s.payable_paise)}</strong></div>
      </div>

      <h2>Your coupon codes</h2>
      <ul className="partner-coupons">
        {data.coupons.map((c) => (
          <li key={c.code}><strong>{c.code}</strong> {c.discount_percent}% off · {c.start_date} to {c.end_date} · {COUPON_STATE[c.state]}</li>
        ))}
        {!data.coupons.length && <li className="partner-muted">No codes yet.</li>}
      </ul>

      <h2>Orders</h2>
      <div className="partner-table-wrap">
        <table className="partner-table">
          <thead><tr><th>Date</th><th>No.</th><th>City</th><th>Order total</th><th>Your earning</th><th>Status</th></tr></thead>
          <tbody>
            {data.orders.map((o) => (
              <tr key={o.n}>
                <td>{o.date}</td><td>{o.n}</td><td>{o.city}</td>
                <td>₹{rs(o.order_total_paise)}</td><td>₹{rs(o.commission_paise)}</td><td>{STATUS[o.status]}</td>
              </tr>
            ))}
            {!data.orders.length && <tr><td colSpan="6" className="partner-muted">No orders with your code yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {data.payouts.length > 0 && (
        <>
          <h2>Payments to you</h2>
          <ul className="partner-coupons">
            {data.payouts.map((p, i) => <li key={i}>{p.paid_on} · ₹{rs(p.amount_paise)}{p.reference ? ` · ${p.reference}` : ""}</li>)}
          </ul>
        </>
      )}
    </main>
  );
}

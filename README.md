# NOVI Storefront (Next.js version) — V2.0

An SEO-focused rebuild of the storefront, built as a **completely
separate project** from `novi-storefront` (the original React/Vite
version). Nothing about the backend, admin panel, or shipping module
changes — this talks to the exact same `novi-backend` API.

## Why this exists

Two SEO limitations of the original React SPA:

1. **No server-rendered content** — the original site's initial HTML is
nearly empty; product names, prices, and page text only appear after
JavaScript runs in the browser. Search engines can often still index
this, but less reliably and more slowly than getting fully-formed
content immediately.
2. **No separate URLs for About/Contact/legal pages** — they were
pop-up modals within one single page, so they couldn't be indexed
individually or linked to directly.

This project fixes both: pages are Server Components that fetch real
data at request time (so search engines get fully-rendered HTML), and
every page — including each individual product — has its own real URL.

## What's genuinely new here vs. the original storefront

* `/product/1`, `/product/2`, etc. — each product now has its own page
and its own unique `<title>`/description for search results
* `/about`, `/contact`, `/terms-and-conditions`, `/privacy-policy`,
`/shipping-policy`, `/payment-refund-policy` — real, separate,
indexable pages instead of modals
* Every page has proper metadata (`title`, `description`, Open Graph
tags) — visible to search engines and link previews (e.g. when
someone shares a NOVI link on WhatsApp/social media)

## What's unchanged





* Same design system, same colors, same copy
* Same cart behavior (localStorage-based, same logic)
* Same checkout flow, same Razorpay integration
* Same backend — no API changes were needed

## Project structure



```
src/
├── app/                      # Next.js App Router — folder = URL route
│   ├── layout.jsx             # Root layout, global <head> metadata
│   ├── page.jsx                # Homepage (Server Component)
│   ├── globals.css             # Design system (same tokens as before)
│   ├── product/\[id]/           # Individual product pages
│   ├── checkout/                # Checkout (client-interactive)
│   ├── order-success/\[id]/      # Post-payment confirmation
│   ├── about/, contact/, terms-and-conditions/,
│   │   privacy-policy/, shipping-policy/,
│   │   payment-refund-policy/    # Each a real, separate page
├── components/                # Shared UI pieces
└── lib/
    ├── api.js                  # Server-side data fetching (SEO-critical)
    ├── clientApi.js             # Browser-only calls (checkout, popup)
    ├── CartContext.jsx           # Cart state (same logic as before)
    ├── pricing.js, formulaTheme.js
```

**Key pattern**: pages without `"use client"` at the top run on the
server and are what search engines actually see. Interactive pieces
(Add to Cart buttons, the cart drawer, checkout form) are separate
small client components nested inside those server-rendered pages.

## Local development

```
npm install
cp .env.example .env.local   # point at your backend
npm run dev
```

## ⚠️ Deployment is more involved than the React version

Unlike the plain React/Vite projects, true server-rendered Next.js on
Cloudflare needs a specific adapter (`@opennextjs/cloudflare`) rather
than a plain static build — this is a more complex deployment path than
what we've done for the other three projects, and may involve some
trial and error given the platform friction we've already hit
elsewhere in this build. This is exactly why this project was kept
fully separate: if deployment proves difficult, the live storefront is
completely unaffected the whole time.


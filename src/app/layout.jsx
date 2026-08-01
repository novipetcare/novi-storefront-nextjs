import "./globals.css";
import { CartProvider } from "../lib/CartContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CartDrawer from "../components/CartDrawer.jsx";
import EmailPopup from "../components/EmailPopup.jsx";

const SITE_URL = "https://novi-storefront-nextjs.novipetcare.workers.dev";

// This metadata object is what actually gets sent to search engines and
// social media link previews as real HTML <meta> tags — this is the
// core SEO improvement over the plain React version, where none of this
// existed until JavaScript ran in the browser.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NOVI — Made for Indian Pets",
    template: "%s", // individual pages set their own full title
  },
  description:
    "Premium, India-specific dog shampoos — sulphate-free, paraben-free, pH balanced. Tick & flea defence, everyday care, and gentle puppy formulas.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NOVI — Made for Indian Pets",
    description: "Premium, India-specific dog shampoos — pure care for precious paws.",
    type: "website",
    siteName: "NOVI",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVI — Made for Indian Pets",
    description: "Premium, India-specific dog shampoos — pure care for precious paws.",
  },
};

// Site-wide structured data — helps search engines understand this is a
// real business/website (distinct from the per-product structured data
// added on each product page). Kept minimal and only claims things we
// can actually confirm.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NOVI",
  url: SITE_URL,
  description: "Premium, India-specific dog shampoos — sulphate-free, paraben-free, pH balanced.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <EmailPopup />
        </CartProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { CartProvider } from "../lib/CartContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CartDrawer from "../components/CartDrawer.jsx";
import EmailPopup from "../components/EmailPopup.jsx";

// This metadata object is what actually gets sent to search engines and
// social media link previews as real HTML <meta> tags — this is the
// core SEO improvement over the plain React version, where none of this
// existed until JavaScript ran in the browser.
export const metadata = {
  title: "NOVI — Made for Indian Pets",
  description:
    "Premium, India-specific dog shampoos — sulphate-free, paraben-free, pH balanced. Tick & flea defence, everyday care, and gentle puppy formulas.",
  openGraph: {
    title: "NOVI — Made for Indian Pets",
    description: "Premium, India-specific dog shampoos — pure care for precious paws.",
    type: "website",
  },
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

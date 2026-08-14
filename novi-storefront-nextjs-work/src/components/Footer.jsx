import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">NOVI</div>
          <p className="footer-tagline">&quot;Pure Care for Precious Paws&quot;</p>

          <div className="footer-social">
            <a href="https://www.instagram.com/novi_pets/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://blog.novipets.in" target="_blank" rel="noopener noreferrer">
              NOVI Pet Journal
            </a>
            <a href="https://linkedin.com/company/novipets" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <nav className="footer-links">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/shipping-policy">Shipping Policy</Link>
          <Link href="/payment-refund-policy">Payment &amp; Refund Policy</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NOVI. All rights reserved.</span>
      </div>
    </footer>
  );
}

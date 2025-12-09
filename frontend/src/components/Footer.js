import React from "react";
import "../styles/layout.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* COLUMN 1 */}
        <div className="footer-col footer-brand">
          <img
            src="/logo.png"
            alt="Novelty Art Press"
            className="footer-logo"
          />

          <p>
            <b>Address:</b> Bangali akhara, Machuatoli, Langertoli, Patna 4,
            near Ajay Bhawan, Patna, Bihar – 800004
          </p>

          <h4>Connect with us</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://wa.me/919525099125">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="footer-col">
          <h4>Company</h4>
          <a href="/about">About ArtPress</a>
          <a href="/#why-us">Why Choose Us</a>
          <a href="/faq">FAQ & Support</a>
        </div>

        {/* COLUMN 3 */}
        <div className="footer-col">
          <h4>Products</h4>
          <a href="/products">Business Cards</a>
          <a href="/products">Brochures & Flyers</a>
          <a href="/products">Banners & Standees</a>
        </div>

        {/* COLUMN 4 */}
        <div className="footer-col footer-contact-col">
          <h4>Contact</h4>

          <p>
            <b>Email:</b> amanahmad213@gmail.com
          </p>
          <p>
            <b>Email:</b> mdmumtaznoveltyartpress@gmail.com
          </p>
          <p>
            <b>Phone:</b> +91-9525099125
          </p>
          <p>
            <b>Phone:</b> +91-9835010996
          </p>
          <p>
            <b>Phone:</b> +91-9204445458
          </p>

          <b>Hours</b>
          <div className="footer-hours-row">
            <span>Mon-Sat</span>
            <span>9am – 9pm</span>
          </div>
          <div className="footer-hours-row closed">
            <span>Sunday</span>
            <span>Closed</span>
          </div>

          <a href="/contact" className="footer-contact-link">
            Contact Form
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Novelty Art Press Printing Company. All rights reserved.
        <div className="footer-bottom-tags">
          Printing • Packaging • Branding
        </div>
      </div>
    </footer>
  );
};

export default Footer;

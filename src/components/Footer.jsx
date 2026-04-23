import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
        <div className="container footer-grid">
            <div className="footer-col brand-col">
                <div className="footer-logo">Květiny Maják</div>
                <p className="footer-desc">Bringing nature's finest aesthetics into your everyday life with luxury and elegance.</p>
            </div>
            <div className="footer-col">
                <h4 className="footer-heading">Shop</h4>
                <ul className="footer-links">
                    <li><a href="/category">Bouquets</a></li>
                    <li><a href="/category">Flower Boxes</a></li>
                    <li><a href="#">Bridal</a></li>
                    <li><a href="#">Gifts</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4 className="footer-heading">Service</h4>
                <ul className="footer-links">
                    <li><Link to="/track-order">Track Order</Link></li>
                    <li><a href="#">Delivery Info</a></li>
                    <li><a href="#">Flower Care</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4 className="footer-heading">Contact Us</h4>
                <address className="footer-contact">
                    <p>Antala Staška 236/18<br/>Prague 4, Czech Republic</p>
                    <p><a href="tel:+420737112733">+420 737 112 733</a></p>
                    <p><a href="mailto:info@kvetiny-majak.cz">info@kvetiny-majak.cz</a></p>
                </address>
                <div className="social-links">
                    <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                    <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                </div>
            </div>
        </div>
        <div className="container copy-wrap">
            <p>&copy; 2026 Květiny Maják. All Rights Reserved.</p>
        </div>
    </footer>
  );
};
export default Footer;

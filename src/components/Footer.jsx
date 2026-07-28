import React from 'react';
import { Activity, Phone, Mail, ArrowUp } from 'lucide-react';
export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="clinic-footer">
      <div className="container footer-container">
        <div className="footer-brand-col">
          <a href="#home" className="logo footer-logo" onClick={scrollToTop}>
            <Activity className="logo-icon" />
            <span className="logo-text">LANKA <span className="text-gradient">PHYSIO CLINIC</span></span>
          </a>
          <p className="footer-tagline">
            Professional physical rehabilitation and clinical recovery programs delivered in the security and comfort of your own home.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#specializations">Home Visits</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h4>Connect Directly</h4>
          <ul className="footer-links">
            <li>
              <a href="#contact" className="footer-whatsapp-link">
                <span className="whatsapp-dot"></span>
                Book via WhatsApp
              </a>
            </li>
            <li><a href="tel:0712231564">0712231564</a></li>
            <li><a href="mailto:info@lankaphysioclinic.com">info@lankaphysioclinic.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Lanka Physio Clinic. All rights reserved.</p>
          <a href="#home" onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .clinic-footer {
          background: #080b13;
          border-top: 1px solid var(--glass-border);
          padding: 80px 0 0 0;
          position: relative;
          z-index: 1;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 60px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo {
          margin-bottom: 18px;
        }

        .footer-tagline {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 320px;
        }

        .footer-links-col h4, .footer-contact-col h4 {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--accent-cyan);
        }

        .footer-whatsapp-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-green) !important;
          font-weight: 500;
        }

        .whatsapp-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-green);
          display: inline-block;
          box-shadow: 0 0 8px var(--accent-green);
        }

        /* Footer Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding: 24px 0;
        }

        .footer-bottom-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-bottom p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .back-to-top-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          text-decoration: none;
        }

        .back-to-top-btn:hover {
          background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 242, 254, 0.2);
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .clinic-footer {
            padding-top: 60px;
          }
        }
      `}</style>
    </footer>
  );
}

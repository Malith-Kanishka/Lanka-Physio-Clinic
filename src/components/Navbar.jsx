import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Activity } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/94771234567?text=Hello%20Lanka%20Physio%20Clinic%2C%20I%20would%20like%20to%20book%20a%20physiotherapy%20home%20visit.";

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo">
          <Activity className="logo-icon" />
          <span className="logo-text">LANKA <span className="text-gradient">PHYSIO</span></span>
        </a>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#specializations" className="nav-link">Home Visits</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp nav-cta">
            <Phone size={16} />
            <span>Book Home Visit</span>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="#home" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#services" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#specializations" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home Visits</a>
          <a href="#contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp mobile-cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Phone size={18} />
            <span>Book via WhatsApp</span>
          </a>
        </div>
      </div>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 24px 0;
          transition: all var(--transition-normal);
          border-bottom: 1px solid transparent;
        }

        .navbar-header.scrolled {
          padding: 14px 0;
          background: rgba(11, 15, 25, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
        }

        .logo-icon {
          color: var(--accent-cyan);
          width: 28px;
          height: 28px;
          filter: drop-shadow(0 0 8px var(--accent-cyan-glow));
        }

        .logo-text {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color var(--transition-fast);
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(to right, var(--accent-blue), var(--accent-cyan));
          transition: width var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta {
          font-size: 0.85rem;
          padding: 8px 18px;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Mobile Nav */
        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%;
          width: 280px;
          height: 100vh;
          background: var(--bg-secondary);
          border-left: 1px solid var(--glass-border);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
          z-index: 99;
          transition: right var(--transition-normal);
          padding-top: 100px;
        }

        .mobile-nav.open {
          right: 0;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          padding: 0 32px;
          gap: 24px;
        }

        .mobile-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: var(--font-heading);
          transition: color var(--transition-fast);
        }

        .mobile-link:hover {
          color: var(--accent-cyan);
        }

        .mobile-cta {
          margin-top: 16px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-toggle {
            display: block;
            position: relative;
            z-index: 101;
          }
        }
      `}</style>
    </header>
  );
}

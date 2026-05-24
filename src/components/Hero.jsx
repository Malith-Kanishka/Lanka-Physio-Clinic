import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Hero() {
  const whatsappLink = "https://wa.me/94771234567?text=Hello%20Lanka%20Physio%20Clinic%2C%20I%20would%20like%20to%20book%20a%20physiotherapy%20home%20visit.";

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="section-subtitle fade-in">Premium Home Care</span>
          <h1 className="hero-title fade-in-delay-1">
            Professional Physiotherapy <br />
            <span className="text-gradient">At Your Doorstep</span>
          </h1>
          <p className="hero-description fade-in-delay-2">
            No travel pain. No waiting rooms. Lanka Physio Clinic brings elite physical therapy and advanced clinical rehabilitation directly to your home. We treat all kinds of patients with custom, individual care plans.
          </p>

          <div className="hero-actions fade-in-delay-3">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <Phone size={18} />
              <span>Book Home Visit</span>
            </a>
            <a href="#services" className="btn btn-secondary btn-lg">
              <span>Our Services</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="hero-features fade-in-delay-4">
            <div className="hero-feature-item">
              <ShieldCheck className="feature-icon" />
              <div>
                <h4>100% Home Visit</h4>
                <p>Treatment in comfort</p>
              </div>
            </div>
            <div className="hero-feature-item">
              <Clock className="feature-icon" />
              <div>
                <h4>Flexible Booking</h4>
                <p>Times tailored to you</p>
              </div>
            </div>
            <div className="hero-feature-item">
              <Award className="feature-icon" />
              <div>
                <h4>Certified Pros</h4>
                <p>Registered therapists</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side is intentionally left empty (or minimal spacing) on desktop 
            to let the fixed scroll-driven nervous system canvas show through cleanly. */}
        <div className="hero-visual-placeholder"></div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 140px;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }

        .hero-content {
          max-width: 680px;
          z-index: 2;
        }

        .hero-title {
          font-size: 3.8rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }

        .hero-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 40px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 56px;
        }

        .btn-lg {
          padding: 14px 32px;
          font-size: 1rem;
        }

        .hero-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          border-top: 1px solid var(--glass-border);
          padding-top: 32px;
        }

        .hero-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .feature-icon {
          color: var(--accent-cyan);
          flex-shrink: 0;
          width: 24px;
          height: 24px;
        }

        .hero-feature-item h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .hero-feature-item p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .hero-visual-placeholder {
          height: 100%;
          min-height: 400px;
          pointer-events: none;
        }

        /* Simple premium entrance transitions */
        .fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .fade-in-delay-1 {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
        .fade-in-delay-2 {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }
        .fade-in-delay-3 {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
        }
        .fade-in-delay-4 {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
          }
          .hero-visual-placeholder {
            display: none;
          }
          .hero-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.4rem;
          }
          .hero-description {
            font-size: 1rem;
          }
          .hero-features {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}

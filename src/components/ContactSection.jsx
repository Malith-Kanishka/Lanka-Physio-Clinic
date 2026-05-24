import React from 'react';
import { Phone, Mail, Clock, MapPin, MessageSquare, Send } from 'lucide-react';

export default function ContactSection() {
  const whatsappLink = "https://wa.me/94771234567?text=Hello%20Lanka%20Physio%20Clinic%2C%20I%20would%20like%20to%20book%20a%20physiotherapy%20home%20visit.";

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Schedule A Visit</h2>
          <p className="section-description">
            Connect with our clinical team directly on WhatsApp to check therapist availability and schedule your initial assessment.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Direct WhatsApp booking guide */}
          <div className="glass-panel contact-card booking-guide-card">
            <div className="card-header-with-badge">
              <MessageSquare className="chat-badge-icon" />
              <h3>Instant Booking via WhatsApp</h3>
            </div>
            
            <p className="guide-intro">
              To help us assign the perfect therapist for your specific needs, please provide the following details when you start your chat:
            </p>

            <ul className="details-list">
              <li>
                <div className="bullet-point">1</div>
                <div>
                  <strong>Patient Name & Age</strong>
                  <p>Helps us understand basic patient demographics.</p>
                </div>
              </li>
              <li>
                <div className="bullet-point">2</div>
                <div>
                  <strong>Primary Location (Address)</strong>
                  <p>To verify our therapist covers your neighborhood.</p>
                </div>
              </li>
              <li>
                <div className="bullet-point">3</div>
                <div>
                  <strong>Condition / Symptoms</strong>
                  <p>E.g., lower back pain, recovery from knee surgery, stroke rehab.</p>
                </div>
              </li>
              <li>
                <div className="bullet-point">4</div>
                <div>
                  <strong>Preferred Date & Time</strong>
                  <p>We work around your schedule, mornings or evenings.</p>
                </div>
              </li>
            </ul>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg btn-block pulse-animation">
              <Send size={18} />
              <span>Start WhatsApp Chat</span>
            </a>
          </div>

          {/* Right Column: Contact info details */}
          <div className="contact-info-list">
            <div className="glass-panel info-item-card">
              <MapPin className="info-icon" />
              <div>
                <h4>Coverage Area</h4>
                <p>Colombo & suburbs (Dehiwala, Mount Lavinia, Rajagiriya, Battaramulla, Nugegoda, Kotte, and surrounding areas).</p>
              </div>
            </div>

            <div className="glass-panel info-item-card">
              <Clock className="info-icon" />
              <div>
                <h4>Operating Hours</h4>
                <p>Monday - Sunday: 7:00 AM - 9:00 PM (Including Public Holidays)</p>
              </div>
            </div>

            <div className="glass-panel info-item-card">
              <Phone className="info-icon" />
              <div>
                <h4>Phone Support</h4>
                <p>+94 77 123 4567</p>
              </div>
            </div>

            <div className="glass-panel info-item-card">
              <Mail className="info-icon" />
              <div>
                <h4>Email Address</h4>
                <p>info@lankaphysioclinic.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 32px;
          max-width: 800px; /* aligns with visual layout */
          z-index: 2;
          position: relative;
        }

        .contact-card {
          padding: 40px;
        }

        .card-header-with-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .chat-badge-icon {
          color: var(--accent-cyan);
          width: 28px;
          height: 28px;
        }

        .booking-guide-card h3 {
          font-size: 1.4rem;
          color: var(--text-primary);
        }

        .guide-intro {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .details-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 36px;
        }

        .details-list li {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .bullet-point {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(0, 242, 254, 0.1);
          border: 1px solid rgba(0, 242, 254, 0.3);
          color: var(--accent-cyan);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .details-list strong {
          color: var(--text-primary);
          font-size: 0.95rem;
          display: block;
          margin-bottom: 2px;
        }

        .details-list p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .btn-block {
          width: 100%;
        }

        /* Pulse Animation for Booking Button */
        @keyframes pulse-whatsapp {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        .pulse-animation {
          animation: pulse-whatsapp 2s infinite;
        }

        /* Right Column Info Cards */
        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-item-card {
          padding: 24px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .info-icon {
          color: var(--accent-cyan);
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .info-item-card h4 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        .info-item-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .contact-layout {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .contact-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </section>
  );
}

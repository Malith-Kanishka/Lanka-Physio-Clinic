import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, MessageSquare, Send } from 'lucide-react';
import mapImage from '../../uploads/map.png';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    condition: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppChat = (e) => {
    e.preventDefault();
    const message = `Hello Lanka Physio Clinic, I would like to book a physiotherapy home visit.
    
1. Patient Name & Age: ${formData.name}
2. Primary Location (Address): ${formData.location}
3. Condition / Symptoms: ${formData.condition}
4. Preferred Date & Time: ${formData.time}`;
    
    const whatsappLink = `https://wa.me/94712231564?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    
    setFormData({
      name: '',
      location: '',
      condition: '',
      time: ''
    });
  };

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

            <form onSubmit={handleWhatsAppChat} className="booking-form">
              <div className="form-group">
                <label>1. Patient Name & Age</label>
                <p className="form-help">Helps us understand basic patient demographics.</p>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
              </div>
              
              <div className="form-group">
                <label>2. Primary Location (Address)</label>
                <p className="form-help">To verify our therapist covers your neighborhood.</p>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="form-input" />
              </div>
              
              <div className="form-group">
                <label>3. Condition / Symptoms</label>
                <p className="form-help">E.g., lower back pain, recovery from knee surgery, stroke rehab.</p>
                <input type="text" name="condition" value={formData.condition} onChange={handleChange} required className="form-input" />
              </div>
              
              <div className="form-group">
                <label>4. Preferred Date & Time</label>
                <p className="form-help">We work around your schedule, mornings or evenings.</p>
                <input type="text" name="time" value={formData.time} onChange={handleChange} required className="form-input" />
              </div>
              
              <button type="submit" className="btn btn-whatsapp btn-lg btn-block pulse-animation" style={{marginTop: '24px', border: 'none', cursor: 'pointer', fontFamily: 'inherit'}}>
                <Send size={18} />
                <span>Start WhatsApp Chat</span>
              </button>
            </form>
          </div>

          {/* Right Column: Contact info details */}
          <div className="contact-info-list">
            <div className="glass-panel info-item-card">
              <MapPin className="info-icon" />
              <div>
                <h4>Coverage Area</h4>
                <p>Our services are available island-wide.</p>
                <div className="coverage-map-wrapper">
                  <img src={mapImage} alt="Coverage Map" className="coverage-map highlight-green-animation" />
                </div>
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
                <p>0712231564</p>
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

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group label {
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 600;
        }

        .form-help {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .form-input {
          padding: 12px 16px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 2px rgba(0, 242, 254, 0.2);
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

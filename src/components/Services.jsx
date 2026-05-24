import React from 'react';
import { Hand, Brain, Accessibility, Dumbbell, Heart, BriefcaseMedical } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Hand className="service-icon" />,
      title: "Manual Therapy",
      description: "Hands-on treatments including joint mobilizations, deep tissue release, and clinical stretching to immediately reduce pain and restore joint alignment."
    },
    {
      icon: <Brain className="service-icon" />,
      title: "Neurological Rehab",
      description: "Restorative therapy designed to enhance mobility and rebuild motor control for conditions like Stroke, Parkinson’s, and Spinal Cord injuries."
    },
    {
      icon: <Accessibility className="service-icon" />,
      title: "Musculoskeletal Care",
      description: "Expert relief for persistent neck and back pain, sciatica, herniated discs, frozen shoulder, osteoarthritis, and joint disorders."
    },
    {
      icon: <Dumbbell className="service-icon" />,
      title: "Sports Injury Rehab",
      description: "Accelerated recovery protocols for ligament tears (ACL/rotator cuff), muscle strains, joint sprains, and custom return-to-sport training."
    },
    {
      icon: <Heart className="service-icon" />,
      title: "Geriatric Physiotherapy",
      description: "Gentle physical therapy focusing on balance restoration, muscle strength, safe transfers, and fall prevention to protect senior independence."
    },
    {
      icon: <BriefcaseMedical className="service-icon" />,
      title: "Post-Surgical Recovery",
      description: "Structured progressive mobilization regimens following knee/hip replacements, fracture fixation, and spinal surgeries."
    }
  ];

  return (
    <section id="services" className="services-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What We Do</span>
          <h2 className="section-title">Specialized Treatments</h2>
          <p className="section-description">
            We adapt advanced clinical techniques to the home setting, ensuring you receive identical standard-of-care results without traveling.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="glass-panel service-card">
              <div className="icon-container">
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(17, 24, 39, 0.4) 100%);
        }

        .section-header {
          max-width: 600px;
          margin-bottom: 60px;
        }

        .section-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-top: 12px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 800px; /* limits width on desktop so the right-side canvas isn't covered */
          z-index: 2;
          position: relative;
        }

        .service-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .icon-container {
          background: rgba(79, 172, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.15);
          width: 54px;
          height: 54px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: var(--accent-cyan);
          transition: all var(--transition-fast);
        }

        .service-card:hover .icon-container {
          background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
          color: #000;
          transform: scale(1.05);
          box-shadow: 0 0 15px var(--accent-cyan-glow);
        }

        .service-icon {
          width: 26px;
          height: 26px;
        }

        .service-card-title {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .service-card-desc {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .services-grid {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .service-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}

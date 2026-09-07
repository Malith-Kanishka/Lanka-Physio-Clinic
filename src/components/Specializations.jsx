import React from 'react';
import { Home, Calendar, ClipboardList, CheckCircle2, UserCheck, Armchair } from 'lucide-react';

export default function Specializations() {
  const benefits = [
    {
      icon: <Armchair size={20} />,
      title: "Natural Home Comfort",
      desc: "Recover in the space where you live. Home therapy reduces stress, eliminates travel pain, and lets us assess your actual ergonomic environment."
    },
    {
      icon: <UserCheck size={20} />,
      title: "One-on-One Dedicated Focus",
      desc: "Get 100% of your therapist’s attention. Unlike busy clinics where therapists split time between patients, our sessions are entirely yours."
    },
    {
      icon: <Home size={20} />,
      title: "Full Clinic Equipment Brought To You",
      desc: "We bring active rehab gear, therapeutic resistance tools, and portable electrotherapy devices (TENS/muscle stimulators) right to your house."
    }
  ];

  const patientTypes = [
    {
      title: "Geriatric & Seniors",
      desc: "Improving balance, building muscle strength, correcting posture, and ensuring home safety to prevent critical falls."
    },
    {
      title: "Post-Surgical Recoveries",
      desc: "Safely rebuilding range of motion and joint stability following orthopedic procedures (knee/hip replacements, plates/screws)."
    },
    {
      title: "Sports & Athletes",
      desc: "Treating acute sprains, ligament tears, and joint strains, with custom drills to return safely to sports."
    },
    {
      title: "Busy Professionals & Children",
      desc: "Dealing with neck/back fatigue, RSI, and ergonomic strains at flexible hours, plus safe pediatric alignment exercises."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "WhatsApp Booking",
      desc: "Tap our booking button to coordinate a date and time directly with our clinical coordinator."
    },
    {
      num: "02",
      title: "In-Home Assessment",
      desc: "A registered physiotherapist visits you to conduct physical tests, check range of motion, and analyze pain triggers."
    },
    {
      num: "03",
      title: "Tailored Care Plan",
      desc: "We create a highly customized recovery plan containing manual techniques, electrotherapy sessions, and active exercise."
    },
    {
      num: "04",
      title: "Rehabilitation & Milestones",
      desc: "Receive ongoing supervised treatments at home, with adjustments made dynamically as you gain strength."
    }
  ];

  return (
    <section id="specializations" className="specializations-section section">
      <div className="container">
        {/* Core Value Proposition */}
        <div className="promo-row">
          <div className="promo-content">
            <span className="section-subtitle">Dedicated Home Service</span>
            <h2 className="section-title">Why Choose Home Visits?</h2>
            <p className="promo-desc">
              Traveling for treatment when experiencing extreme pain, joint stiffness, or neurological impairment can actually set back recovery. We solve this by delivering the standard of an elite outpatient clinic directly to you.
            </p>

            <div className="benefits-list">
              {benefits.map((benefit, i) => (
                <div key={i} className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="benefit-title">{benefit.title}</h4>
                    <p className="benefit-desc">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Categories */}
        <div className="patients-row">
          <h3 className="sub-section-title">Physiotherapy for All Kinds of Patients</h3>
          <p className="patients-intro">
            We adapt our treatment protocols to match the exact physiological and age requirements of our diverse clientele.
          </p>
          <div className="patients-grid">
            {patientTypes.map((pt, index) => (
              <div key={index} className="glass-panel patient-card">
                <h4 className="patient-card-title">{pt.title}</h4>
                <p className="patient-card-desc">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Home Visit Process */}
        <div className="process-row">
          <h3 className="sub-section-title text-center">How It Works</h3>
          <p className="process-intro text-center">
            Booking and completing your in-home physiotherapy is direct, simple, and professional.
          </p>
          <div className="process-steps">
            {steps.map((step, index) => (
              <div key={index} className="glass-panel step-card">
                <span className="step-num">{step.num}</span>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .specializations-section {
          background: linear-gradient(180deg, rgba(17, 24, 39, 0.4) 0%, var(--bg-primary) 100%);
        }

        .promo-row {
          max-width: 800px;
          margin-bottom: 80px;
        }

        .promo-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .benefit-item {
          display: flex;
          gap: 20px;
        }

        .benefit-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 242, 254, 0.1);
          border: 1px solid rgba(0, 242, 254, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          flex-shrink: 0;
        }

        .benefit-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .benefit-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Patient Grid */
        .patients-row {
          margin-bottom: 80px;
          max-width: 800px;
        }

        .sub-section-title {
          font-size: 2rem;
          margin-bottom: 12px;
          background: linear-gradient(to right, #fff, var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .patients-intro {
          color: var(--text-muted);
          margin-bottom: 40px;
        }

        .patients-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .patient-card {
          padding: 24px;
        }

        .patient-card-title {
          font-size: 1.15rem;
          color: var(--accent-blue);
          margin-bottom: 10px;
        }

        .patient-card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* Process Steps */
        .process-row {
          max-width: 800px;
        }

        .text-center {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        .process-intro {
          color: var(--text-muted);
          margin-bottom: 48px;
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .step-card {
          padding: 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 220px;
        }

        .step-num {
          font-size: 2.2rem;
          font-family: var(--font-heading);
          font-weight: 800;
          color: rgba(0, 242, 254, 0.2);
          margin-bottom: 12px;
          line-height: 1;
        }

        .step-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .step-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .promo-row, .patients-row, .process-row {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .patients-grid {
            grid-template-columns: 1fr;
          }

          .process-steps {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .process-steps {
            grid-template-columns: 1fr;
          }
          
          .step-card {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}

import React from 'react';
import Navbar from './components/Navbar';
import NervousSystemBackground from './components/NervousSystemBackground';
import Hero from './components/Hero';
import Services from './components/Services';
import Specializations from './components/Specializations';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      {/* 1. Interactive Nervous System Animation Background */}
      <NervousSystemBackground />

      {/* 2. Glassmorphic Navigation Bar */}
      <Navbar />

      {/* 3. Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services List (Inspired by Revival Clinic) */}
        <Services />

        {/* Home Visit Deep Dive & Process */}
        <Specializations />

        {/* Contact and WhatsApp CTA Section */}
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />

      <style>{`
        .app-wrapper {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background-color: var(--bg-primary);
        }

        main {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

export default App;

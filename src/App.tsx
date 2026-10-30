import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CreativeGallery } from './components/CreativeGallery';
import { PricingSection } from './components/PricingSection';
import { ClientStories } from './components/ClientStories';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InitialLoader } from './components/InitialLoader';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');

  const scrollToContact = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForInquiry(serviceName);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Seamless spring scroll reveal variant
  const sectionScrollReveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-20px' },
    transition: { duration: 0.55, ease: 'easeOut' as const },
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white selection:bg-[#F59E0B] selection:text-black relative font-sans">
      {/* Sleek Website Initial Loading Screen with user theme video */}
      <InitialLoader />

      {/* Floating Pill Navigation matching image_56bd323c.png */}
      <Navigation onConsultationClick={() => scrollToContact()} />

      <main>
        {/* Hero Section: Workspace PC Display with 3D Carousel Poster */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' as const }}
        >
          <HeroSection
            onExploreWork={scrollToServices}
            onBookConsultation={() => scrollToContact()}
          />
        </motion.div>

        {/* All Published Services (Split Frosted Card) */}
        <motion.div {...sectionScrollReveal}>
          <ServicesSection
            onSelectServiceForInquiry={(serviceTitle) => scrollToContact(serviceTitle)}
          />
        </motion.div>

        {/* Creative Gallery (Row 1 right, Row 2 left automatic marquee) */}
        <motion.div {...sectionScrollReveal}>
          <CreativeGallery
            onProjectInquiry={(projectTitle) => scrollToContact(`Creative Project: ${projectTitle}`)}
          />
        </motion.div>

        {/* Pricing Phone Aspect Cards */}
        <motion.div {...sectionScrollReveal}>
          <PricingSection
            onSelectPlan={(planName) => scrollToContact(`${planName} Package`)}
          />
        </motion.div>

        {/* Why Us Section: Editorial 1, 2, 3 Spreads */}
        <motion.div {...sectionScrollReveal}>
          <ClientStories onCaseInquiry={(caseTitle) => scrollToContact(caseTitle)} />
        </motion.div>

        {/* Contact Section: Cadastral Architectural Map & Floating Form */}
        <motion.div {...sectionScrollReveal}>
          <ContactSection
            preselectedService={selectedServiceForInquiry}
          />
        </motion.div>
      </main>

      {/* Footer matching Website_Footer with Rudraksh Innovations Wordmark */}
      <motion.div {...sectionScrollReveal}>
        <Footer />
      </motion.div>

      {/* Vercel Web Analytics & Real-Time Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

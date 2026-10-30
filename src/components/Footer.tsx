import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Instagram,
  Linkedin,
  Globe,
  Phone,
  Mail,
  MapPin,
  X,
  FileText,
  Shield,
  ArrowUpRight
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const Footer: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  });

  const yWordmark = useTransform(scrollYProgress, [0, 1], [30, -15]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const yEmblem = useTransform(scrollYProgress, [0, 1], [20, -10]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Our Work' },
    { id: 'why-us', label: 'Why Us (The DNA)' },
    { id: 'packages', label: 'Pricing Plans' },
    { id: 'contact', label: 'Contact us' },
  ];

  return (
    <footer ref={footerRef} className="relative bg-[#04050A] text-white pt-4 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Card */}
        <div className="relative rounded-[32px] sm:rounded-[44px] bg-gradient-to-b from-[#0B0F19] via-[#0D121F] to-[#111827] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden p-8 sm:p-12 md:p-16 flex flex-col justify-between min-h-[520px] sm:min-h-[580px]">
          {/* Warm Amber & Cyber Cyan Diffused Ambient Glow with Parallax */}
          <motion.div
            style={{ y: yGlow }}
            className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[380px] bg-gradient-to-t from-[#F59E0B]/30 via-[#38BDF8]/15 to-transparent blur-3xl -z-10"
          />

          {/* Top Row: Navigation Links (Left) & Socials + Contact Info (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left Column: Vertical Navigation Links with Brand Logo */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full border border-amber-500/40 bg-black/80 p-0.5 overflow-hidden flex items-center justify-center shrink-0 shadow-lg">
                  <img
                    src="/assets/aistudio/1__2__58ec0766.png"
                    alt="Rudraksh Innovations Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-wider">
                    Rudraksh Innovations
                  </div>
                  <div className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-semibold">
                    Official Digital Agency · Ahmedabad
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                NAVIGATION INDEX
              </div>
              {navLinks.map((link) => (
                <div key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-base sm:text-lg text-neutral-300 hover:text-[#F59E0B] font-medium tracking-tight transition-colors cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </div>
              ))}
            </div>

            {/* Right Column: Social Icons + Details (Right Aligned on desktop) */}
            <div className="md:col-span-7 flex flex-col md:items-end justify-start space-y-4 text-left md:text-right">
              {/* Horizontal Row of 4 Icons: WhatsApp, Instagram, Globe, LinkedIn */}
              <div className="flex items-center gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/917874331074"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs"
                  aria-label="WhatsApp Contact"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={AGENCY_INFO.contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4 stroke-[1.8]" />
                </a>

                {/* Official Website */}
                <a
                  href="https://rudrakshinnovations.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs"
                  aria-label="Official Website"
                >
                  <Globe className="w-4 h-4 stroke-[1.8]" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/rudraksh-innovations"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs"
                  aria-label="LinkedIn Company Page"
                >
                  <Linkedin className="w-4 h-4 stroke-[1.8]" />
                </a>
              </div>

              {/* Contact Information */}
              <div className="space-y-1.5 text-xs sm:text-sm text-neutral-300 font-sans tracking-wide">
                <div className="hover:text-amber-400 transition-colors">
                  <a href={`mailto:${AGENCY_INFO.contact.email}`} className="cursor-pointer">
                    E-mail: <span className="text-white font-medium">{AGENCY_INFO.contact.email}</span>
                  </a>
                </div>
                <div className="hover:text-amber-400 transition-colors">
                  <a href={`tel:${AGENCY_INFO.contact.phone.replace(/\s+/g, '')}`} className="cursor-pointer">
                    Phone: <span className="text-white font-medium">{AGENCY_INFO.contact.phone}</span> · <span className="text-white font-medium">{AGENCY_INFO.contact.alternatePhone}</span>
                  </a>
                </div>
                <div className="text-neutral-400 max-w-sm ml-auto">
                  {AGENCY_INFO.contact.address}
                </div>
                <div className="text-[11px] font-mono text-amber-400/90 pt-1">
                  Inc. {AGENCY_INFO.incorporationDate} · ROC Ahmedabad
                </div>
              </div>

              {/* Extra Brand Badges & Legal Links */}
              <div className="pt-2 flex flex-wrap md:justify-end items-center gap-3 text-[11px] text-neutral-400">
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-neutral-500">ROC Ahmedabad</span>
              </div>
            </div>
          </div>

          {/* Huge Brand Typography Across Bottom with Parallax & Logo Crest */}
          <div className="w-full text-center mt-12 sm:mt-16 -mb-4 sm:-mb-6 pointer-events-none select-none overflow-hidden flex flex-col items-center justify-center px-2">
            {/* Floating Brand Crest Emblem */}
            <motion.div
              style={{ y: yEmblem }}
              className="mb-3 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-500/50 bg-black/90 p-1 overflow-hidden flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              <img
                src="/assets/aistudio/1__2__58ec0766.png"
                alt="Rudraksh Innovations Crest"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.h2
              style={{ y: yWordmark }}
              className="w-full font-black tracking-tight text-[clamp(2.2rem,6.8vw,7rem)] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/70 via-[#F59E0B]/85 to-[#F59E0B] filter drop-shadow-[0_15px_30px_rgba(245,158,11,0.25)] text-center whitespace-nowrap"
            >
              Rudraksh Innovations
            </motion.h2>
          </div>
        </div>

        {/* Bottom Sub-bar: Copyright */}
        <div className="mt-6 px-4 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
          <span>
            © {new Date().getFullYear()} Rudraksh Innovations. All Rights Reserved.
          </span>
          <span className="text-neutral-400">
            {AGENCY_INFO.tagline}
          </span>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#0E111D] border border-white/15 text-white p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full border border-amber-500/40 bg-black/80 p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-sm sm:text-base">Terms of Service · Rudraksh Innovations</span>
                </div>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
                <p>
                  <strong>1. Corporate Entity:</strong> Rudraksh Innovations is registered in Ahmedabad, Gujarat, India, delivering digital marketing, paid advertising management, reel production, branding, and web development.
                </p>
                <p>
                  <strong>2. Deliverables & Milestones:</strong> All content assets, ad campaigns, and digital platforms are created under approved client scope agreements. Intellectual property transitions entirely to the client upon full invoice settlement.
                </p>
                <p>
                  <strong>3. Confidentiality:</strong> Proprietary client strategy, market forecasts, source materials, and customer datasets are protected under strict non-disclosure terms.
                </p>
                <p>
                  <strong>4. Retainer Terms:</strong> Monthly growth retainers require no punitive lock-in and can be adjusted with 14 calendar days written notice.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#0E111D] border border-white/15 text-white p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full border border-amber-500/40 bg-black/80 p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold text-sm sm:text-base">Privacy Policy · Rudraksh Innovations</span>
                </div>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
                <p>
                  <strong>Information Collection:</strong> We collect contact data (name, email address, telephone number, company brief) exclusively when submitted via our online inquiry forms to deliver customized agency proposals.
                </p>
                <p>
                  <strong>Data Protection & Privacy:</strong> We strictly do not sell, rent, or lease client information to third parties. All inquiry and client communication data is encrypted and securely handled in compliance with applicable Indian and global privacy laws.
                </p>
                <p>
                  <strong>Contact for Rights:</strong> For data access or deletion requests, contact our privacy officer at info@rudrakshinnovations.com.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

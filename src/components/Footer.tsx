import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Instagram,
  Linkedin,
  Globe,
  Phone,
  Mail,
  MapPin,
  X,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  Copy,
  Check,
  Clock,
  Send
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const Footer: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const footerRef = useRef<HTMLElement | null>(null);

  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  });

  const yWordmark = useTransform(scrollYProgress, [0, 1], [25, -15]);

  // Live IST Clock for Ahmedabad Office
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('info@rudrakshinnovations.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Our Work' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'packages', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const coreServices = [
    { title: 'Social Media Marketing', desc: 'Viral Reels & Omnichannel Content' },
    { title: 'Digital Marketing', desc: '360° Acquisition & Search Growth' },
    { title: 'Paid Marketing & ROAS', desc: 'Mathematical Customer Acquisition' },
    { title: 'Web Development', desc: 'High-Converting 3D Flagships' },
    { title: 'Software Development', desc: 'Bespoke Cloud Systems & APIs' },
    { title: 'AI & Machine Learning', desc: 'Autonomous Automation & Models' },
  ];

  return (
    <footer ref={footerRef} role="contentinfo" className="relative bg-[#030408] text-white pt-8 pb-12 sm:pb-14 px-3 sm:px-6 lg:px-8 font-sans select-none overflow-hidden">
      
      {/* Top Architectural Golden Accent Baseline */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent pointer-events-none" />

      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* ========================================================================= */}
        {/* TOP CTA ACTION BANNER: "READY TO ELEVATE YOUR BRAND"                      */}
        {/* ========================================================================= */}
        <div className="relative rounded-[24px] sm:rounded-[32px] p-7 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0A0D18] via-[#070912] to-[#04060B] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            
            <div className="space-y-3.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>DISCUSS YOUR VISION · RUDRAKSH INNOVATIONS</span>
              </div>

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-sans leading-[1.05]">
                Ready to elevate your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#F59E0B]">
                  brand's digital dominance?
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal max-w-xl">
                We partner with ambitious founders and forward-thinking enterprises to deliver high-impact Social Media Marketing, digital marketing, website development, and bespoke software.
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-[#F59E0B] hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(245,158,11,0.35)] transition-all cursor-pointer active:scale-95"
              >
                <span>Start A Project</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-950" />
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-sm"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>info@rudrakshinnovations.com</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Bottom Live Office Clock Strip */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 relative z-10">
            <div className="flex items-center gap-2 text-[11px] text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
              <span>Available for New Projects & Social Media Audits</span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Ahmedabad HQ (IST):</span>
              <span className="text-white font-semibold">{currentTime || '12:00:00 PM'}</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MAIN DIRECTORY & CONTACT MATRIX (NO LOGO IMAGES)                          */}
        {/* ========================================================================= */}
        <div className="relative rounded-[24px] sm:rounded-[32px] bg-[#070912] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
            
            {/* Column 1: Typographic Brand Identity & Statement (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="space-y-1">
                {/* Pure Typographic Wordmark - No Logo Image */}
                <h4 className="text-2xl font-black text-white uppercase tracking-tight font-sans">
                  Rudraksh Innovations
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-bold">
                  <span>DIGITAL AGENCY & SOFTWARE LABS</span>
                  <span className="text-neutral-600">·</span>
                  <span>EST. 2024</span>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-light">
                An innovation and digital growth engine delivering high-impact Social Media Marketing, performance marketing, high-speed web apps, and bespoke software systems.
              </p>

              {/* Physical Office Coordinates */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
                <div className="text-[10px] text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>AHMEDABAD OFFICE</span>
                </div>
                <div className="text-neutral-300 text-[11px] leading-relaxed font-sans">
                  Vastral, Ahmedabad, Gujarat 382418, India
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold block mb-2">
                  CONNECT WITH US:
                </span>
                <div className="flex items-center gap-2">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917874331074"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-white/15 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="WhatsApp Contact"
                  >
                    <Send className="w-4 h-4 stroke-[1.8]" />
                  </a>

                  {/* Instagram */}
                  <a
                    href={AGENCY_INFO.contact.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-white/15 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4 stroke-[1.8]" />
                  </a>

                  {/* Official Website */}
                  <a
                    href="https://rudrakshinnovations.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-white/15 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="Official Website"
                  >
                    <Globe className="w-4 h-4 stroke-[1.8]" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={AGENCY_INFO.contact.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-white/15 hover:border-amber-400 bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="LinkedIn Company Page"
                  >
                    <Linkedin className="w-4 h-4 stroke-[1.8]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Map (2.5 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-bold block">
                SITE INDEX
              </span>
              <ul className="space-y-2 text-xs sm:text-sm">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group text-left"
                    >
                      <span className="w-1.5 h-0.5 bg-neutral-600 group-hover:bg-amber-400 transition-colors" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Core Disciplines (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-bold block">
                CORE DISCIPLINES
              </span>
              <ul className="space-y-2.5 text-xs">
                {coreServices.map((item, idx) => (
                  <li key={idx} className="group">
                    <button
                      onClick={() => scrollTo('services')}
                      className="text-left cursor-pointer transition-colors block"
                    >
                      <span className="text-neutral-200 group-hover:text-amber-400 transition-colors font-medium block">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-400 block mt-0.5">
                        {item.desc}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Direct Channels & Support (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-bold block">
                DIRECT INQUIRIES
              </span>

              <div className="space-y-3 text-xs text-neutral-300">
                <div>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase">Direct Email</span>
                  <a
                    href="mailto:info@rudrakshinnovations.com"
                    className="text-white hover:text-amber-400 font-semibold tracking-wide transition-colors cursor-pointer inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>info@rudrakshinnovations.com</span>
                  </a>
                </div>

                <div>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase">Direct Phone / WhatsApp</span>
                  <a
                    href="tel:+917874331074"
                    className="text-white hover:text-amber-400 font-semibold tracking-wide transition-colors cursor-pointer inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+91 78743 31074</span>
                  </a>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    Alternate: +91 81281 55486
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase">Google Maps Satellite</span>
                  <a
                    href={AGENCY_INFO.contact.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <span>Satellite Directions (Ahmedabad)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  </a>
                </div>

                <div className="pt-1 text-[10px] font-mono text-amber-400/90">
                  Registration: July 10, 2024 · Ahmedabad
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* SCULPTURAL TYPOGRAPHIC MONUMENT: PURE ART (NO LOGO IMAGES)               */}
          {/* ========================================================================= */}
          <div className="w-full text-center mt-12 sm:mt-16 pointer-events-none select-none overflow-hidden flex flex-col items-center justify-center px-2">
            
            {/* Monumental Sculptural Wordmark */}
            <motion.h2
              style={{ y: yWordmark }}
              className="w-full font-black tracking-tight text-[clamp(1.75rem,7.5vw,7.2rem)] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-[#FDE68A]/90 to-[#F59E0B] filter drop-shadow-[0_15px_35px_rgba(245,158,11,0.3)] text-center break-words sm:whitespace-nowrap px-2"
            >
              Rudraksh Innovations
            </motion.h2>

            {/* Handcrafted Golden Baseline Stroke */}
            <div className="w-3/4 max-w-2xl h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mt-3" />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SUB-FOOTER LEGAL, COPYRIGHT & BACK TO TOP BAR                             */}
        {/* ========================================================================= */}
        <div className="px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <span>
              © {new Date().getFullYear()} Rudraksh Innovations. All Rights Reserved.
            </span>
            <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
            <span className="text-neutral-500 font-serif italic">
              "{AGENCY_INFO.tagline}"
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setShowTermsModal(true)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-mono font-semibold transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Terms & Conditions Modal (NO LOGO) */}
      <AnimatePresence>
        {showTermsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#0B0E19] border border-white/15 text-white p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-bold text-sm sm:text-base font-sans uppercase tracking-wide">
                    Terms of Engagement · Rudraksh Innovations
                  </span>
                </div>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Terms modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-neutral-300 leading-relaxed font-sans font-light">
                <p>
                  <strong>1. Corporate Entity:</strong> Rudraksh Innovations is registered in Ahmedabad, Gujarat, India, delivering digital marketing, paid advertising management, cinematic video production, brand strategy, and bespoke software platforms.
                </p>
                <p>
                  <strong>2. Deliverables & Intellectual Property:</strong> All creative works, designs, codebases, and ad campaign structures created under approved client scopes transition entirely to the client upon invoice settlement.
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

      {/* Privacy Policy Modal (NO LOGO) */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#0B0E19] border border-white/15 text-white p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-bold text-sm sm:text-base font-sans uppercase tracking-wide">
                    Privacy Policy · Rudraksh Innovations
                  </span>
                </div>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Privacy modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-neutral-300 leading-relaxed font-sans font-light">
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

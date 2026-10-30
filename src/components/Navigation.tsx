import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface NavigationProps {
  onConsultationClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onConsultationClick }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['home', 'services', 'portfolio', 'packages', 'why-us', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Our Work' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'packages', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Centered Dark Pill Navbar with Radiant Background Lighting */}
      <header className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        
        {/* ========================================================================= */}
        {/* NAVBAR BACKGROUND LIGHTING EFFECT                                        */}
        {/* Multi-layered radiant glow blooming softly from behind the floating pill  */}
        {/* ========================================================================= */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-16 sm:h-20 pointer-events-none -z-10">
          {/* Primary Warm Amber Central Glow */}
          <div
            className={`absolute inset-x-8 sm:inset-x-16 top-0 bottom-0 bg-gradient-to-r from-amber-500/25 via-amber-400/35 to-amber-500/25 rounded-full blur-2xl transition-opacity duration-700 ${
              isScrolled ? 'opacity-90 scale-102' : 'opacity-65'
            }`}
            style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
          />

          {/* Secondary Cyan / Sky Rim Glow on Flanks */}
          <div
            className="absolute -inset-x-2 -top-1 -bottom-1 bg-gradient-to-r from-sky-500/15 via-transparent to-amber-500/20 rounded-full blur-3xl pointer-events-none opacity-70"
          />

          {/* Sleek Horizontal Light Flare along the bottom */}
          <div className="absolute top-full -translate-y-1 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/60 to-transparent blur-[1px] pointer-events-none" />
        </div>

        {/* Floating Pill Container */}
        <div
          className={`pointer-events-auto relative w-full max-w-4xl rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 shadow-[0_16px_50px_rgba(0,0,0,0.85)] border ${
            isScrolled
              ? 'bg-[#060810]/95 border-amber-500/30 backdrop-blur-2xl shadow-[0_18px_60px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20'
              : 'bg-[#070912]/90 border-white/15 backdrop-blur-xl hover:border-amber-500/30'
          }`}
        >
          {/* Top Edge Specular Lighting Highlight inside the Pill */}
          <div className="absolute top-0 inset-x-8 sm:inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-t-full" />

          {/* Brand Seal Crest Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group cursor-pointer"
          >
            {/* Official Company Circular Seal Logo with Radiant Glow */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-500/40 bg-black flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all group-hover:scale-105 group-hover:border-amber-400 shrink-0 overflow-hidden">
              <img
                src="/assets/aistudio/1__2__58ec0766.png"
                alt="Rudraksh Innovations Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                Rudraksh
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-bold tracking-[0.22em] text-[#F59E0B] uppercase mt-0.5 leading-none">
                INNOVATIONS
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative py-1 transition-all cursor-pointer hover:text-white ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveGlow"
                      className="absolute -bottom-1 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent shadow-[0_0_8px_#F59E0B]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Status Indicator & "Let's Talk" CTA */}
          <div className="flex items-center gap-3">
            {/* Live Agency Status Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[10px] font-mono text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
              <span>Available for Projects</span>
            </div>

            {/* Primary Action Button: Luminous White Pill */}
            <button
              onClick={onConsultationClick}
              className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-100 active:scale-95 transition-all rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)] flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-900" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Backlight Accent */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 bg-[#090C16]/98 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95)] md:hidden text-white overflow-hidden"
          >
            {/* Ambient Interior Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/aistudio/1__2__58ec0766.png"
                    alt="Logo"
                    className="w-6 h-6 rounded-full border border-amber-500/40"
                  />
                  <span className="text-amber-400 font-bold">RUDRAKSH INNOVATIONS</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left py-2 text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    activeSection === link.id ? 'text-amber-400 font-bold' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="text-xs text-amber-400">●</span>}
                </button>
              ))}

              <div className="pt-3 border-t border-white/10 mt-2 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onConsultationClick();
                  }}
                  className="w-full py-3 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-full shadow-lg flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[10px] font-mono text-neutral-400 pt-1">
                  Ahmedabad, Gujarat · {AGENCY_INFO.contact.phone}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

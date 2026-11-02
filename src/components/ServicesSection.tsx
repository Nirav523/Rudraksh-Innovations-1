import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, X, Sparkles, CheckCircle2, Layers, BarChart3 } from 'lucide-react';
import { AGENCY_INFO, SERVICES } from '../data/agencyData';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

// ============================================================================
// HIGH-QUALITY MINIMAL MONOCHROME SVG ICONS FOR THE 5 DISCIPLINES
// ============================================================================

export const SocialMediaIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="3.75" />
    <circle cx="17.25" cy="6.75" r="1" fill="currentColor" />
  </svg>
);

export const DigitalMarketingIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9.5" />
    <polygon
      points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
      fill="currentColor"
      fillOpacity="0.25"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const PaidMarketingIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 20.5h18" />
    <path d="M4.5 16.5l5.5-6 4 4 6.5-7.5" />
    <polyline points="15 7 20.5 7 20.5 12.5" />
    <circle cx="10" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="14" cy="14.5" r="1.5" fill="currentColor" />
  </svg>
);

export const WebDevIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2.5" y="3.5" width="19" height="17" rx="3" />
    <path d="M2.5 8.5h19" />
    <polyline points="8 12.5 5.5 14.5 8 16.5" />
    <polyline points="16 12.5 18.5 14.5 16 16.5" />
    <line x1="13" y1="12" x2="11" y2="17" />
  </svg>
);

export const SoftwareDevIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="5" width="14" height="14" rx="2.5" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.25" />
    <line x1="9" y1="1.5" x2="9" y2="5" />
    <line x1="15" y1="1.5" x2="15" y2="5" />
    <line x1="9" y1="19" x2="9" y2="22.5" />
    <line x1="15" y1="19" x2="15" y2="22.5" />
    <line x1="1.5" y1="9" x2="5" y2="9" />
    <line x1="1.5" y1="15" x2="5" y2="15" />
    <line x1="19" y1="9" x2="22.5" y2="9" />
    <line x1="19" y1="15" x2="22.5" y2="15" />
  </svg>
);

interface ServiceSlide {
  id: string;
  number: string;
  category: string;
  tabLabel: string;
  wordTop: string;
  wordBottom: string;
  tagline: string;
  quote: string;
  learnMoreText: string;
  image: string;
  textureImage: string;
  badgeLabel: string;
  icon: React.ReactNode;
  metric: string;
  deliverables: string[];
  extendedDescription: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // The 5 Main Core Services with Bespoke Logical Images & Monochrome SVG Icons
  const services: ServiceSlide[] = [
    {
      id: 'social-media-marketing',
      number: '01',
      category: 'ORGANIC REACH & COMMUNITY',
      tabLabel: 'Social Media',
      wordTop: 'SOCIAL MEDIA',
      wordBottom: 'MARKETING',
      tagline: 'VIRAL REACH & CULT BRAND FOLLOWING',
      quote: 'Full-service social media marketing across Meta, Instagram, LinkedIn, and YouTube. Great brands do not broadcast noise; they orchestrate culture and command organic attention.',
      learnMoreText: 'EXPLORE SOCIAL MEDIA MARKETING',
      // Logical: 4K cinema production camera on rig with studio lights filming high-retention video/reels
      image:
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=85',
      textureImage:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
      badgeLabel: '4K REEL PRODUCTION & CREATOR STUDIO',
      icon: <SocialMediaIcon className="w-full h-full" />,
      metric: 'Multi-Platform Reach & +300% Engagement Lift',
      deliverables: [
        'Strategic Monthly Omnichannel Content Calendar',
        'High-Retention Reels, Shorts & Carousel Production',
        'Daily Real-Time Community Management & DM Funnels',
        'Audience Sentiment & Algorithmic Calibration',
      ],
      extendedDescription:
        'We take full ownership of your social footprint across Instagram, LinkedIn, YouTube, and X. From viral 3-second hook scripting and high-retention video production to active community nurturing and data-driven algorithmic calibration, we turn casual viewers into loyal paying advocates.',
    },
    {
      id: 'digital-marketing',
      number: '02',
      category: '360° STRATEGIC GROWTH ENGINE',
      tabLabel: 'Digital Marketing',
      wordTop: 'DIGITAL',
      wordBottom: 'MARKETING',
      tagline: 'FULL-FUNNEL ACQUISITION & SEARCH DOMINANCE',
      quote: 'End-to-end digital acquisition, search domination, and lifecycle customer journeys. We merge technical SEO, content marketing, and automated nurture funnels to build sustainable revenue.',
      learnMoreText: 'EXPLORE DIGITAL MARKETING',
      // Logical: High-tech multi-screen digital analytics and marketing command center with real-time conversion graphs
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
      textureImage:
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
      badgeLabel: '360° SEARCH & ANALYTICS COMMAND',
      icon: <DigitalMarketingIcon className="w-full h-full" />,
      metric: '360° Omnichannel Market Leadership',
      deliverables: [
        'Comprehensive Digital Strategy & Competitor Audits',
        'Technical & Local SEO for First-Page Rankings',
        'Automated Lifecycle Email & SMS Nurture Funnels',
        'Conversion Rate Optimization (CRO) & Funnel Architecture',
      ],
      extendedDescription:
        'Our 360° digital marketing framework synchronizes every digital touchpoint. By unifying authoritative search engine optimization, automated email nurture sequences, strategic content distribution, and conversion rate optimization, we engineer predictable, compounding pipeline growth.',
    },
    {
      id: 'paid-marketing',
      number: '03',
      category: 'PERFORMANCE CAPITAL & ROAS',
      tabLabel: 'Paid Marketing',
      wordTop: 'PAID',
      wordBottom: 'MARKETING',
      tagline: 'HIGH-ROI META, GOOGLE & PROGRAMMATIC ADS',
      quote: 'Scaling is not about spending more; it is about deploying capital where conversion efficiency is mathematical. Targeted campaigns built for aggressive customer acquisition.',
      learnMoreText: 'EXPLORE PAID MARKETING',
      // Logical: Performance ad campaign reporting & analytics dashboard showing conversion rates and ROAS metrics
      image:
        'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1600&q=85',
      textureImage:
        'https://images.unsplash.com/photo-1686061594183-8c864f508b00?auto=format&fit=crop&w=800&q=80',
      badgeLabel: 'PPC & ROAS PERFORMANCE DASHBOARD',
      icon: <PaidMarketingIcon className="w-full h-full" />,
      metric: '4.8x+ Blended Return on Ad Spend (ROAS)',
      deliverables: [
        'High-Converting Meta & Google Ad Deployments',
        'Multi-Variant Creative & Copy A/B Testing',
        'Server-Side Pixel & Conversions API Attribution',
        'Predictive Bid Management & Budget Scaling Algorithms',
      ],
      extendedDescription:
        'We design, test, and scale aggressive paid acquisition campaigns across Meta Ads, Google Search, Performance Max, and programmatic networks. With server-side conversion tracking, relentless creative testing, and algorithmic bid optimization, we maximize every marketing rupee and dollar spent.',
    },
    {
      id: 'web-development',
      number: '04',
      category: 'HIGH-CONVERTING DIGITAL FLAGSHIPS',
      tabLabel: 'Web Dev',
      wordTop: 'WEB',
      wordBottom: 'DEVELOPMENT',
      tagline: 'FUTURISTIC 3D & ULTRA-FAST WEB PLATFORMS',
      quote: 'Your website is your primary digital flagship. We build bespoke, responsive, blazing-fast web experiences combining cutting-edge 3D WebGL graphics and aggressive conversion flows.',
      learnMoreText: 'EXPLORE WEB DEVELOPMENT',
      // Logical: Official bespoke Rudraksh Innovations workstation render with 3D WebGL monitor & branded notebooks
      image:
        '/assets/aistudio/Rudraksh_Innovations__Future-Ready_Workspace_33064468.png',
      textureImage:
        'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
      badgeLabel: 'OFFICIAL 3D WEBGL STUDIO SETUP',
      icon: <WebDevIcon className="w-full h-full" />,
      metric: 'Sub-Second Global Load & 99+ Lighthouse Score',
      deliverables: [
        'Interactive 3D / WebGL Visual Experiences (Three.js)',
        'Modern React & Next.js TypeScript Frameworks',
        'Conversion-Engineered Landing Flows & Portals',
        'Mobile-First Responsive Perfection & CDN Edge Caching',
      ],
      extendedDescription:
        'We build custom, production-ready web platforms and digital experiences engineered to captivate and convert. Leveraging modern web stacks, interactive 3D WebGL scenes, and strict performance engineering, we turn web visitors into active pipeline qualified leads.',
    },
    {
      id: 'software-development',
      number: '05',
      category: 'BESPOKE SYSTEMS & CLOUD ARCHITECTURE',
      tabLabel: 'Software Dev',
      wordTop: 'SOFTWARE',
      wordBottom: 'DEVELOPMENT',
      tagline: 'SCALABLE CLOUD PLATFORMS, APIS & WORKFLOWS',
      quote: 'We engineer scalable SaaS platforms, custom enterprise software, and automated business operating engines tailored to your exact operational requirements with bank-level security.',
      learnMoreText: 'EXPLORE SOFTWARE DEVELOPMENT',
      // Logical: Multi-monitor software engineering workstation with syntax-highlighted code and algorithms on dark screen
      image:
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1600&q=85',
      textureImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      badgeLabel: 'FULL-STACK SOFTWARE & API CODEBASE',
      icon: <SoftwareDevIcon className="w-full h-full" />,
      metric: '99.99% Uptime & Enterprise Cloud Architecture',
      deliverables: [
        'Custom SaaS & Internal Workflow Platform Engineering',
        'Robust REST & GraphQL APIs with Secure Auth',
        'Scalable Database Architecture & Data Pipelines',
        'Automated DevOps, CI/CD & Cloud Infrastructure',
      ],
      extendedDescription:
        'From bespoke internal dashboards and customer portals to complex SaaS architectures and automation backends, we build robust, high-performance software systems. Our code is written to modern enterprise standards, featuring modular microservices, bulletproof authentication, and automated cloud deployments.',
    },
  ];

  const current = services[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBackdrop = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const yCard = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yHeadline = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} id="services" className="relative w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#07090E] overflow-hidden font-sans border-t border-white/5">
      
      {/* Outer Atmospheric Blurred Backdrop with Parallax */}
      <motion.div style={{ y: yBackdrop }} className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={current.image}
          alt="Atmospheric Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter blur-3xl scale-110 opacity-25 brightness-75 contrast-125 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-[#07090E]/85 mix-blend-multiply" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">
        
        {/* Section Header with Official Logo */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest text-[#F59E0B] uppercase">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/1__2__58ec0766.png"
                alt="Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <span>SERVICES ARCHITECTURE</span>
            <span className="text-white/40">·</span>
            <span className="text-white/80">RUDRAKSH INNOVATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Disciplines Engineered for Scale
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Our 5 core digital disciplines from rudrakshinnovations.com, merging creative brilliance with algorithmic precision.
          </p>
        </div>

        {/* Giant Ambient Watermark behind the Services card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden px-4">
          <span className="font-extrabold uppercase tracking-widest text-[42px] sm:text-[75px] md:text-[110px] lg:text-[140px] text-white/[0.04] whitespace-nowrap block">
            {current.wordTop} {current.wordBottom}
          </span>
        </div>

        {/* ========================================================================= */}
        {/* CENTRAL HERO-STYLE SPLIT SERVICES CARD WITH PARALLAX                      */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: yCard }}
          className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-white/10 bg-[#0A0D16]"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] sm:min-h-[620px] lg:min-h-[660px]">
            
            {/* ========================================================================= */}
            {/* LEFT HALF: Frosted Glass / Storytelling Pane                              */}
            {/* ========================================================================= */}
            <div className="lg:col-span-6 relative p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden bg-black/55 backdrop-blur-2xl border-b lg:border-b-0 lg:border-r border-white/10">
              
              {/* Soft Ambient Texture peaking through glass */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <img
                  src={current.image}
                  alt="Glass reflection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter blur-md scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-transparent" />
              </div>

              {/* Top Row: "OUR CRAFT" + Company Logo Badge */}
              <div className="relative z-10 flex items-start justify-between">
                
                {/* Badge: OUR DISCIPLINES with Logo */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Logo"
                      className="w-5 h-5 rounded-full border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.3)] shrink-0"
                    />
                    <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-white/90 uppercase font-mono">
                      OUR DISCIPLINES
                    </span>
                  </div>
                  <span className="block text-[9px] text-[#F59E0B] tracking-widest font-mono pt-0.5">
                    SERVICE [{current.number} / {services.length.toString().padStart(2, '0')}]
                  </span>
                </div>

                {/* Minimalist Monochrome Service Icon Glass Tile */}
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md group hover:border-[#F59E0B]/50 transition-colors">
                    <div className="w-5 h-5 text-white/95">
                      {current.icon}
                    </div>
                  </div>
                </div>

              </div>

              {/* Middle: Monumental Masked Cutout Headline - Responsive & Fully Visible */}
              <div className="relative z-10 my-auto py-8 lg:py-4 max-w-full">
                
                {/* Eyebrow Label with Minimal Monochrome Icon */}
                <motion.div
                  key={`tag-${current.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase mb-3 shadow-inner"
                >
                  <div className="w-3.5 h-3.5 text-white/90 shrink-0">
                    {current.icon}
                  </div>
                  <span>{current.category}</span>
                </motion.div>

                {/* Headline with Luminous High-Contrast Typography - Never Clipped */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`headline-${current.id}`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-1 select-none overflow-visible max-w-full"
                  >
                    {/* First Word / Phrase */}
                    <h3
                      className={`font-black tracking-tight uppercase leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#FBBF24] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-full break-words ${
                        current.wordTop.length > 8
                          ? 'text-2xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px]'
                          : 'text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl'
                      }`}
                      style={{
                        fontFamily: '"Impact", "Arial Black", sans-serif',
                      }}
                    >
                      {current.wordTop}
                    </h3>

                    {/* Second Word / Phrase */}
                    <h4
                      className={`font-black tracking-tight uppercase leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-full break-words ${
                        current.wordBottom.length > 9
                          ? 'text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[44px]'
                          : 'text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[58px]'
                      }`}
                      style={{
                        fontFamily: '"Impact", "Arial Black", sans-serif',
                      }}
                    >
                      {current.wordBottom}
                    </h4>
                  </motion.div>
                </AnimatePresence>

                {/* Subtitle / Quote */}
                <motion.p
                  key={`quote-${current.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-xs sm:text-sm text-neutral-300 italic font-serif mt-5 max-w-md leading-relaxed"
                >
                  "{current.quote}"
                </motion.p>
              </div>

              {/* Bottom Row: Underline Link to Learn More */}
              <div className="relative z-10 pt-4">
                <button
                  onClick={() => setShowDetailModal(true)}
                  className="text-xs sm:text-sm font-semibold tracking-wider text-white border-b-2 border-white/60 pb-1 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all cursor-pointer uppercase flex items-center gap-2 group text-left"
                >
                  <span>{current.learnMoreText}</span>
                  <span className="font-mono text-white/70 group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* RIGHT HALF: Crisp Cinematic Photography + Top Nav + Slide Controls       */}
            {/* ========================================================================= */}
            <div className="lg:col-span-6 relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 min-h-[380px] lg:min-h-auto">
              
              {/* Crisp Photographic Backdrop */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`bg-${current.id}`}
                  src={current.image}
                  alt={`${current.wordTop} ${current.wordBottom}`}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />
              </AnimatePresence>

              {/* Subtle Gradient Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/75 pointer-events-none" />

              {/* Top Service Bar with Live Badge HUD + Quick Selector Tabs */}
              <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-md self-start">
                  <div className="w-3.5 h-3.5 text-white/90 shrink-0">
                    {current.icon}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#F59E0B]" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white font-semibold">
                    {current.badgeLabel}
                  </span>
                </div>

                {/* Top Service Quick Selector Tabs with clean monochrome icons */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase overflow-x-auto pb-1 scrollbar-none">
                  {services.map((item, sIdx) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentSlide(sIdx)}
                      className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        sIdx === currentSlide
                          ? 'bg-[#F59E0B] text-black font-bold shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                          : 'bg-black/60 text-white/80 hover:bg-black/80 hover:text-white border border-white/10'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 shrink-0 ${sIdx === currentSlide ? 'text-black' : 'text-neutral-400'}`}>
                        {item.icon}
                      </div>
                      <span className="font-mono text-[9px] opacity-75">{item.number}</span>
                      <span>{item.tabLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right-Edge Vertical Pagination Track */}
              <div className="hidden lg:flex flex-col items-center gap-2.5 absolute right-5 top-1/2 -translate-y-1/2 z-20">
                <div className="w-[1.5px] h-6 bg-white/30" />
                {services.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to ${s.wordTop}`}
                    className="cursor-pointer transition-all p-1"
                  >
                    {idx === currentSlide ? (
                      <div className="w-2.5 h-2.5 bg-[#F59E0B] rotate-45 shadow-[0_0_10px_#F59E0B]" />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white" />
                    )}
                  </button>
                ))}
                <div className="w-[1.5px] h-6 bg-white/30" />
              </div>

              {/* Bottom Navigation Controls [ ← ] [ → ] */}
              <div className="relative z-20 flex items-end justify-between mt-auto pt-16">
                
                {/* Metric Pill */}
                <div className="text-[10px] sm:text-[11px] font-mono text-white/90 tracking-wider flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{current.metric}</span>
                </div>

                {/* Arrow Buttons [ ← ] [ → ] */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous service"
                    className="w-11 h-11 rounded-lg bg-[#0F172A]/90 hover:bg-[#F59E0B] text-white hover:text-black border border-white/20 hover:border-[#F59E0B] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next service"
                    className="w-11 h-11 rounded-lg bg-[#0F172A]/90 hover:bg-[#F59E0B] text-white hover:text-black border border-white/20 hover:border-[#F59E0B] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* SERVICE DOSSIER DETAIL MODAL                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showDetailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0D121F] text-white w-full max-w-2xl rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md">
                  <div className="w-5 h-5 text-white">
                    {current.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Logo"
                      className="w-3.5 h-3.5 rounded-full object-contain inline-block"
                    />
                    <span>SERVICE {current.number} · {current.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {current.wordTop} {current.wordBottom}
                  </h3>
                </div>
              </div>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg relative group">
                <img
                  src={current.image}
                  alt={current.wordTop}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#F59E0B]" />
                  <span>{current.badgeLabel}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                {current.extendedDescription}
              </p>

              {/* Deliverables List */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase block font-semibold mb-2">
                  Key Scope Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-200">
                  {current.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  Intake Availability: Immediate Q4 Deployment
                </span>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    onSelectServiceForInquiry(`${current.wordTop} ${current.wordBottom}`);
                  }}
                  className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-black px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow flex items-center gap-2"
                >
                  <span>Select Service for Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

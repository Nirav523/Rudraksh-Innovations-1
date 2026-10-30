import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  BrainCircuit,
  TrendingUp,
  Video,
  Share2,
  CheckCircle2,
  X,
  Maximize2,
  Minimize2,
  Sparkles,
  BarChart2,
  Globe,
  Cpu,
  Cloud,
  Shield,
  Database,
  Layers,
  Atom,
  Lock,
  Laptop
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface HeroSectionProps {
  onExploreWork: () => void;
  onBookConsultation: () => void;
}

interface CarouselPosterCard {
  id: string;
  indexStr: string;
  title: string;
  subtitle: string;
  tagline: string;
  themeColor: string;
  glowColor: string;
  icon: React.ReactNode;
  graphicType: 'ai-globe' | 'code-laptop' | 'cloud-network' | 'cyber-shield' | 'growth-chart' | 'social-mesh' | 'software-core';
  deliverables: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onBookConsultation,
}) => {
  // Card 02/06 (AI & Machine Learning) active by default matching reference image
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [selectedPoster, setSelectedPoster] = useState<CarouselPosterCard | null>(null);
  const [isZoomedScreen, setIsZoomedScreen] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transform calculations
  const yStage = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yGlow1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yGlow2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityStage = useTransform(scrollYProgress, [0, 0.85], [1, 0.7]);

  // All 6 Core Services: Social Media, AI & ML, Digital Marketing, Paid Marketing, Web Dev, Software Dev
  const posterCards: CarouselPosterCard[] = [
    {
      id: 'social-media-marketing',
      indexStr: '01 / 06',
      title: 'Social Media Marketing',
      subtitle: 'Viral Reach & Cult Following',
      tagline: 'Strategic omnichannel content planning, viral reels, and active community growth across Meta, Instagram, and LinkedIn.',
      themeColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.5)',
      icon: <Share2 className="w-4 h-4 text-amber-400" />,
      graphicType: 'social-mesh',
      deliverables: [
        'Strategic Monthly Omnichannel Content Calendar',
        'High-Retention Reels, Shorts & Carousel Production',
        'Daily Real-Time Community Engagement & DM Funnels',
        'Audience Sentiment & Algorithmic Calibration',
      ],
    },
    {
      id: 'ai-machine-learning',
      indexStr: '02 / 06',
      title: 'AI & Machine Learning',
      subtitle: 'Smarter Solutions',
      tagline: 'Intelligent AI models, proprietary generative automation, and predictive analytics that give your business an unfair advantage.',
      themeColor: '#3B82F6',
      glowColor: 'rgba(59, 130, 246, 0.65)',
      icon: <BrainCircuit className="w-4 h-4 text-blue-400" />,
      graphicType: 'ai-globe',
      deliverables: [
        'Custom Generative AI Agents & Workflow Automation',
        'Proprietary Fine-Tuned LLM & Vision Integration',
        'Predictive Analytics & Real-Time Algorithmic Intelligence',
        'Autonomous Customer Engagement & AI Growth Engines',
      ],
    },
    {
      id: 'digital-marketing',
      indexStr: '03 / 06',
      title: 'Digital Marketing',
      subtitle: '360° Omnichannel Engine',
      tagline: 'End-to-end digital acquisition, technical SEO search dominance, and automated lead nurturing funnels.',
      themeColor: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.5)',
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      graphicType: 'cloud-network',
      deliverables: [
        'Comprehensive 360° Omnichannel Growth Strategy',
        'Technical & Local SEO for Top Google Rankings',
        'Automated Email & SMS Nurture Sequences',
        'Conversion Rate Optimization (CRO) & Funnel Architecture',
      ],
    },
    {
      id: 'paid-marketing',
      indexStr: '04 / 06',
      title: 'Paid Marketing',
      subtitle: 'Performance Capital & ROAS',
      tagline: 'Laser-targeted Meta & Google ad campaigns engineered for mathematical customer acquisition and 4.8x+ ROAS.',
      themeColor: '#60A5FA',
      glowColor: 'rgba(96, 165, 250, 0.5)',
      icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
      graphicType: 'growth-chart',
      deliverables: [
        'High-Converting Meta & Google Ad Deployments',
        'Multi-Variant Creative & Copy A/B Testing',
        'Server-Side Pixel & Conversions API Attribution',
        'Predictive Bid Management & Budget Scaling Algorithms',
      ],
    },
    {
      id: 'web-development',
      indexStr: '05 / 06',
      title: 'Web Development',
      subtitle: 'Modern, Fast, Scalable',
      tagline: 'Modern, responsive, blazing-fast web platforms engineered for seamless user experience and maximum conversion.',
      themeColor: '#34D399',
      glowColor: 'rgba(52, 211, 153, 0.45)',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      graphicType: 'code-laptop',
      deliverables: [
        'Custom React & Next.js High-Performance Web Apps',
        'Headless CMS & Scalable Full-Stack Architecture',
        'Sub-second Loading Speed & Core Web Vitals Optimization',
        'Interactive 3D WebGL / Canvas Brand Flagships',
      ],
    },
    {
      id: 'software-development',
      indexStr: '06 / 06',
      title: 'Software Development',
      subtitle: 'Scalable Cloud & SaaS',
      tagline: 'Bespoke enterprise software, custom REST/GraphQL APIs, and automated business operating engines.',
      themeColor: '#A855F7',
      glowColor: 'rgba(168, 85, 247, 0.5)',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      graphicType: 'software-core',
      deliverables: [
        'Custom SaaS & Internal Workflow Platform Engineering',
        'Robust REST & GraphQL APIs with Secure Auth',
        'Scalable Database Architecture & Data Pipelines',
        'Automated DevOps, CI/CD & Cloud Infrastructure',
      ],
    },
  ];

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev + 1) % posterCards.length);
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev - 1 + posterCards.length) % posterCards.length);
  };

  return (
    <section ref={sectionRef} id="home" className="relative w-full bg-[#07090E] text-white pt-16 sm:pt-20 pb-8 sm:pb-10 px-3 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* Background Ambient Warm & Cyber Glows with Parallax */}
      <motion.div
        style={{ y: yGlow1 }}
        className="pointer-events-none absolute top-0 left-0 w-full h-[550px] bg-gradient-to-b from-[#0F1424] via-[#090C16] to-[#07090E] -z-10"
      />
      <motion.div
        style={{ y: yGlow1 }}
        className="pointer-events-none absolute top-10 right-1/4 w-[550px] h-[450px] bg-amber-500/10 blur-[140px] -z-10"
      />
      <motion.div
        style={{ y: yGlow2 }}
        className="pointer-events-none absolute top-1/3 left-1/3 w-[450px] h-[350px] bg-sky-500/10 blur-[130px] -z-10"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-3">
        
        {/* Top Header Pill Bar */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-400">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/1__2__58ec0766.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-neutral-200 font-semibold">Rudraksh Innovations</span>
            <span className="text-neutral-600">·</span>
            <span className="text-amber-400/90 font-medium">Official Digital Agency</span>
          </div>

          <button
            onClick={() => setIsZoomedScreen(!isZoomedScreen)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer shadow-sm hover:border-amber-400/30"
          >
            {isZoomedScreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="hidden sm:inline">Executive Desk View</span>
                <span className="sm:hidden">Desk View</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="hidden sm:inline">Fullscreen Display</span>
                <span className="sm:hidden">Maximize</span>
              </>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* HERO STAGE: WORKSPACE IMAGE WITH OPAQUE MASKED INTERACTIVE DISPLAY        */}
        {/* Parallax depth movement applied via motion.div wrapper                    */}
        {/* ========================================================================= */}
        <motion.div style={{ y: yStage, opacity: opacityStage }}>
          {!isZoomedScreen ? (
            <div className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.95)] aspect-[16/10] max-h-[820px] bg-[#0A0D14]">
              
              {/* The Executive Desk Workspace Background Photograph */}
              <img
                src="/assets/aistudio/Rudraksh_Innovations__Future-Ready_Workspace_33064468.png"
                alt="Rudraksh Innovations Future-Ready Workspace"
                className="w-full h-full object-cover select-none"
              />

              {/* CRITICAL FIX: OPAQUE SOLID SCREEN CANVAS - PRECISE MONITOR FIT */}
              <div
                className="absolute z-20 flex flex-col justify-between overflow-hidden bg-[#07090F] border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.9)]"
                style={{
                  left: '33.8%',
                  top: '13.6%',
                  width: '57.4%',
                  height: '53.6%',
                  borderRadius: '9px',
                }}
              >
                {/* Glowing Ambient High-Tech Wallpaper & 3D Stage Background */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#060810] via-[#090D1A] to-[#04060B]">
                  {/* Digital Constellation Matrix Dots */}
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1px)`,
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Top-Left Desk Lamp Amber Spotlight Falloff onto Screen */}
                  <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-gradient-to-br from-[#F59E0B]/35 via-[#D97706]/15 to-transparent blur-2xl" />

                  {/* Center-Right Glowing Cyan & Violet Nebula behind Carousel */}
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-[#38BDF8]/30 via-[#818CF8]/20 to-transparent blur-2xl" />

                  {/* Grounding Glossy Stage Floor Reflection with Perspective Horizon */}
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#0F172A]/80 via-[#0C101D]/40 to-transparent" />
                  <div className="absolute bottom-1/3 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/25 to-transparent" />

                  {/* High-Tech Circuit & HUD Lines */}
                  <div className="absolute top-3 right-4 flex items-center gap-1.5 opacity-30 text-[7px] font-mono text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>RUDRAKSH·SYSTEM_v4.2</span>
                  </div>

                  {/* Glass Reflection Highlight Slant */}
                  <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent rotate-12" />
                </div>

                {/* Screen Top Navigation Bar with Official Logo */}
                <div className="relative z-10 w-full flex items-center justify-between px-2.5 sm:px-4 py-1 sm:py-1.5 bg-[#0C101C]/90 backdrop-blur-md border-b border-white/10 select-none shrink-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-amber-400/50 bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_6px_rgba(245,158,11,0.4)]">
                      <img
                        src="/assets/aistudio/1__2__58ec0766.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[8.5px] sm:text-[10px] font-bold tracking-wide text-white font-sans truncate">
                      Rudraksh Innovations
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 md:gap-3 text-[7.5px] sm:text-[9px] font-medium text-neutral-300">
                    <a href="#home" className="text-white hover:text-amber-400 transition-colors">Home</a>
                    <button
                      onClick={() => setShowServicesModal((prev) => !prev)}
                      className="text-amber-300 hover:text-amber-400 transition-colors cursor-pointer font-bold flex items-center gap-1 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30"
                    >
                      <Sparkles className="w-2 h-2 text-amber-400" />
                      <span>Services</span>
                    </button>
                    <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
                    <a href="#why-us" className="hover:text-white transition-colors">About</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                  </div>

                  <button
                    onClick={onBookConsultation}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-500/60 bg-amber-500/10 hover:bg-amber-400 text-amber-300 hover:text-black text-[7px] sm:text-[8.5px] font-bold tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    Get a Quote
                  </button>
                </div>

                {/* Screen Split: Left Headline Copy + Right Perfectly-Fit Carousel */}
                <div className="flex-1 min-h-0 grid grid-cols-12 gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 items-center overflow-hidden relative">
                  
                  {/* Left Side: Headline & CTA matching Rudraksh Innovations image */}
                  <div className="col-span-5 space-y-0.5 sm:space-y-1.5 pr-1 z-10">
                    <div className="text-[6px] sm:text-[7.5px] font-mono tracking-widest text-[#F59E0B] uppercase font-semibold">
                      IDEAS · TECHNOLOGY · IMPACT
                    </div>

                    <h2 className="text-[11px] sm:text-[15px] md:text-[18px] font-extrabold uppercase leading-[1.05] text-white font-sans">
                      INNOVATE<br />
                      TODAY FOR A<br />
                      <span className="text-[#F59E0B]">
                        BETTER TOMORROW
                      </span>
                    </h2>

                    <p className="text-[6px] sm:text-[7.5px] text-neutral-300 line-clamp-2 max-w-[190px] leading-snug">
                      We build intelligent digital solutions that help businesses grow, transform, and stay ahead in the ever-changing world.
                    </p>

                    <div className="pt-0.5 flex items-center gap-1.5">
                      <button
                        onClick={() => setShowServicesModal(true)}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#F59E0B] hover:bg-amber-400 text-black text-[6.5px] sm:text-[7.5px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer shadow"
                      >
                        <span>Explore Our Services</span>
                        <ArrowRight className="w-2 h-2" />
                      </button>
                      <button
                        onClick={onBookConsultation}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/40 hover:bg-white/10 text-white border border-white/20 text-[6.5px] sm:text-[7.5px] font-medium uppercase cursor-pointer"
                      >
                        Get in Touch
                      </button>
                    </div>
                  </div>

                  {/* Right Side: CAROUSEL WITH 3D RADIANT STAGE & REFLECTIONS */}
                  <div className="col-span-7 relative flex items-center justify-center">
                    
                    {/* Left / Right Carousel Controls positioned cleanly */}
                    <button
                      onClick={handlePrev}
                      aria-label="Previous card"
                      className="absolute left-0 z-30 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#07090F]/95 text-white border border-white/30 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-md"
                    >
                      <ChevronLeft className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next card"
                      className="absolute right-0 z-30 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#07090F]/95 text-white border border-white/30 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-md"
                    >
                      <ChevronRight className="w-2.5 h-2.5" />
                    </button>

                    {/* Perfectly proportioned card stack */}
                    <div className="flex items-center justify-center -space-x-3 sm:-space-x-4 select-none px-3">
                      {posterCards.map((card, idx) => {
                        const offset = idx - activeCardIndex;
                        const isActive = offset === 0;
                        const isLeft = offset === -1 || (offset === posterCards.length - 1 && activeCardIndex === 0);
                        const isRight = offset === 1 || (offset === -(posterCards.length - 1) && activeCardIndex === posterCards.length - 1);
                        const isVisible = isActive || isLeft || isRight;

                        if (!isVisible) return null;

                        return (
                          <motion.div
                            key={card.id}
                            layout
                            onClick={() => {
                              if (isActive) setSelectedPoster(card);
                              else setActiveCardIndex(idx);
                            }}
                            animate={{
                              opacity: isActive ? 1 : 0.45,
                              scale: isActive ? 1 : 0.8,
                              zIndex: isActive ? 20 : 10,
                            }}
                            transition={{ duration: 0.25 }}
                            className={`relative cursor-pointer transition-all duration-300 ${
                              isActive ? 'w-[88px] sm:w-[110px] md:w-[125px]' : 'w-[64px] sm:w-[78px] md:w-[90px]'
                            }`}
                          >
                            <div
                              className={`rounded-lg p-1.5 sm:p-2 backdrop-blur-xl border flex flex-col justify-between transition-all duration-300 relative ${
                                isActive
                                  ? 'bg-[#0A1124]/95 border-amber-400/90 shadow-[0_8px_30px_rgba(37,99,235,0.45)] ring-1 ring-amber-400/50'
                                  : 'bg-[#070C18]/90 border-white/10'
                              }`}
                              style={{
                                height: isActive ? '98px' : '82px',
                                maxHeight: '100px',
                              }}
                            >
                              {/* Card Top: Indicator */}
                              <div className="flex items-center justify-between">
                                <div className="p-0.5 rounded bg-white/5">
                                  {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, {
                                    className: 'w-2.5 h-2.5 text-neutral-300',
                                  })}
                                </div>
                                <span className={`text-[6.5px] sm:text-[7.5px] font-mono font-bold flex items-center gap-1 ${
                                  isActive ? 'text-amber-400' : 'text-neutral-400'
                                }`}>
                                  {isActive && <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />}
                                  {card.indexStr}
                                </span>
                              </div>

                              {/* Center Graphic */}
                              <div className="my-auto py-0.5 flex items-center justify-center">
                                {card.graphicType === 'ai-globe' ? (
                                  /* Radiant Glowing Blue 3D AI Cyber Globe */
                                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-blue-500/35 blur-md animate-pulse" />
                                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-blue-400 bg-gradient-to-tr from-blue-900 via-sky-600 to-indigo-950 shadow-[0_0_15px_#38BDF8] flex items-center justify-center overflow-hidden">
                                      <div className="absolute inset-0 border border-cyan-300/40 rounded-full animate-spin duration-1000" style={{ animationDuration: '12s' }} />
                                      <div className="absolute inset-0.5 border border-dashed border-white/30 rounded-full" />
                                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#60A5FA]" />
                                    </div>
                                  </div>
                                ) : card.graphicType === 'social-mesh' ? (
                                  /* Glowing Social Mesh */
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-amber-950/70 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                                    <Share2 className="w-3.5 h-3.5 text-amber-300" />
                                  </div>
                                ) : card.graphicType === 'code-laptop' ? (
                                  /* Glowing Laptop with Syntax Code */
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-emerald-950/70 border border-emerald-400/40 flex flex-col items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.25)] p-1">
                                    <Laptop className="w-3.5 h-3.5 text-emerald-300" />
                                    <div className="w-full h-0.5 bg-emerald-400/50 mt-0.5 rounded-full" />
                                  </div>
                                ) : card.graphicType === 'cloud-network' ? (
                                  /* Glowing Digital Marketing & Cloud */
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-sky-950/70 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.25)]">
                                    <Globe className="w-3.5 h-3.5 text-sky-300" />
                                  </div>
                                ) : card.graphicType === 'software-core' ? (
                                  /* Software Dev CPU Core */
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-purple-950/70 border border-purple-400/40 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.25)]">
                                    <Cpu className="w-3.5 h-3.5 text-purple-300" />
                                  </div>
                                ) : (
                                  /* Paid Marketing ROAS Telemetry */
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-blue-950/70 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.25)]">
                                    <TrendingUp className="w-3.5 h-3.5 text-blue-300" />
                                  </div>
                                )}
                              </div>

                              {/* Card Bottom Title */}
                              <div>
                                <h4 className="text-[7px] sm:text-[8px] font-bold text-white leading-tight truncate">
                                  {card.title}
                                </h4>
                                <p className="text-[5.5px] sm:text-[6.5px] text-neutral-400 truncate">
                                  {card.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Stage Floor Reflection under each card */}
                            <div className="w-full h-2 sm:h-3 opacity-25 mt-0.5 overflow-hidden pointer-events-none transform scale-y-[-1] blur-[0.5px]">
                              <div className={`h-full w-full rounded-t-sm ${isActive ? 'bg-gradient-to-b from-blue-500/40 to-transparent' : 'bg-gradient-to-b from-white/15 to-transparent'}`} />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                  </div>

                </div>

                {/* Screen Bottom Strip: Interactive 6 Services Navigator */}
                <div className="w-full px-2 sm:px-3 py-1 bg-[#070A12]/95 border-t border-white/10 flex items-center justify-between text-[6px] sm:text-[7.5px] select-none shrink-0 overflow-x-auto gap-1 sm:gap-2">
                  {posterCards.map((card, idx) => {
                    const isCurrent = activeCardIndex === idx;
                    return (
                      <button
                        key={card.id}
                        onClick={() => {
                          setActiveCardIndex(idx);
                          setShowServicesModal(false);
                        }}
                        className={`flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-xs'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, {
                          className: `w-2 h-2 ${isCurrent ? 'text-amber-400' : 'text-neutral-400'}`,
                        })}
                        <span className="truncate">{card.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* In-Screen Services Hub Directory Modal */}
                <AnimatePresence>
                  {showServicesModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-50 bg-[#060914]/95 backdrop-blur-xl p-2.5 sm:p-3.5 flex flex-col justify-between overflow-y-auto"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                          <span className="text-[7.5px] sm:text-[9.5px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                            SERVICES DIRECTORY · RUDRAKSH INNOVATIONS
                          </span>
                        </div>
                        <button
                          onClick={() => setShowServicesModal(false)}
                          aria-label="Close Services Directory"
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 my-auto py-1.5">
                        {posterCards.map((service, idx) => (
                          <div
                            key={service.id}
                            onClick={() => {
                              setActiveCardIndex(idx);
                              setShowServicesModal(false);
                            }}
                            className={`p-1.5 sm:p-2 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                              activeCardIndex === idx
                                ? 'bg-amber-500/15 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-400/40'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-0.5">
                              <div className="p-1 rounded bg-black/50">
                                {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, {
                                  className: 'w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400',
                                })}
                              </div>
                              <span className="text-[6.5px] sm:text-[7.5px] font-mono text-amber-400 font-bold">{service.indexStr}</span>
                            </div>
                            <div>
                              <h4 className="text-[7.5px] sm:text-[9px] font-bold text-white leading-tight">
                                {service.title}
                              </h4>
                              <p className="text-[5.5px] sm:text-[7px] text-neutral-400 mt-0.5 line-clamp-1">
                                {service.subtitle}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[6.5px] sm:text-[8px]">
                        <button
                          onClick={() => {
                            setShowServicesModal(false);
                            onExploreWork();
                          }}
                          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Explore Detailed Services Section</span>
                          <ArrowRight className="w-2 h-2" />
                        </button>
                        <span className="text-neutral-500 font-mono">6 CORE DISCIPLINES</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* FULLSCREEN DISPLAY VIEW: Maximized interface of the Agency Stage         */
          /* ========================================================================= */
          <div className="relative w-full rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 bg-[#090C16] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden">
            
            {/* Glowing Ambient High-Tech Wallpaper & 3D Stage Background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#060810] via-[#090D1A] to-[#04060B]">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.22) 1.2px, transparent 1.2px)`,
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#F59E0B]/30 via-[#D97706]/15 to-transparent blur-3xl" />
              <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#38BDF8]/28 via-[#818CF8]/20 to-transparent blur-3xl" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#0F172A]/80 via-[#0C101D]/40 to-transparent" />
              <div className="absolute bottom-1/3 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/25 to-transparent" />
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent" />
            </div>

            {/* Top Monitor Glare Line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none z-10" />

            {/* Split: Left Headline Copy + Right Carousel Poster */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-6 sm:py-8 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#F59E0B] uppercase font-semibold">
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>IDEAS · TECHNOLOGY · IMPACT</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] font-sans">
                  INNOVATE<br />
                  TODAY FOR A<br />
                  <span className="text-[#F59E0B]">
                    BETTER TOMORROW
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-md font-normal">
                  We build intelligent digital solutions that help businesses grow, transform, and stay ahead in the ever-changing world.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onExploreWork}
                    className="px-6 py-3 rounded-lg bg-[#F59E0B] hover:bg-amber-400 text-black text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_20px_rgba(245,158,11,0.35)] active:scale-95"
                  >
                    <span>Explore Our Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onBookConsultation}
                    className="px-6 py-3 rounded-lg bg-black/40 hover:bg-white/10 text-white border border-white/20 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer active:scale-95"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>

              {/* Right Column: Carousel Poster */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
                
                <button
                  onClick={handlePrev}
                  aria-label="Previous card"
                  className="absolute left-0 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#F59E0B] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next card"
                  className="absolute right-0 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#F59E0B] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center -space-x-8 sm:-space-x-10 select-none">
                  {posterCards.map((card, idx) => {
                    const offset = idx - activeCardIndex;
                    const isActive = offset === 0;
                    const isLeft = offset === -1 || (offset === posterCards.length - 1 && activeCardIndex === 0);
                    const isRight = offset === 1 || (offset === -(posterCards.length - 1) && activeCardIndex === posterCards.length - 1);
                    const isVisible = isActive || isLeft || isRight;

                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={card.id}
                        layout
                        onClick={() => {
                          if (isActive) setSelectedPoster(card);
                          else setActiveCardIndex(idx);
                        }}
                        animate={{
                          opacity: isActive ? 1 : 0.65,
                          scale: isActive ? 1 : 0.88,
                          zIndex: isActive ? 25 : 10,
                        }}
                        transition={{ duration: 0.4 }}
                        className={`relative cursor-pointer transition-all duration-300 ${
                          isActive ? 'w-[250px] sm:w-[290px] md:w-[320px]' : 'w-[190px] sm:w-[220px]'
                        }`}
                      >
                        <div
                          className={`rounded-2xl p-6 backdrop-blur-2xl border flex flex-col justify-between transition-all duration-300 min-h-[350px] ${
                            isActive
                              ? 'bg-[#0E152A] border-amber-400/60 shadow-[0_15px_50px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/30'
                              : 'bg-[#080B16]/90 border-white/10 opacity-80'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                              {card.icon}
                            </div>
                            <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              <span>{card.indexStr}</span>
                            </span>
                          </div>

                          <div className="my-auto py-4 flex flex-col items-center justify-center">
                            {card.graphicType === 'ai-globe' ? (
                              <div className="relative w-32 h-32 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-blue-600/35 blur-xl animate-pulse" />
                                <div className="relative w-24 h-24 rounded-full border-2 border-blue-400 bg-gradient-to-tr from-blue-950 via-sky-600 to-indigo-950 shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center overflow-hidden">
                                  <div className="w-full h-full border border-blue-300/40 rounded-full animate-spin duration-1000" style={{ animationDuration: '14s' }} />
                                  <div className="absolute inset-2 border border-dashed border-white/40 rounded-full" />
                                  <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#60A5FA]" />
                                </div>
                              </div>
                            ) : card.graphicType === 'cloud-network' ? (
                              <div className="w-20 h-20 rounded-2xl bg-blue-950/60 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                                <Cloud className="w-10 h-10 text-blue-300" />
                              </div>
                            ) : card.graphicType === 'code-laptop' ? (
                              <div className="w-20 h-20 rounded-2xl bg-sky-950/60 border border-sky-400/50 flex flex-col items-center justify-center text-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.4)] p-2">
                                <Laptop className="w-10 h-10 text-sky-300" />
                                <div className="w-12 h-1 bg-sky-400 mt-1 rounded-full" />
                              </div>
                            ) : card.graphicType === 'cyber-shield' ? (
                              <div className="w-20 h-20 rounded-2xl bg-cyan-950/60 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                                <Shield className="w-10 h-10 text-cyan-300" />
                              </div>
                            ) : card.graphicType === 'social-mesh' ? (
                              <div className="w-20 h-20 rounded-2xl bg-amber-950/60 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                                <Share2 className="w-10 h-10 text-amber-300" />
                              </div>
                            ) : card.graphicType === 'software-core' ? (
                              <div className="w-20 h-20 rounded-2xl bg-purple-950/60 border border-purple-400/50 flex items-center justify-center text-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                                <Cpu className="w-10 h-10 text-purple-300" />
                              </div>
                            ) : (
                              <div className="w-20 h-20 rounded-2xl bg-blue-950/60 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                                <TrendingUp className="w-10 h-10 text-blue-300" />
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                              {card.title}
                            </h3>
                            <p className="text-xs text-neutral-300 mt-1">
                              {card.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Floor Mirror Reflection */}
                        <div className="w-full h-6 opacity-25 mt-1 overflow-hidden pointer-events-none transform scale-y-[-1] blur-[1px]">
                          <div className={`h-full w-full rounded-t-lg ${isActive ? 'bg-gradient-to-b from-blue-500/40 to-transparent' : 'bg-gradient-to-b from-white/15 to-transparent'}`} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Bottom 6 Interactive Services Bar */}
            <div className="px-6 sm:px-10 py-4 border-t border-white/10 bg-[#060810]/95 rounded-b-2xl">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {posterCards.map((service, idx) => {
                  const isCurrent = activeCardIndex === idx;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveCardIndex(idx)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-400/40'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isCurrent ? 'bg-amber-500 text-black' : 'bg-black/60 text-amber-400 border border-white/10'
                      }`}>
                        {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, {
                          className: 'w-4 h-4',
                        })}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">{service.title}</h4>
                        <p className="text-[10px] text-neutral-400 truncate">{service.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}
        </motion.div>

      </div>

      {/* Poster Specification Modal */}
      <AnimatePresence>
        {selectedPoster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0B0F1C] text-white w-full max-w-xl rounded-3xl border border-white/20 p-7 sm:p-9 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPoster(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#F59E0B] uppercase mb-2">
                <span>{selectedPoster.indexStr}</span>
                <span className="text-white/40">·</span>
                <span>{selectedPoster.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                {selectedPoster.title}
              </h3>
              <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                {selectedPoster.tagline}
              </p>

              <div className="space-y-2 mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold block">
                  Core Enterprise Deliverables
                </span>
                <div className="space-y-2">
                  {selectedPoster.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  Ready to deploy this capability?
                </span>
                <button
                  onClick={() => {
                    setSelectedPoster(null);
                    onBookConsultation();
                  }}
                  className="bg-[#F59E0B] hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow flex items-center gap-2"
                >
                  <span>Inquire Now</span>
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

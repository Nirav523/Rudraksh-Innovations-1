import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronUp, ChevronDown, X, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { AGENCY_INFO, TESTIMONIALS } from '../data/agencyData';

interface ClientStoriesProps {
  onCaseInquiry?: (caseTitle: string) => void;
}

interface CaseStudy {
  id: string;
  number: string;
  numeralColor: string;
  headingTop: string;
  headingBottom: string;
  tagline: string;
  sectorTag: string;
  sectorName: string;
  type: string;
  champion: string;
  description: string;
  extendedStory: string;
  deliverables: string[];
  metrics: string[];
  clientQuote: { text: string };
  image: string;
  imageAlt: string;
  layoutVariant: 'left-text' | 'right-text';
  btnText: string;
}

interface CaseCardProps {
  item: CaseStudy;
  index: number;
  totalCases: number;
  onSelect: (item: CaseStudy) => void;
  onScrollTo: (index: number) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({
  item,
  index,
  totalCases,
  onSelect,
  onScrollTo,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms for numerals, banner, and text
  const yNumeral = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yText = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <div
      ref={cardRef}
      id={`why-us-case-${index}`}
      className={`relative w-full border-b border-white/10 px-4 sm:px-8 lg:px-14 py-6 sm:py-8 lg:py-10 transition-colors duration-300 ${
        index % 2 === 0 ? 'bg-[#07090E]' : 'bg-[#090C15]'
      }`}
    >
      {/* Top Micro-Header Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs font-mono font-medium tracking-widest text-neutral-400 uppercase mb-4 sm:mb-6 border-b border-white/10 pb-3">
        {/* Left: Indicator + Pillar Title */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1 w-3.5 sm:w-4">
            <span className="h-0.5 w-full bg-[#F59E0B] block" />
            <span className="h-0.5 w-full bg-white block" />
            <span className="h-0.5 w-2/3 bg-neutral-500 block" />
          </div>
          <span className="text-white font-semibold tracking-wider">
            {item.sectorTag} · {item.sectorName}
          </span>
        </div>

        {/* Center: Brand Typography with Official Logo */}
        <div className="text-center select-none hidden sm:flex items-center gap-2.5 justify-center">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0">
            <img
              src="/assets/aistudio/1__2__58ec0766.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-white tracking-[0.2em] leading-none">
              THE RUDRAKSH DNA
            </span>
            <span className="text-[8.5px] text-[#F59E0B] tracking-[0.25em] font-normal leading-none mt-0.5">
              SOUL & SCIENCE · AHMEDABAD, GUJARAT
            </span>
          </div>
        </div>

        {/* Right: CONTACT Link */}
        <a
          href="#contact"
          className="text-neutral-300 hover:text-[#F59E0B] font-semibold tracking-widest transition-colors cursor-pointer"
        >
          CONTACT US
        </a>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto relative">
        {/* Desktop Side Pagination Track */}
        <div className="hidden xl:flex flex-col items-center gap-2 absolute -right-8 top-1/2 -translate-y-1/2 z-20 text-[10px] text-neutral-400 select-none">
          <button
            onClick={() => onScrollTo(Math.max(0, index - 1))}
            aria-label="Previous case"
            className="p-1 hover:text-white cursor-pointer"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <div className="flex flex-col items-center gap-1.5 my-1">
            {Array.from({ length: totalCases }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => onScrollTo(dotIdx)}
                aria-label={`Go to case ${dotIdx + 1}`}
                className={`transition-all cursor-pointer ${
                  dotIdx === index
                    ? 'w-1 h-3.5 bg-[#F59E0B] rounded-full'
                    : 'w-1 h-1 bg-neutral-600 rounded-full hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => onScrollTo(Math.min(totalCases - 1, index + 1))}
            aria-label="Next case"
            className="p-1 hover:text-white cursor-pointer"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Layout Variant 1: Left Text Heading, Center Photo, Right Giant Number */}
        {item.layoutVariant === 'left-text' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Left Column: Monumental Condensed Title + Button */}
            <motion.div style={{ y: yText }} className="lg:col-span-4 z-10">
              <h2
                className="font-black uppercase tracking-[-0.05em] leading-[0.82] text-white text-[56px] sm:text-[84px] md:text-[108px] lg:text-[124px] xl:text-[144px] select-none"
                style={{ fontFamily: '"Arial Black", "Impact", "Anton", sans-serif' }}
              >
                <span className="block">{item.headingTop}</span>
                <span className="block">{item.headingBottom}</span>
              </h2>

              {/* Pill Action Button */}
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => onSelect(item)}
                  className="bg-white/10 hover:bg-[#F59E0B] hover:text-black text-white border border-white/20 shadow-sm px-6 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer group active:scale-98"
                >
                  <span>{item.btnText}</span>
                  <span className="font-mono text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Center Column: Photographic Widescreen Banner with Parallax */}
            <motion.div style={{ y: yPhoto }} className="lg:col-span-5 relative z-10 group">
              <div className="relative overflow-hidden shadow-xl border border-white/10 aspect-[16/10] sm:aspect-[16/9] bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                
                {/* Verified Testimonial Overlay Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs">
                  <p className="text-neutral-200 italic line-clamp-2">
                    "{item.clientQuote.text}"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Giant Numeral with Parallax */}
            <div className="lg:col-span-3 relative min-h-[300px] flex flex-col justify-center">
              <motion.div
                style={{
                  y: yNumeral,
                  color: item.numeralColor,
                  fontFamily: '"Arial Black", "Impact", sans-serif',
                  lineHeight: 0.75,
                }}
                className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none opacity-80 text-[220px] sm:text-[300px] lg:text-[380px] xl:text-[420px]"
              >
                {item.number}
              </motion.div>

              {/* Overlapping Info Card */}
              <div className="relative z-10 pl-2 lg:pl-6 space-y-3 max-w-xs">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span>{item.sectorTag}</span>
                </div>

                <div className="text-xs font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                  {item.tagline}
                </div>

                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  <span className="w-6 h-[1px] bg-neutral-600" />
                  <span>RUDRAKSH PHILOSOPHY</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout Variant 2: Left Giant Number, Center Photo, Right Text Heading */}
        {item.layoutVariant === 'right-text' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Left Column: Giant Numeral with Parallax */}
            <div className="lg:col-span-3 relative min-h-[300px] flex flex-col justify-center order-2 lg:order-1">
              <motion.div
                style={{
                  y: yNumeral,
                  color: item.numeralColor,
                  fontFamily: '"Arial Black", "Impact", sans-serif',
                  lineHeight: 0.75,
                }}
                className="absolute left-0 lg:-left-2 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none opacity-80 text-[220px] sm:text-[300px] lg:text-[380px] xl:text-[420px]"
              >
                {item.number}
              </motion.div>

              <div className="relative z-10 pr-2 lg:pr-4 space-y-3 max-w-xs">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span>{item.sectorTag}</span>
                  <span className="text-neutral-500">·</span>
                  <span>{item.sectorName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 border-t border-b border-white/10 py-1.5">
                  <div>
                    <span className="block text-neutral-500">METHOD</span>
                    <span className="font-semibold text-white">AI-Powered</span>
                  </div>
                  <div>
                    <span className="block text-neutral-500">BENCHMARK</span>
                    <span className="font-semibold text-amber-400">4.8x ROAS</span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Center Column: Photographic Widescreen Banner with Parallax */}
            <motion.div style={{ y: yPhoto }} className="lg:col-span-5 relative z-10 group order-1 lg:order-2">
              <div className="relative overflow-hidden shadow-xl border border-white/10 aspect-[16/10] sm:aspect-[16/9] bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs">
                  <p className="text-neutral-200 italic line-clamp-2">
                    "{item.clientQuote.text}"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Monumental Condensed Title + Button */}
            <motion.div style={{ y: yText }} className="lg:col-span-4 z-10 order-3">
              <h2
                className="font-black uppercase tracking-[-0.05em] leading-[0.82] text-white text-[56px] sm:text-[84px] md:text-[108px] lg:text-[124px] xl:text-[144px] select-none"
                style={{ fontFamily: '"Arial Black", "Impact", "Anton", sans-serif' }}
              >
                <span className="block">{item.headingTop}</span>
                <span className="block">{item.headingBottom}</span>
              </h2>

              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => onSelect(item)}
                  className="bg-white/10 hover:bg-[#F59E0B] hover:text-black text-white border border-white/20 shadow-sm px-6 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer group active:scale-98"
                >
                  <span>{item.btnText}</span>
                  <span className="font-mono text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ClientStories: React.FC<ClientStoriesProps> = ({ onCaseInquiry }) => {
  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);

  // 3 Pillars matching The Rudraksh DNA (Soul & Science + Core Values) from rudrakshinnovations.com
  const cases: CaseStudy[] = [
    {
      id: 'case-01',
      number: '1',
      numeralColor: '#E5B842',
      headingTop: 'THE',
      headingBottom: 'SOUL',
      tagline: 'ANCIENT WISDOM & LASER FOCUS',
      sectorTag: 'DNA PILLAR 01',
      sectorName: 'Focus & Clarity',
      type: 'Brand Soul & Organic Reach',
      champion: 'Rudraksh Innovations Collective',
      description:
        "The name 'Rudraksh' symbolizes focus, clarity, and protection. In a world saturated with digital noise, we cut through the chaos to focus your message with laser precision.",
      extendedStory:
        "In today's hyper-saturated algorithmic feeds, attention spans are measured in milliseconds. The Soul of Rudraksh Innovations is about uncovering the foundational truth of your business, crafting uncompromising visual hooks, and orchestrating culture rather than broadcasting noise.",
      deliverables: [
        'Strategic Narrative Architecture',
        '3-Second Viral Hook Calibration',
        'High-Retention Short-Form Reels',
        'Brand Voice & Aesthetic Governance',
      ],
      metrics: ['+300% Organic Engagement', '45M+ Combined Views', '99.4% Client Retention'],
      clientQuote: {
        text: "Rudraksh Innovations completely revolutionized our online presence. Our engagement is up 300% in just 3 months. Professional, visionary, and thoroughly results-driven.",
      },
      image: '/assets/aistudio/download__30__3fd7331b.jpg',
      imageAlt: 'Rudraksh Innovations war room team strategy and tactical digital execution',
      layoutVariant: 'left-text',
      btnText: 'READ THE SOUL',
    },
    {
      id: 'case-02',
      number: '2',
      numeralColor: '#A2866E',
      headingTop: 'THE',
      headingBottom: 'SCIENCE',
      tagline: 'INTEGRATED DIGITAL MASTERY',
      sectorTag: 'DNA PILLAR 02',
      sectorName: 'Innovation Engine',
      type: 'AI Frameworks & Paid Acquisition',
      champion: 'Proprietary Scale Engine',
      description:
        'We are more than a marketing agency. We build cohesive digital ecosystems through intelligent marketing, proprietary AI frameworks, high-performance web platforms, and data-first methodologies.',
      extendedStory:
        'Growth is mathematical. By uniting high-velocity creative testing with server-side conversion APIs, predictive bid architectures, and sub-second web platforms, we turn digital marketing into a predictable, compounding customer acquisition engine.',
      deliverables: [
        'Multi-Tier Meta & Google Ad Architectures',
        'Server-Side Conversion APIs & Telemetry',
        'Automated DM & Lifecycle Drip Journeys',
        'Interactive 3D WebGL Web Platforms',
      ],
      metrics: ['4.8x Blended ROAS Benchmark', 'Sub-Second Edge Speeds', 'Automated Lead Funnels'],
      clientQuote: {
        text: "Professional, futuristic, and results-driven. The best agency we've ever worked with. Their growth protocol systematically pinpointed our bottlenecks and scaled our Meta ad ROI.",
      },
      image: '/assets/aistudio/Impact_de_Microsoft_365_sur_la_collaboration_d_quipe_0f35ef12.jpg',
      imageAlt: 'Rudraksh Innovations creative collaboration and multidisciplinary engineering studio',
      layoutVariant: 'right-text',
      btnText: 'READ THE SCIENCE',
    },
    {
      id: 'case-03',
      number: '3',
      numeralColor: '#46BCD7',
      headingTop: 'OUR',
      headingBottom: 'VALUES',
      tagline: 'RADICAL TRANSPARENCY & OBSESSIVE ROI',
      sectorTag: 'DNA PILLAR 03',
      sectorName: 'Guiding Principles',
      type: 'Transparency, ROI & Courage',
      champion: 'Client Partnership Model',
      description:
        'No vanity metrics or smoke screens. Every rupee invested must trace back to measurable customer acquisition, qualified leads, and sustainable brand equity.',
      extendedStory:
        'We operate with three non-negotiables: Radical Transparency (honest real-time dashboards), Obsessive ROI (tangible revenue attribution over empty likes), and Creative Courage (audacious creative concepts that break through monotonous feed feeds).',
      deliverables: [
        'Live Real-Time ROI Analytics Dashboards',
        'Weekly Video Standups & Direct Slack Channel',
        'Unfiltered Ad Spend & Conversion Audits',
        'Zero Lock-In Flexible Retainer Structures',
      ],
      metrics: ['100% Transparent Attribution', 'Zero Vanity Smoke Screens', 'Top-Tier Client Satisfaction'],
      clientQuote: {
        text: "Rudraksh Innovations brought surgical clarity to our social presence. The quality of their reel production and algorithmic targeting elevated our brand perception immediately.",
      },
      image: '/assets/aistudio/Rudraksh_Innovations__Future-Ready_Workspace_33064468.png',
      imageAlt: 'Rudraksh Innovations clean future-ready executive workspace and client delivery',
      layoutVariant: 'left-text',
      btnText: 'VIEW VALUES',
    },
  ];

  const scrollToCase = (index: number) => {
    const el = document.getElementById(`why-us-case-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquiryFromModal = (caseTitle: string) => {
    setActiveModalCase(null);
    if (onCaseInquiry) {
      onCaseInquiry(`Inquiry regarding DNA Pillar: ${caseTitle}`);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="why-us" className="relative bg-[#07090E] text-white overflow-hidden font-sans border-t border-b border-white/5">
      {/* Editorial Spread Cards in Unified Palette */}
      <div className="w-full">
        {cases.map((item, index) => (
          <CaseCard
            key={item.id}
            item={item}
            index={index}
            totalCases={cases.length}
            onSelect={setActiveModalCase}
            onScrollTo={scrollToCase}
          />
        ))}
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeModalCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0E121E] text-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] border border-white/15 shadow-2xl relative p-6 sm:p-10"
            >
              <button
                onClick={() => setActiveModalCase(null)}
                aria-label="Close modal"
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#F59E0B] uppercase mb-4">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0">
                  <img
                    src="/assets/aistudio/1__2__58ec0766.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>{activeModalCase.sectorTag}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/70">{activeModalCase.sectorName}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 font-sans">
                {activeModalCase.headingTop} {activeModalCase.headingBottom}
              </h3>
              <p className="text-sm font-mono text-[#F59E0B] mb-6">
                {activeModalCase.tagline}
              </p>

              <div className="w-full aspect-[21/9] rounded-xl overflow-hidden mb-8 border border-white/10">
                <img
                  src={activeModalCase.image}
                  alt={activeModalCase.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono font-semibold tracking-widest text-neutral-400 uppercase">
                    The Rudraksh Philosophy
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {activeModalCase.extendedStory}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {activeModalCase.description}
                  </p>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4">
                    <Quote className="w-5 h-5 text-amber-400 mb-2" />
                    <p className="text-xs sm:text-sm text-neutral-200 italic">
                      "{activeModalCase.clientQuote.text}"
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-6">
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase block font-semibold">
                      Quantifiable Results
                    </span>
                    <ul className="space-y-2">
                      {activeModalCase.metrics.map((metric, mIdx) => (
                        <li key={mIdx} className="flex items-center gap-2 text-xs font-bold text-white">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block font-semibold mb-2">
                      Methodology Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {activeModalCase.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  Ready to deploy this level of clarity and scale for your brand?
                </span>
                <button
                  onClick={() =>
                    handleInquiryFromModal(`${activeModalCase.headingTop} ${activeModalCase.headingBottom}`)
                  }
                  className="w-full sm:w-auto bg-[#F59E0B] hover:bg-amber-400 text-black px-7 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
                >
                  <span>INQUIRE ABOUT THIS STANDARD</span>
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

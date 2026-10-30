import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Growth',
      subtitle: 'Emerging Brands & Local Businesses',
      priceMonthly: currency === 'INR' ? '₹6,999' : '$199',
      priceYearly: currency === 'INR' ? '₹5,599' : '$159',
      period: '/m',
      isFeatured: false,
      features: [
        '16 High-Quality Social Posts / Month',
        'Active Community Management & Responses',
        'Monthly In-Depth Performance & Analytics Report',
        '1 Produced Viral Reel / Short / Month',
        'Audience Tone & Monthly Content Calendar',
        'Standard Turnaround & Dedicated WhatsApp Support',
      ],
      cta: 'Choose Starter Plan',
      ctaType: 'outline',
    },
    {
      id: 'growth',
      name: 'Growth Scale',
      subtitle: 'Accelerated Scaling & Paid Media',
      priceMonthly: currency === 'INR' ? '₹10,499' : '$349',
      priceYearly: currency === 'INR' ? '₹8,399' : '$279',
      period: '/m',
      isFeatured: true,
      features: [
        '20 High-Converting Social Posts / Month',
        '2 Produced High-Retention Reels / Shorts / Month',
        'Full Community Management & Daily Engagement',
        'Paid Ad Campaign Management (Meta & Google)',
        'Bi-Weekly In-Depth Growth & ROI Reports',
        'Dedicated Senior Account Manager',
        'Audience Retargeting & Custom Audiences Setup',
      ],
      cta: 'Choose Growth Plan',
      ctaType: 'solid-amber',
    },
    {
      id: 'enterprise',
      name: 'Dominance Enterprise',
      subtitle: 'High-Growth Brands & Institutions',
      priceMonthly: 'Custom',
      priceYearly: 'Custom',
      period: '',
      isFeatured: false,
      features: [
        'Unlimited Posts & Bespoke Creative Assets',
        'Daily High-End Reel Production & Cinematic Scripting',
        'Full Multi-Channel Paid Ad Architecture (Meta & Google)',
        'Custom Web & Software Development (SaaS & 3D WebGL)',
        'Dedicated Full Creative & Software Performance Squad',
        '24/7 Priority VIP Direct Slack / WhatsApp Channel',
        'Full Brand Identity System & Conversion Consulting',
      ],
      cta: 'Discuss Custom Plan',
      ctaType: 'outline',
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yCards = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} id="packages" className="py-10 sm:py-14 relative bg-[#07090E] overflow-hidden text-white border-t border-b border-white/5 font-sans">
      {/* Background radial gradient glow in theme colors with parallax */}
      <motion.div
        style={{ y: yGlow }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#F59E0B]/10 via-[#38BDF8]/5 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* Giant Background "Pricing" Typography with Parallax Drift */}
      <motion.div
        style={{ y: yTitle }}
        className="absolute top-4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0"
      >
        <span className="font-extrabold tracking-tight text-[100px] sm:text-[180px] md:text-[250px] lg:text-[290px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-white/30 to-white/5 opacity-90 inline-block drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]">
          Pricing
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 pt-8 sm:pt-12 md:pt-14">
        
        {/* Header Indicator with Company Logo */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/1__2__58ec0766.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
              RUDRAKSH INNOVATIONS PACKAGES
            </span>
          </div>

          {/* Currency Switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] font-mono">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                currency === 'INR' ? 'bg-[#F59E0B] text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-[#F59E0B] text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* 3 Phone-Proportioned Glass Cards with Parallax Elevation */}
        <motion.div
          style={{ y: yCards }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto"
        >
          {plans.map((plan, planIdx) => {
            const displayPrice = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`w-full rounded-[38px] p-8 sm:p-9 flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl transition-all ${
                  plan.isFeatured
                    ? 'bg-[#0D1220]/95 border border-amber-500/40 shadow-[0_30px_90px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/30'
                    : 'bg-[#0A0A12]/85 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
                }`}
                style={{
                  minHeight: '580px',
                }}
              >
                {/* Smartphone curved glossy rim highlight reflection at top edge */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/[0.14] via-white/[0.03] to-transparent pointer-events-none rounded-t-[38px]" />
                <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-36 bg-amber-500/[0.12] rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Top: Price and Subtitle */}
                  <div className="pt-2 pb-6">
                    {plan.isFeatured && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider mb-3">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Most Popular Choice</span>
                      </span>
                    )}

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-sans">
                        {displayPrice}
                      </span>
                      {plan.period && (
                        <span className="text-xl sm:text-2xl font-normal text-neutral-400">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white mt-2">
                      {plan.name}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {plan.subtitle}
                    </div>
                  </div>

                  {/* Clean Thin Divider Line */}
                  <div className="w-full h-[1px] bg-white/10 mb-8" />

                  {/* Checklist Items with Circular Dark Badges */}
                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 text-xs sm:text-[13px] text-neutral-300">
                        <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-amber-400 stroke-[2.5]" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-8">
                  {plan.ctaType === 'solid-amber' ? (
                    <button
                      onClick={() => onSelectPlan(`${plan.name} (${currency} ${displayPrice})`)}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-black font-bold text-xs tracking-wider uppercase active:scale-98 transition-all shadow-[0_10px_25px_rgba(245,158,11,0.3)] cursor-pointer"
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectPlan(`${plan.name} (${currency} ${displayPrice})`)}
                      className="w-full py-3.5 rounded-full border border-white/20 bg-white/[0.04] text-white font-medium text-xs tracking-wider uppercase hover:bg-white/10 active:scale-98 transition-all cursor-pointer hover:border-amber-400/40"
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Toggle Switch: Billed Yearly */}
        <div className="flex justify-center items-center gap-3 mt-14 pt-2">
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Toggle billed yearly"
          >
            <div
              className={`w-13 h-7 rounded-full p-1 transition-colors duration-200 flex items-center ${
                isYearly ? 'bg-[#F59E0B]' : 'bg-neutral-800 border border-white/20'
              }`}
            >
              <motion.div
                className={`w-5 h-5 rounded-full shadow-md ${
                  isYearly ? 'bg-black ml-auto' : 'bg-white mr-auto'
                }`}
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
              Billed Yearly (20% Savings)
            </span>
          </button>

          {isYearly && (
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full animate-in fade-in">
              Save 20%
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

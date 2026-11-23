import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      id: 'starter',
      name: 'Starter Growth',
      subtitle: 'Emerging Brands & Local Businesses',
      priceLabel: 'Custom Price',
      isFeatured: false,
      features: [
        '16 High-Quality Social Posts / Month',
        'Active Community Management & Responses',
        'Monthly In-Depth Performance & Analytics Report',
        '1 Produced Viral Reel / Short / Month',
        'Audience Tone & Monthly Content Calendar',
        'Standard Turnaround & Dedicated WhatsApp Support',
      ],
      cta: 'Get Custom Quote',
      ctaType: 'outline',
    },
    {
      id: 'growth',
      name: 'Growth Scale',
      subtitle: 'Accelerated Scaling & Paid Media',
      priceLabel: 'Custom Price',
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
      cta: 'Get Custom Quote',
      ctaType: 'solid-amber',
    },
    {
      id: 'enterprise',
      name: 'Dominance Enterprise',
      subtitle: 'High-Growth Brands & Institutions',
      priceLabel: 'Custom Price',
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
        <span className="font-extrabold tracking-tight text-[70px] xs:text-[85px] sm:text-[180px] md:text-[250px] lg:text-[290px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-white/30 to-white/5 opacity-90 inline-block drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]">
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

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>CUSTOM PRICING · TAILORED TO SCOPE</span>
          </div>
        </div>

        {/* 3 Phone-Proportioned Glass Cards with Parallax Elevation */}
        <motion.div
          style={{ y: yCards }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
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
                {/* Top: Custom Price and Subtitle */}
                <div className="pt-2 pb-6">
                  {plan.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider mb-3">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Most Popular Choice</span>
                    </span>
                  )}

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                      {plan.priceLabel}
                    </span>
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
                    onClick={() => onSelectPlan(`${plan.name} (Custom Price)`)}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-black font-bold text-xs tracking-wider uppercase active:scale-98 transition-all shadow-[0_10px_25px_rgba(245,158,11,0.3)] cursor-pointer"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectPlan(`${plan.name} (Custom Price)`)}
                    className="w-full py-3.5 rounded-full border border-white/20 bg-white/[0.04] text-white font-medium text-xs tracking-wider uppercase hover:bg-white/10 active:scale-98 transition-all cursor-pointer hover:border-amber-400/40"
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Custom Pricing Note */}
        <div className="flex justify-center items-center mt-12 pt-2 text-center">
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Every engagement is custom-quoted based on your brand goals, channels, and deliverables.
          </p>
        </div>
      </div>
    </section>
  );
};

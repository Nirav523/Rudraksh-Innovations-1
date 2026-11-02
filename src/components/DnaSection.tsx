import React from 'react';
import { motion } from 'motion/react';
import { AGENCY_INFO } from '../data/agencyData';
import { Compass, Shield, Cpu, Target, Award, Sparkles, ChevronRight } from 'lucide-react';

export const DnaSection: React.FC = () => {
  const { philosophy } = AGENCY_INFO;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#FFFCF7]">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#E4D3AE]/25 blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-[#B6A1D9]/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#79736B] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]" />
            <span>THE RUDRAKSH DNA</span>
            <span aria-hidden="true" className="text-[#C6A66B]">·</span>
            <span className="text-[#4B2A68]">PHILOSOPHY & VISION</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#25232A] mb-4">
            {philosophy.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#79736B] leading-relaxed">
            We're not just another agency. We combine the timeless principles of focus, clarity, and protection with modern technology, creative thinking, and data-driven execution.
          </p>
        </div>

        {/* Two Complementary Worlds: The Soul & The Science */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Part A: The Soul (Span 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-[#C6A66B]/35 bg-[#F8F5EF] p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Compass className="w-48 h-48 text-[#4B2A68]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6A66B] mb-2">
                <Shield className="w-4 h-4 text-[#C6A66B]" />
                <span>Part A · Ancient Wisdom</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#25232A] mb-4">
                {philosophy.soulSubtitle}
              </h3>
              <p className="text-base text-[#79736B] leading-relaxed mb-8">
                {philosophy.soulDesc}
              </p>

              {/* Core Values */}
              <div className="space-y-4 pt-6 border-t border-[#C6A66B]/20">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4B2A68] mb-3">
                  Core Invariant Values
                </h4>
                {philosophy.values.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#C6A66B]/25 hover:border-[#C6A66B]/60 transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-[#25232A] mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#C6A66B]" />
                      <span>{val.name}</span>
                    </div>
                    <p className="text-xs text-[#79736B] leading-relaxed pl-4">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Part B: The Science (Span 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-[#C6A66B]/35 bg-gradient-to-br from-[#FFFCF7] to-[#F8F5EF] p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Cpu className="w-48 h-48 text-[#C6A66B]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4B2A68] mb-2">
                <Cpu className="w-4 h-4 text-[#4B2A68]" />
                <span>Part B · Integrated Digital Mastery</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#25232A] mb-4">
                {philosophy.scienceSubtitle}
              </h3>
              <p className="text-base text-[#79736B] leading-relaxed mb-8">
                {philosophy.scienceDesc}
              </p>

              {/* Mission & Vision Cards */}
              <div className="space-y-4 pt-6 border-t border-[#C6A66B]/20">
                <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#C6A66B]/30 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4B2A68] mb-2">
                    <Target className="w-4 h-4 text-[#C6A66B]" />
                    <span>Our Mission</span>
                  </div>
                  <p className="text-sm text-[#25232A] leading-relaxed italic">
                    "{philosophy.mission}"
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#C6A66B]/30 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4B2A68] mb-2">
                    <Award className="w-4 h-4 text-[#C6A66B]" />
                    <span>Our Vision</span>
                  </div>
                  <p className="text-sm text-[#25232A] leading-relaxed italic">
                    "{philosophy.vision}"
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C6A66B]/20 flex items-center justify-between text-xs text-[#79736B]">
              <span>Strategic IT & Marketing Synergy</span>
              <span className="font-mono text-[#4B2A68] font-semibold">100% Cohesive Ecosystem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

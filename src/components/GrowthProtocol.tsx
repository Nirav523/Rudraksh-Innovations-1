import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GROWTH_STAGES, GrowthStage } from '../data/agencyData';
import { Scan, Sparkles, Crosshair, RefreshCw, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface GrowthProtocolProps {
  onApplyStrategy: () => void;
  onExploreWork: () => void;
}

const stageIcons: Record<string, React.ReactNode> = {
  '01': <Scan className="w-5 h-5 text-[#C6A66B]" />,
  '02': <Sparkles className="w-5 h-5 text-[#4B2A68]" />,
  '03': <Crosshair className="w-5 h-5 text-[#C6A66B]" />,
  '04': <RefreshCw className="w-5 h-5 text-[#4B2A68]" />,
};

export const GrowthProtocol: React.FC<GrowthProtocolProps> = ({
  onApplyStrategy,
  onExploreWork,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = GROWTH_STAGES[activeStageIndex];

  return (
    <section id="strategy" className="py-24 relative bg-[#F8F5EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-[#C6A66B]/25">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#79736B] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]" />
              <span>OUR METHOD</span>
              <span aria-hidden="true" className="text-[#C6A66B]">·</span>
              <span className="text-[#4B2A68]">PROVEN 4-STAGE STRATEGY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#25232A]">
              Our Growth Protocol
            </h2>
            <p className="font-serif italic text-xl text-[#4B2A68] mt-1">
              From Stranger to Loyal Customer: The 4-Stage Strategy.
            </p>
          </div>
          <p className="text-sm sm:text-base text-[#79736B] max-w-md leading-relaxed">
            A systematic, data-calibrated progression taking prospective audiences from zero awareness to active brand advocates.
          </p>
        </div>

        {/* 4 Interactive Timeline Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
          {GROWTH_STAGES.map((stg, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stg.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-[#FFFCF7] border-[#C6A66B] shadow-[0_8px_25px_-5px_rgba(198,166,107,0.18)]'
                    : 'bg-[#FFFCF7]/60 border-[#C6A66B]/20 hover:border-[#C6A66B]/50 hover:bg-[#FFFCF7]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-xl font-bold text-[#C6A66B]">
                    Stage {stg.step}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#F8F5EF] flex items-center justify-center">
                    {stageIcons[stg.step]}
                  </div>
                </div>
                <div className="text-sm font-bold text-[#25232A] mb-1">
                  {stg.title}
                </div>
                <div className="text-xs text-[#79736B]">
                  {stg.category}
                </div>

                {isActive && (
                  <motion.div
                    layoutId="growth-active-pill"
                    className="absolute inset-x-0 -bottom-[1px] h-[3px] bg-gradient-to-r from-[#C6A66B] to-[#4B2A68] rounded-b-2xl"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-[#C6A66B]/35 bg-[#FFFCF7] p-8 sm:p-12 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Problem & Solution Architecture */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6A66B]">
                  <span>Stage {currentStage.step} Breakdown</span>
                  <span>·</span>
                  <span>{currentStage.category}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#25232A]">
                  {currentStage.title}
                </h3>

                {/* Problem vs Solution Callouts */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/60 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-rose-900 uppercase tracking-wider mb-1">
                        The Core Pitfall
                      </div>
                      <p className="text-sm text-rose-950/80">
                        "{currentStage.problem}"
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#C6A66B]/30 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#4B2A68] uppercase tracking-wider mb-1">
                        The Rudraksh Execution
                      </div>
                      <p className="text-sm text-[#25232A] leading-relaxed">
                        {currentStage.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Deliverable */}
                <div className="pt-2 flex items-center gap-3 text-xs">
                  <span className="text-[#79736B] uppercase font-semibold">Primary Output:</span>
                  <span className="font-serif font-bold text-base text-[#4B2A68] bg-[#E4D3AE]/30 px-3 py-1 rounded-lg border border-[#C6A66B]/30">
                    {currentStage.deliverable}
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Strategy Display & Action Card */}
              <div className="lg:col-span-5 rounded-2xl border border-[#C6A66B]/25 bg-[#F8F5EF] p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#79736B] uppercase tracking-wider mb-4 pb-3 border-b border-[#C6A66B]/20">
                    <span>Protocol Milestone</span>
                    <span className="font-mono text-[#4B2A68] font-bold">{currentStage.step} / 04</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#25232A]">
                    <div className="flex items-center justify-between py-2 border-b border-[#C6A66B]/15">
                      <span className="text-[#79736B]">Cadence</span>
                      <span className="font-medium">Iterative & Continuous</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#C6A66B]/15">
                      <span className="text-[#79736B]">Audience Alignment</span>
                      <span className="font-medium">Multi-Touch Attribution</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-[#79736B]">Target Outcome</span>
                      <span className="font-medium text-[#4B2A68] font-semibold">{currentStage.deliverable}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={onApplyStrategy}
                    className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4B2A68] hover:bg-[#381e4f] rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Apply This Strategy to My Business</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onExploreWork}
                    className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#25232A] hover:text-[#4B2A68] bg-[#FFFCF7] rounded-full border border-[#C6A66B]/35 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>See Our Creative Work</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

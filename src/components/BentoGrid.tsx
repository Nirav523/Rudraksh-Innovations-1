import React from 'react';
import { motion } from 'motion/react';
import { SpotlightCard } from './SpotlightCard';
import { AnimatedDock } from './AnimatedDock';
import { DynamicIsland } from './DynamicIsland';
import { MagneticButton } from './MagneticButton';
import { MorphingTabs } from './MorphingTabs';
import { NumberFlow } from './NumberFlow';
import { Sparkles, Layers, Sliders, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

export const BentoGrid: React.FC<{
  onSelectComponent?: (id: string) => void;
}> = ({ onSelectComponent }) => {
  return (
    <div className="space-y-6">
      {/* Bento Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-1">
            <span>21st.dev Component Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Interactions</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Curated 21st.dev & Framer Motion Grid
          </h2>
        </div>
        <p className="text-xs text-neutral-400 max-w-md">
          Zero-pill typography, 60-30-10 color balance, and calibrated spring physics engineered for real production applications.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Cell 1: Animated Floating Dock (Large Span 8) */}
        <div className="lg:col-span-7">
          <SpotlightCard
            title="Interactive macOS Floating Dock"
            subtitle="Physics Scale"
            description="Continuous distance-based icon magnification powered by Framer Motion useSpring and useTransform hooks."
            spotlightColor="rgba(99, 102, 241, 0.2)"
          >
            <div className="mt-4 bg-neutral-950/80 rounded-2xl border border-neutral-800/80 p-4">
              <AnimatedDock />
            </div>
          </SpotlightCard>
        </div>

        {/* Cell 2: Dynamic Island (Span 5) */}
        <div className="lg:col-span-5">
          <SpotlightCard
            title="Expandable Island HUD"
            subtitle="Layout Transition"
            description="Morphing status capsule with popLayout animation and tactile state transitions."
            spotlightColor="rgba(168, 85, 247, 0.2)"
          >
            <div className="mt-2 bg-neutral-950/80 rounded-2xl border border-neutral-800/80 p-4">
              <DynamicIsland />
            </div>
          </SpotlightCard>
        </div>

        {/* Cell 3: Number Flow Counter (Span 4) */}
        <div className="lg:col-span-4">
          <SpotlightCard
            title="Animated Number Flow"
            subtitle="Tabular Numerals"
            description="Strictly aligned tabular figures with spring-loaded vertical roll transitions."
            spotlightColor="rgba(59, 130, 246, 0.2)"
          >
            <NumberFlow initialValue={2840} />
          </SpotlightCard>
        </div>

        {/* Cell 4: Morphing Segmented Tabs (Span 4) */}
        <div className="lg:col-span-4">
          <SpotlightCard
            title="Fluid Morphing Tabs"
            subtitle="Framer Motion layoutId"
            description="Shared layout pill sliding seamlessly between segmented buttons."
            spotlightColor="rgba(16, 185, 129, 0.2)"
          >
            <div className="flex flex-col items-center justify-center py-6">
              <MorphingTabs />
              <div className="mt-4 text-[11px] text-neutral-400">
                Click any tab to observe the seamless sub-pixel layout transition.
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Cell 5: Magnetic Burst & Shimmer CTA (Span 4) */}
        <div className="lg:col-span-4">
          <SpotlightCard
            title="Magnetic Spring Button"
            subtitle="Cursor Gravity"
            description="Attracts toward cursor coordinates within proximity radius, triggering celebratory particle feedback."
            spotlightColor="rgba(236, 72, 153, 0.2)"
          >
            <div className="flex flex-col items-center justify-center py-6 gap-4">
              <MagneticButton
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-indigo-500/25 px-6 py-3 font-semibold text-xs"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Trigger Particle Burst</span>
              </MagneticButton>
              <div className="text-[11px] text-neutral-500">
                Hover to feel magnetic drag, click to fire confetti
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

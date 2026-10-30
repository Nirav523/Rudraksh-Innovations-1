import React, { useState } from 'react';
import { motion } from 'motion/react';
import { getContrastRatio, getNestedBorderRadius } from '../utils/springCalculations';
import { CheckCircle2, XCircle, Sliders, ShieldCheck, Eye, Layers } from 'lucide-react';

export const ProHeuristics: React.FC = () => {
  // WCAG Contrast Tester State
  const [fgColor, setFgColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#0A0A0A');
  const contrast = getContrastRatio(fgColor, bgColor);
  const passesAA = contrast >= 4.5;
  const passesAAA = contrast >= 7.0;

  // Spatial Radius Math State
  const [outerRadius, setOuterRadius] = useState(24);
  const [paddingVal, setPaddingVal] = useState(12);
  const innerRadius = getNestedBorderRadius(outerRadius, paddingVal);

  // AI Slop vs Pro Discipline Toggle
  const [showSlop, setShowSlop] = useState(false);

  // Interaction Latency Tester
  const [latencyMode, setLatencyMode] = useState<number>(100);
  const [lastLatencyRecorded, setLastLatencyRecorded] = useState<number | null>(null);

  const testInteraction = () => {
    const start = performance.now();
    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start);
      setLastLatencyRecorded(elapsed);
    }, latencyMode);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-1">
          <span>Design Constitution</span>
          <span aria-hidden="true">·</span>
          <span>UI/UX Pro Invariants</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          UI/UX Pro Design System & Quality Invariants
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
          Interactive tools verifying accessibility contrast ratios, concentric nested corner geometry, and anti-slop typography discipline.
        </p>
      </div>

      {/* Tool 1: AI Slop vs UI/UX Pro Comparator */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Anti-Slop & Zero-Pill Typography Discipline
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Compare AI defaults against human-crafted 21st.dev editorial standards.
            </p>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setShowSlop(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                !showSlop
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              UI/UX Pro Standard (Clean)
            </button>
            <button
              onClick={() => setShowSlop(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                showSlop
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Generic AI Slop (Banned)
            </button>
          </div>
        </div>

        {/* Card Comparison Box */}
        <div className="max-w-xl mx-auto">
          {showSlop ? (
            /* AI Slop Card (Anti-Pattern Demo) */
            <div className="border-l-4 border-l-purple-500 rounded-2xl border border-neutral-700 bg-gradient-to-r from-purple-900/20 to-neutral-900 p-6 shadow-xl relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-purple-400">// 01_CORE_PIPELINE</span>
                <div className="flex items-center gap-1.5">
                  <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                    TRANSFORMATIVE
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                    ONLINE: 99.8%
                  </span>
                </div>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                SYNTHEX v4.8-CORE AI ACCELERATOR
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Autonomous multi-agent synthesis running at peak cognitive capacity with deep vector neural clusters.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
                <span className="text-neutral-400">98/100 INNOVATION SCORE</span>
                <button className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-medium">
                  Initiate Cyber Sequence
                </button>
              </div>
              <div className="mt-4 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs">
                ⚠️ Violations: Pill badge sandwiches, code-comment title, arbitrary fake score, thick left border, roleplay button label.
              </div>
            </div>
          ) : (
            /* UI/UX Pro Card (Clean Production Grade) */
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 shadow-lg">
              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                <span>Infrastructure</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Automated Pipelines</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="font-mono tabular-nums text-neutral-400">4 min read</span>
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight mb-2">
                Automated Deployment & Build Pipelines
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                Hermetic container environments running deterministic verification with zero dead clicks and strict latency thresholds.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs">
                <span className="text-neutral-400 font-medium">Verified for Production</span>
                <button className="px-4 py-2 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors">
                  Deploy Workspace
                </button>
              </div>
              <div className="mt-4 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Compliant: Clean unboxed metadata, natural editorial title case, single-elevation depth.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tool 2: WCAG AA/AAA Contrast Ratio Calculator */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-1">
          WCAG Contrast Invariant Calculator
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          Calculates relative luminance according to WCAG 2.1 specifications (AA requires ≥ 4.5:1, AAA requires ≥ 7.0:1).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Foreground (Text) Color Hex:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-neutral-700"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="px-3 py-2 text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg text-white w-32 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Background Surface Hex:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-neutral-700"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="px-3 py-2 text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg text-white w-32 uppercase"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div
            className="p-6 rounded-2xl border border-neutral-700 flex flex-col justify-between h-44 transition-colors"
            style={{ backgroundColor: bgColor }}
          >
            <div>
              <div className="text-xs font-medium opacity-80" style={{ color: fgColor }}>
                Sample Preview Surface
              </div>
              <div className="text-lg font-bold mt-1" style={{ color: fgColor }}>
                Readable UI Typography
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-500/20">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold font-mono tabular-nums" style={{ color: fgColor }}>
                  {contrast}:1
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span
                  className={`px-2.5 py-1 rounded-md ${
                    passesAA ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {passesAA ? 'Passes AA' : 'Fails AA'}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-md ${
                    passesAAA ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {passesAAA ? 'Passes AAA' : 'Sub-AAA'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool 3: Spatial Math & Nested Radius */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-1">
          Spatial Nested Radius Invariant (r_inner = r_outer - padding)
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          Optical concentricity requires matching inner and outer curvature with container padding to eliminate visual pinching.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span>Outer Radius (r_outer):</span>
                <span className="font-mono text-indigo-400 tabular-nums">{outerRadius}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="48"
                value={outerRadius}
                onChange={(e) => setOuterRadius(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-neutral-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span>Padding:</span>
                <span className="font-mono text-indigo-400 tabular-nums">{paddingVal}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                value={paddingVal}
                onChange={(e) => setPaddingVal(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-neutral-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-400">
              Computed mathematically: <span className="font-mono font-bold text-white">r_inner = {innerRadius}px</span>
            </div>
          </div>

          {/* Concentric Box Visualizer */}
          <div className="flex items-center justify-center p-6 bg-neutral-950 rounded-2xl border border-neutral-800">
            <div
              className="bg-neutral-800 border-2 border-indigo-500/40 flex items-center justify-center transition-all duration-150"
              style={{
                borderRadius: `${outerRadius}px`,
                padding: `${paddingVal}px`,
                width: 220,
                height: 140,
              }}
            >
              <div
                className="bg-neutral-900 border border-neutral-700 w-full h-full flex flex-col items-center justify-center text-[11px] text-neutral-300 transition-all duration-150"
                style={{
                  borderRadius: `${innerRadius}px`,
                }}
              >
                <span className="font-semibold text-white">Child Element</span>
                <span className="font-mono text-[10px] text-neutral-400">r={innerRadius}px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

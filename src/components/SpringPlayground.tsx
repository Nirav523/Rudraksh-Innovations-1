import React, { useState, useId } from 'react';
import { motion, useAnimation } from 'motion/react';
import { calculateSpringPhysics } from '../utils/springCalculations';
import { Play, RotateCcw, Activity, Gauge, Zap } from 'lucide-react';

interface Preset {
  name: string;
  stiffness: number;
  damping: number;
  mass: number;
  desc: string;
}

const PRESETS: Preset[] = [
  { name: 'Crisp Snappy', stiffness: 400, damping: 30, mass: 0.8, desc: 'Quick response with zero visible wobble' },
  { name: '21st Bouncy', stiffness: 300, damping: 14, mass: 1, desc: 'Subtle playful bounce for badges and cards' },
  { name: 'Gentle Float', stiffness: 120, damping: 20, mass: 1.2, desc: 'Silky smooth macro navigation transitions' },
  { name: 'High Damped', stiffness: 250, damping: 38, mass: 1, desc: 'Overdamped executive feel, zero overshoot' },
];

export const SpringPlayground: React.FC = () => {
  const [stiffness, setStiffness] = useState<number>(300);
  const [damping, setDamping] = useState<number>(20);
  const [mass, setMass] = useState<number>(1);
  const [activePreset, setActivePreset] = useState<string>('Custom');
  const [pulseCount, setPulseCount] = useState<number>(0);

  const stiffnessId = useId();
  const dampingId = useId();
  const massId = useId();

  const metrics = calculateSpringPhysics(stiffness, damping, mass);
  const controls = useAnimation();

  const triggerAnimation = async () => {
    setPulseCount((prev) => prev + 1);
    await controls.start({
      x: [0, 160, 0],
      rotate: [0, 8, 0],
      transition: {
        type: 'spring',
        stiffness,
        damping,
        mass,
      },
    });
  };

  const applyPreset = (preset: Preset) => {
    setStiffness(preset.stiffness);
    setDamping(preset.damping);
    setMass(preset.mass);
    setActivePreset(preset.name);
  };

  // Generate SVG curve points for damped oscillator
  const generateCurvePath = () => {
    const width = 320;
    const height = 120;
    const centerY = height / 2;
    const points: string[] = [];

    const omegaN = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));
    const omegaD = zeta < 1 ? omegaN * Math.sqrt(1 - zeta * zeta) : 0;

    for (let x = 0; x <= width; x += 4) {
      const t = (x / width) * 1.5; // simulate 1.5s
      let yVal = 0;
      if (zeta < 1) {
        yVal = Math.exp(-zeta * omegaN * t) * Math.cos(omegaD * t);
      } else {
        yVal = Math.exp(-zeta * omegaN * t);
      }
      const y = centerY - yVal * 42;
      points.push(`${x},${Math.max(6, Math.min(height - 6, y))}`);
    }

    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 md:p-8 backdrop-blur-md">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-1">
            <span>Framer Motion Engine</span>
            <span aria-hidden="true">·</span>
            <span>Physics Tuner</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Spring Physics & Damping Laboratory
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Tune physical coefficients in real-time. Feel the tactile inertia and inspect harmonic oscillator mathematics.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activePreset === p.name
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Sliders & Numerical Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-neutral-300 mb-2">
              <label htmlFor={stiffnessId} className="cursor-pointer">Stiffness (k):</label>
              <span className="font-mono text-indigo-400 tabular-nums">{stiffness}</span>
            </div>
            <input
              id={stiffnessId}
              type="range"
              min="50"
              max="800"
              step="10"
              value={stiffness}
              onChange={(e) => {
                setStiffness(Number(e.target.value));
                setActivePreset('Custom');
              }}
              className="w-full accent-indigo-500 bg-neutral-800 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
              <span>Soft (50)</span>
              <span>Ultra-Rigid (800)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-medium text-neutral-300 mb-2">
              <label htmlFor={dampingId} className="cursor-pointer">Damping (c):</label>
              <span className="font-mono text-indigo-400 tabular-nums">{damping}</span>
            </div>
            <input
              id={dampingId}
              type="range"
              min="5"
              max="80"
              step="1"
              value={damping}
              onChange={(e) => {
                setDamping(Number(e.target.value));
                setActivePreset('Custom');
              }}
              className="w-full accent-indigo-500 bg-neutral-800 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
              <span>Underdamped / Bouncy (5)</span>
              <span>Overdamped (80)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-medium text-neutral-300 mb-2">
              <label htmlFor={massId} className="cursor-pointer">Mass (m):</label>
              <span className="font-mono text-indigo-400 tabular-nums">{mass}</span>
            </div>
            <input
              id={massId}
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={mass}
              onChange={(e) => {
                setMass(Number(e.target.value));
                setActivePreset('Custom');
              }}
              className="w-full accent-indigo-500 bg-neutral-800 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
              <span>Feather (0.2)</span>
              <span>Heavy (3.0)</span>
            </div>
          </div>

          {/* Mathematical Diagnostics */}
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs">
            <div className="text-neutral-400 font-semibold mb-2 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-indigo-400" />
              <span>Real-Time Invariant Metrics</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Damping Ratio (ζ):</span>
              <span className="font-mono font-medium text-white tabular-nums">
                {metrics.dampingRatio} ({metrics.isCriticallyDamped ? 'Critically Damped' : metrics.isUnderdamped ? 'Underdamped' : 'Overdamped'})
              </span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Natural Frequency (ωₙ):</span>
              <span className="font-mono font-medium text-white tabular-nums">{metrics.naturalFrequency} rad/s</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Settling Time (tₛ):</span>
              <span className="font-mono font-medium text-white tabular-nums">{metrics.settlingTimeMs} ms</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Overshoot Peak:</span>
              <span className="font-mono font-medium text-white tabular-nums">{metrics.overshootPercent}%</span>
            </div>
          </div>
        </div>

        {/* Live Oscillator Visualization & Interactive Test Track */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Harmonic Wave Graph */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <span>Displacement Curve x(t)</span>
              </div>
              <span className="font-mono text-[11px] text-neutral-500">0s → 1.5s</span>
            </div>
            <div className="h-32 w-full flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
                {/* Center equilibrium line */}
                <line x1="0" y1="60" x2="320" y2="60" stroke="#262626" strokeDasharray="3 3" />
                {/* Damped oscillation path */}
                <path
                  d={generateCurvePath()}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Interactive Test Track */}
          <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between h-48 relative">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Interactive Spring Rig (Drag or Pulse)</span>
              <button
                onClick={triggerAnimation}
                className="px-3 py-1.5 text-xs font-medium text-neutral-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Test Spring Pulse</span>
              </button>
            </div>

            {/* Test Block */}
            <div className="w-full h-20 flex items-center relative overflow-hidden px-4">
              <motion.div
                animate={controls}
                drag="x"
                dragConstraints={{ left: 0, right: 200 }}
                dragElastic={0.2}
                dragTransition={{
                  bounceStiffness: stiffness,
                  bounceDamping: damping,
                }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col items-center justify-center font-bold text-xs shadow-lg cursor-grab active:cursor-grabbing select-none border border-white/20"
              >
                <Zap className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-mono tabular-nums">PULSE</span>
              </motion.div>
            </div>

            <div className="text-[11px] text-neutral-500 flex justify-between">
              <span>Start (x=0)</span>
              <span>Displacement Envelope</span>
              <span>Target (x=200px)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

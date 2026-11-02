import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, PhoneCall, Timer, Bell, Play, Pause, X, Check } from 'lucide-react';

type IslandState = 'compact' | 'music' | 'call' | 'timer';

export const DynamicIsland: React.FC = () => {
  const [state, setState] = useState<IslandState>('compact');
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(42);

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* State switch buttons (functional interactive controls) */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl mb-8">
        {(['compact', 'music', 'call', 'timer'] as IslandState[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setState(mode)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize cursor-pointer ${
              state === mode
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* The Dynamic Island Container */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 32,
        }}
        className="relative bg-black border border-neutral-800/80 rounded-full text-white shadow-2xl overflow-hidden flex items-center justify-between"
        style={{
          width:
            state === 'compact'
              ? 160
              : state === 'music'
              ? 340
              : state === 'call'
              ? 320
              : 280,
          height:
            state === 'compact'
              ? 38
              : state === 'music'
              ? 64
              : state === 'call'
              ? 68
              : 52,
          borderRadius: 32,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {state === 'compact' && (
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="w-full flex items-center justify-between px-4 text-xs font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-neutral-300">Live Studio</span>
              </div>
              <span className="font-mono text-neutral-400 tabular-nums">24 fps</span>
            </motion.div>
          )}

          {state === 'music' && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-between px-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white truncate max-w-[140px]">
                    Midnight City
                  </span>
                  <span className="text-[11px] text-neutral-400 truncate max-w-[140px]">
                    M83 · Hurry Up, We're Dreaming
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white cursor-pointer transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {state === 'call' && (
            <motion.div
              key="call"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-between px-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Design Review</span>
                  <span className="text-[11px] text-neutral-400">Audio Connected · 03:14</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setState('compact')}
                  className="w-8 h-8 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center text-white cursor-pointer transition-colors"
                  aria-label="End call"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {state === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-between px-4"
            >
              <div className="flex items-center gap-2.5">
                <Timer className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-neutral-200">Focus Sprint</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold font-mono text-amber-400 tabular-nums">
                  00:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
                <button
                  onClick={() => setSeconds((prev) => (prev > 0 ? prev - 5 : 60))}
                  className="px-2 py-0.5 text-[10px] font-medium bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 transition-colors"
                >
                  -5s
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

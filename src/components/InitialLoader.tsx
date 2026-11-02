import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface InitialLoaderProps {
  onLoaded?: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING EXPERIENCE...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fast, smooth loading progress bar from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoaded) onLoaded();
          }, 450);
          return 100;
        }
        // Realistic easing step
        const increment = prev < 40 ? 5 : prev < 80 ? 3 : 2;
        const next = Math.min(100, prev + increment);

        if (next < 35) {
          setPhaseText('CALIBRATING NEURAL AESTHETICS...');
        } else if (next < 70) {
          setPhaseText('SYNTHESIZING 3D EXECUTIVE STAGE...');
        } else if (next < 95) {
          setPhaseText('ORCHESTRATING BRAND ARCHITECTURE...');
        } else {
          setPhaseText('WELCOME TO RUDRAKSH INNOVATIONS');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  const handleSkip = () => {
    setIsVisible(false);
    if (onLoaded) onLoaded();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(10px)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#030509] flex flex-col items-center justify-center p-4 overflow-hidden select-none font-sans"
        >
          {/* Deep Ambient Background Glows matching the purple & amber orb */}
          <div className="pointer-events-none absolute w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#8B5CF6]/20 via-[#EC4899]/15 to-[#F59E0B]/15 blur-[120px] -z-10 animate-pulse" />
          <div className="pointer-events-none absolute w-[350px] h-[350px] rounded-full bg-violet-600/25 blur-[90px] -z-10" />

          {/* Skip Button Top Right */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={handleSkip}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono tracking-widest text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>SKIP</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Central Loader Container */}
          <div className="relative flex flex-col items-center text-center max-w-md w-full">
            {/* The User's Attachment Video Loop with Glowing Neon Rim */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 mb-5 flex items-center justify-center">
              {/* Outer Pulsing Ring */}
              <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-ping opacity-30 pointer-events-none" />
              <div className="absolute -inset-2 rounded-full border border-amber-500/20 blur-sm pointer-events-none" />

              {/* Video Player */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_0_50px_rgba(139,92,246,0.35)]">
                <video
                  src="/assets/aistudio/From_Klickpin.com-_Beachy_beach_picnic_thoughts_for_people_who_love_beauty_with_timeless_style_to_brighten_your_feed-pin-id-985725437225725993_f50e3acb.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Official Brand Badge & Heading */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full border border-amber-500/40 bg-black/80 p-0.5 overflow-hidden flex items-center justify-center shadow-xs">
                <img
                  src="/assets/aistudio/1__2__58ec0766.png"
                  alt="Rudraksh Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#F59E0B] uppercase">
                Rudraksh Innovations
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase font-sans mb-3">
              Scale Your Brand Into The Future
            </h1>

            {/* Progress Bar & Counter */}
            <div className="w-full max-w-xs space-y-2 mt-2">
              {/* Progress Track */}
              <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Status Text & Numerical Counter */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-neutral-400">
                <div className="flex items-center gap-1.5 truncate text-neutral-300">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-spin" />
                  <span className="truncate">{phaseText}</span>
                </div>
                <span className="text-white font-bold ml-2 shrink-0">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

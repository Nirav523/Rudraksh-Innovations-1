import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface SpotlightCardProps {
  title: string;
  subtitle: string;
  description: string;
  children?: React.ReactNode;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title,
  subtitle,
  description,
  children,
  spotlightColor = 'rgba(99, 102, 241, 0.18)',
  enableTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized mouse coords (-0.5 to 0.5) for tilt
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    normX.set(x / rect.width - 0.5);
    normY.set(y / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
      }}
      className="relative rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 backdrop-blur-md overflow-hidden transition-colors hover:border-neutral-700/80 group"
    >
      {/* Spotlight Radial Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`
          ),
        }}
      />

      {/* Subtle Specular Sheen Border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.12), transparent 60%)`
          ),
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Clean unboxed metadata separator */}
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>{subtitle}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-indigo-400">Interactive</span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {children && <div className="mt-4">{children}</div>}
      </div>
    </motion.div>
  );
};

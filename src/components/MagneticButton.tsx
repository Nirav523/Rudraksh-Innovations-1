import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  enableConfetti?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  enableConfetti = true,
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.4);
    y.set(middleY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (enableConfetti) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const xPos = (rect.left + rect.width / 2) / window.innerWidth;
        const yPos = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          origin: { x: xPos, y: yPos },
          particleCount: 35,
          spread: 55,
          ticks: 200,
          colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'],
        });
      }
    }
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      className={`relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold rounded-xl cursor-pointer overflow-hidden transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${className}`}
    >
      {children}
    </motion.button>
  );
};

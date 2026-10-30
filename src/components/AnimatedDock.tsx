import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';
import { Home, Compass, Layers, Terminal, Sparkles, FolderGit2, Settings } from 'lucide-react';

interface DockItemProps {
  mouseX: MotionValue<number>;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const DockIcon: React.FC<DockItemProps> = ({ mouseX, icon, label, onClick, isActive }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width/height based on distance from cursor
  const widthSync = useTransform(distance, [-150, 0, 150], [42, 68, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={onClick}
      className={`group relative flex items-center justify-center rounded-2xl border transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
        isActive
          ? 'bg-neutral-800 border-neutral-600 text-white shadow-lg'
          : 'bg-neutral-900/90 border-neutral-800/80 text-neutral-300 hover:text-white hover:border-neutral-700'
      }`}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
    >
      <div className="w-5 h-5 flex items-center justify-center transition-transform group-hover:scale-110">
        {icon}
      </div>

      {/* Tooltip on hover */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-200 border border-neutral-800 opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 whitespace-nowrap z-30">
        {label}
      </span>

      {/* Active dot indicator */}
      {isActive && (
        <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-indigo-400" />
      )}
    </motion.button>
  );
};

export const AnimatedDock: React.FC<{
  onSelectAction?: (name: string) => void;
}> = ({ onSelectAction }) => {
  const mouseX = useMotionValue(Infinity);
  const [activeItem, setActiveItem] = React.useState('Studio');

  const dockItems = [
    { id: 'Studio', icon: <Home className="w-5 h-5" />, label: 'Home Studio' },
    { id: 'Components', icon: <Layers className="w-5 h-5" />, label: 'Components' },
    { id: 'Terminal', icon: <Terminal className="w-5 h-5" />, label: 'Playground' },
    { id: 'AI', icon: <Sparkles className="w-5 h-5 text-indigo-400" />, label: 'Micro-Interactions' },
    { id: 'Explore', icon: <Compass className="w-5 h-5" />, label: 'Inspector' },
    { id: 'Git', icon: <FolderGit2 className="w-5 h-5" />, label: 'Repository' },
    { id: 'Config', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <div className="text-xs text-neutral-400 mb-3 text-center">
        Hover smoothly across the icons to feel the magnetic magnification physics
      </div>
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-2.5 rounded-3xl border border-neutral-800 bg-neutral-950/70 p-2.5 backdrop-blur-xl shadow-2xl"
        aria-label="Floating Application Dock"
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => {
              setActiveItem(item.id);
              onSelectAction?.(item.label);
            }}
          />
        ))}
      </motion.nav>
    </div>
  );
};

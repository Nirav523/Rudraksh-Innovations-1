import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, X, Terminal, Code2 } from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  category: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'spotlight',
    name: 'Spotlight Card (3D Tilt)',
    category: 'Cards & Surfaces',
    code: `import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const SpotlightCard = ({ title, subtitle, description, children }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [10, -10]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-10, 10]), { stiffness: 250, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    normX.set(x / rect.width - 0.5);
    normY.set(y / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); normX.set(0); normY.set(0); }}
      style={{ perspective: 1000, rotateX, rotateY }}
      className="relative rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 backdrop-blur-md overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform([mouseX, mouseY], ([x, y]) =>
            \`radial-gradient(600px circle at \${x}px \${y}px, rgba(99,102,241,0.2), transparent 70%)\`
          ),
        }}
      />
      <div className="relative z-10">
        <span className="text-xs text-neutral-400">{subtitle}</span>
        <h3 className="text-lg font-bold text-white mt-1 mb-2">{title}</h3>
        <p className="text-sm text-neutral-400">{description}</p>
        {children}
      </div>
    </motion.div>
  );
};`,
  },
  {
    id: 'dock',
    name: 'Animated Floating Dock',
    category: 'Navigation',
    code: `import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const DockIcon = ({ mouseX, icon, label, onClick }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [42, 68, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={onClick}
      className="relative flex items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:text-white"
      whileTap={{ scale: 0.92 }}
    >
      {icon}
    </motion.button>
  );
};

export const AnimatedDock = ({ items }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-2.5 rounded-3xl border border-neutral-800 bg-neutral-950/70 p-2.5 backdrop-blur-xl"
    >
      {items.map((item) => (
        <DockIcon key={item.id} mouseX={mouseX} icon={item.icon} label={item.label} />
      ))}
    </motion.nav>
  );
};`,
  },
  {
    id: 'dynamic-island',
    name: 'Morphing Dynamic Island',
    category: 'Feedback & HUD',
    code: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const DynamicIsland = () => {
  const [state, setState] = useState('compact');

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
      className="relative bg-black border border-neutral-800 rounded-full text-white shadow-2xl overflow-hidden flex items-center justify-between"
      style={{
        width: state === 'compact' ? 160 : 320,
        height: state === 'compact' ? 38 : 64,
        borderRadius: 32,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {state === 'compact' ? (
          <motion.div
            key="compact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex items-center justify-between px-4 text-xs"
          >
            <span>Live Session</span>
            <span className="font-mono text-emerald-400">Active</span>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full flex items-center justify-between px-4 text-sm"
          >
            <span>Expanded State</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};`,
  },
  {
    id: 'morphing-tabs',
    name: 'Morphing Segmented Tabs',
    category: 'Navigation',
    code: `import React, { useState } from 'react';
import { motion } from 'motion/react';

export const MorphingTabs = ({ tabs, onSelect }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex items-center p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); onSelect?.(tab.id); }}
            className="relative px-4 py-2 text-xs font-medium text-neutral-400 transition-colors z-10"
          >
            <span className={isActive ? 'text-white font-semibold' : ''}>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="morphing-pill"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute inset-0 bg-neutral-800 rounded-lg -z-10 shadow-sm"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};`,
  },
];

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedSnippet, setSelectedSnippet] = useState<string>(SNIPPETS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeSnippet = SNIPPETS.find((s) => s.id === selectedSnippet) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              21st.dev & Framer Motion Code Library
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Sidebar Snippet List */}
          <div className="md:col-span-4 border-r border-neutral-800 p-4 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-3 py-1 mb-1">
              Components
            </div>
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => {
                  setSelectedSnippet(snippet.id);
                  setCopied(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-colors flex flex-col cursor-pointer ${
                  selectedSnippet === snippet.id
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <span>{snippet.name}</span>
                <span className="text-[10px] text-neutral-500 mt-0.5">{snippet.category}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer Panel */}
          <div className="md:col-span-8 flex flex-col bg-neutral-950 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-900/20 text-xs">
              <span className="font-mono text-neutral-400">{activeSnippet.name}.tsx</span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-6 overflow-auto font-mono text-xs text-neutral-300 leading-relaxed bg-neutral-950 flex-1">
              <pre className="overflow-x-auto whitespace-pre">
                <code>{activeSnippet.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
